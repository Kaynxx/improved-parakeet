# AI çağrıları için tek kapı tasarımı

Tarih: 2026-08-20 · Durum: **onaylandı**

## Problem

Kullanıcı, aynı yerel Antigravity proxy'sine (`127.0.0.1:8045`, model `gemini-3-flash`)
üç farklı SDK ile bağlanmayı gösteren üç örnek verdi (OpenAI SDK, Anthropic SDK,
`google-generativeai`) ve bunları tek bir şeye indirgemek istedi: uygulamadaki
her AI çağrısı ("AI ajanları") tek bir kapıdan, istediği modele istek atabilsin.

Bugün tek AI entegrasyonu `src/server/ai/degerlendir.ts` — Anthropic SDK,
`claude-opus-5`, `ANTHROPIC_API_KEY` ile doğrudan çağrı yapıyor ve tek çağıranı
`src/server/services/lesson-practice.ts:10,84-105`. `.env.local`'de kullanılmayan
`DEGERLENDIRICI_BASE_URL` / `DEGERLENDIRICI_API_KEY` (NVIDIA NIM'e işaret eden,
OpenAI-uyumlu) duruyordu — hiçbir kod tarafından okunmuyordu, kayıtsız kalmış bir
hazırlıktı. `.env.example`'da ne bu değişkenler ne `ANTHROPIC_API_KEY` belgeliydi.

## Karar

`src/server/ai/istemci.ts` adında tek, genel bir AI kapısı eklenir. Bugünkü ve
gelecekteki her AI çağrısı bu kapıdan geçer; sağlayıcı değişirse yalnız iki ortam
değişkeni değişir, çağıran kod değişmez.

`degerlendir.ts` bu kapıyı kullanacak şekilde değiştirilir; Anthropic SDK'sı
kaldırılır. `lesson-practice.ts`'in bildiği sözleşme (`degerlendir()`,
`DegerlendiriciYok`, `MODEL`) aynı kalır — bu dosyada değişiklik gerekmez.

### `istemci.ts` — genel kapı

- OpenAI SDK (`openai` paketi) ile kurulan tek `OpenAI` client; `baseURL` ve
  `apiKey` ortam değişkenlerinden okunur. OpenAI SDK'nın seçilme nedeni: hem bu
  yerel Antigravity proxy'si hem NVIDIA NIM gibi OpenAI-uyumlu diğer sağlayıcılar
  aynı SDK ile konuşulabiliyor — üç SDK arasında seçim yapma yükünü kaldırıyor.
- Ortam değişkenleri **yeniden adlandırılır**: `DEGERLENDIRICI_BASE_URL` /
  `DEGERLENDIRICI_API_KEY` yerine `AI_BASE_URL` / `AI_API_KEY`. Gerekçe: bu
  değişkenler artık evaluator'a özel değil, genel kapıya ait; eski isimler hiçbir
  kod tarafından okunmadığı için yeniden adlandırma güvenli (geriye dönük
  kullanıcı yok).
- `aiIstemcisi()`: her iki değişken de tanımlıysa client döner (lazy, tek örnek);
  biri eksikse `AiIstemcisiYok` fırlatır.
- `AiIstemcisiYok`: genel "AI kapısı yapılandırılmadı" hatası. `degerlendir.ts`
  bunu yakalayıp kendi `DegerlendiriciYok` hatasına çevirir — domain'e özel mesaj
  UI'da korunur, ama kapı kendi domain'ini bilmez.
- Model seçimi **çağırana aittir** — kapı bir model dayatmaz. Her çağıran
  `chat.completions.create({ model, ... })` çağrısında istediği modeli belirtir.

### `degerlendir.ts` — değişenler

- `MODEL` sabiti `"claude-opus-5"` yerine `"gemini-3-flash"` olur; hâlâ kod
  içinde sabit bir literal (env'den okunmaz) — mevcut desenle aynı, çünkü bu
  değer yalnız `answer_feedback.model` denetim izi kolonuna yazılıyor, taşıma
  katmanı (base_url/key) gibi dağıtım-özel bir sır değil.
- Yapılandırılmış çıktı: Anthropic'in `output_config` + `zodOutputFormat`
  (strict schema, sağlayıcıya özel) yerine `response_format: { type:
  "json_object" }` + şema alanlarının sistem promptunda Türkçe açıklanması +
  dönen JSON'un `DegerlendirmeSemasi.parse()`den geçirilmesi. Gerekçe: yerel/3.
  taraf OpenAI-uyumlu uçlarda strict `json_schema` desteği garanti değil;
  `json_object` modu çok daha yaygın destekleniyor. Model şemaya uymayan JSON
  dönerse `zod` fırlattığı hata aynen yukarı taşınır — sessizce yutulmaz.
- Hata eşlemesi genişler: bugün yalnız "anahtar yok" `DegerlendiriciYok` ile
  yakalanıp `lesson-practice.ts:99-105`'te özellik sessizce devre dışı
  bırakılıyordu. Yerel proxy modeliyle yeni bir operasyonel durum eklendi:
  Antigravity kapalıyken bağlantı hatası (`ECONNREFUSED` vb.). Bu durum da
  `DegerlendiriciYok`e eşlenir — `architecture.md:55-56`'daki "harici kaynak
  hatası dashboard'u kırmamalı" ilkesiyle tutarlı. Şema uyumsuzluğu (gerçek
  programlama/prompt hatası) bu eşlemenin dışında kalır, hata olarak yukarı
  fırlamaya devam eder.

### Ortam ve sır yönetimi

- `.env.example`'a `AI_BASE_URL` / `AI_API_KEY` placeholder olarak eklenir,
  Türkçe yorum: "OpenAI uyumlu herhangi bir sağlayıcı (yerel Antigravity proxy,
  NVIDIA NIM vb.)".
- `.env.local`'e gerçek değerler yazılır: `AI_BASE_URL=http://127.0.0.1:8045/v1`,
  kullanıcının bu oturumda paylaştığı `AI_API_KEY`. Kullanılmayan
  `DEGERLENDIRICI_BASE_URL` / `DEGERLENDIRICI_API_KEY` satırları kaldırılır
  (hiçbir kod okumuyordu, ölü konfigürasyon).
- Paylaşılan anahtar hiçbir committed dosyaya girmez, yalnız `.env.local`'de
  kalır (git-ignored).

### Paket değişimi

- `openai` eklenir.
- `@anthropic-ai/sdk` kaldırılır — repodaki tek kullanıcısı `degerlendir.ts`
  (grep ile doğrulandı), migrasyon sonrası hiçbir kod onu import etmez.

## Kabul edilen risk

Antigravity proxy'si yalnız bu makinede, Antigravity uygulaması açıkken çalışır.
Uygulama bir sunucuya deploy edilirse değerlendirme özelliği "bağlı değil"
durumuna düşer (aynı davranış: `DegerlendiriciYok` → sessizce devre dışı, sayfa
çökmez). Üretim için ayrı bir sağlayıcı/anahtar gerekecek. Gözden geçirme
tetiği: uygulama bir sunucuya deploy edilmeye başlandığında veya Antigravity
proxy'si kalıcı olarak kapatıldığında bu karar yeniden açılır.

## Kapsam dışı

- Değerlendirme dışında bugün hiçbir AI özelliği yok; `istemci.ts` şimdilik tek
  çağıranla (dolaylı olarak `degerlendir.ts` üzerinden) kullanılacak, ama arayüzü
  genel tutulur ki gelecekteki AI özellikleri aynı kapıyı kullanabilsin.
- Sağlayıcı otomatik failover (proxy çökerse başka bir sağlayıcıya geçme) bu
  paketin parçası değil — YAGNI, tek sağlayıcı yeterli.
- Anthropic'in `thinking: { type: "adaptive" }` gibi sağlayıcıya özel
  parametreleri taşınmaz; OpenAI-uyumlu arayüzde karşılığı garanti değil.
