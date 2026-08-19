# Akademi dengeli dönüşüm uygulama planı

> Tasarım: `docs/superpowers/specs/2026-08-19-akademi-dengeli-donusum-design.md`
> Kanıt: `docs/superpowers/research/akademi-ders-deneyimi-2026-08-19.md`

**Amaç:** 40 dersin mevcut soru/cevap altyapısını çalışan bir öğrenme döngüsüne bağlamak; beş editoryal biçimi ve üç deterministik laboratuvarı sınırlı pilotlarda teslim etmek; pilot deneyimini üç 1–7 sinyalle ölçmek.

**Mimari karar:** Mevcut Postgres + server action + React yapısı korunur. Öğrenme kuralları saf fonksiyonlarda; yetki ve kalıcılık sunucu servislerinde; etkileşim hesapları saf istemci fonksiyonlarında tutulur. Ders içindeki `etkilesim` JSON blokları kapalı Zod registry ile ayrıştırılır; içerikten kod çalıştırılmaz.

**Araçlar:** Next.js 15, React 19, TypeScript, Drizzle/Postgres, Zod, `node:test`, Tailwind CSS v4.

**Çalışma kuralı:** Kaynak dalda kullanıcıya ait commitlenmemiş değişiklikler bulunduğu için yeni worktree mevcut durumu eksik kopyalayabilir. Uygulama mevcut `faz2bc-akademi-mufredat` dalında, dosya sahipliği ayrılmış alt ajanlarla yürütülür. Ajanlar commit atmaz. Ara doğrulamalar ana koordinatör tarafından yapılır.

---

## Görev 1: Davranış sözleşmelerini testlerle kilitle

**Dosyalar**

- Oluştur: `src/server/services/lesson-practice.logic.test.ts`
- Oluştur: `src/lib/content/interactions.test.ts`
- Oluştur: `src/components/academy/interactions/calculators.test.ts`
- Oluştur: `src/server/services/lesson-reflection.logic.test.ts`

**Test edilecek gözlenebilir davranışlar**

1. Türkçe veya noktalı tek sonlu sayı ayrıştırılır; ek metin, boşluk dışında çoklu token, `NaN` ve sonsuz değer reddedilir.
2. Sayısal cevap, mutlak tolerans sınırında doğru; sınır dışında yanlış değerlendirilir.
3. Bütün sorular cevaplanmadan `answered`; bütün puanlanabilir sorular değerlendirilmeden `reviewed` oluşmaz.
4. `tahmin` feedback ve ustalık ortalaması bekletmez.
5. Ustalık puan ağırlıklı ortalama ile ve `>= 70` sınırında oluşur.
6. `etkilesim` fence ayrıştırıcısı normal Markdown parçalarını ve doğrulanmış widget'ları sırayla döndürür.
7. Bilinmeyen tür, bozuk JSON ve şema dışı alan açıklayıcı hata üretir.
8. T-hesap her adımda bilanço eşitliğini korur.
9. Duration, convexity ve tam tahvil fiyatı aynı girdilerde deterministik sonuç verir; sıfır vade/negatif fiyat gibi geçersiz girdi reddedilir.
10. TÜFE sepeti ağırlıkları normalize eder ve resmi/kişisel sepet değişimini ayrı hesaplar.
11. Yansıma ölçekleri yalnız 1–7 tam sayı kabul eder.

**RED doğrulaması**

```bash
node --import tsx --test src/server/services/lesson-practice.logic.test.ts src/lib/content/interactions.test.ts src/components/academy/interactions/calculators.test.ts src/server/services/lesson-reflection.logic.test.ts
```

Beklenen: testler eksik modül/işlev sözleşmesini açık AssertionError ile raporlar; sözdizimi veya test kurulumu hatası üretmez.

---

## Görev 2: Cevap, değerlendirme ve ilerleme çekirdeğini uygula

**Dosyalar**

- Oluştur: `src/server/services/lesson-practice.logic.ts`
- Oluştur: `src/server/services/lesson-practice.ts`
- Oluştur: `src/app/(dashboard)/akademi/[hafta]/[ders]/actions.ts`
- Değiştir: `src/lib/db/queries/lesson.ts`
- Değiştir: `src/lib/db/queries/progress.ts`
- Gerekirse değiştir: `src/types/index.ts`

**Sözleşmeler**

```ts
export function parseNumericAnswer(raw: string): number | null;
export function evaluateNumericAnswer(answer: number, expected: number, tolerance: number): NumericEvaluation;
export function deriveLessonStatus(items: PracticeStatusItem[]): StepStatus;
export async function submitLessonAnswer(input: {
  userId: string;
  lessonId: string;
  promptId: string;
  body: string;
}): Promise<SubmitAnswerResult>;
export async function cevapGonder(
  previous: CevapDurumu,
  formData: FormData,
): Promise<CevapDurumu>;
```

**Uygulama**

1. `lesson.ts` içine, soru kimliğini ders kimliğiyle birlikte okuyan dar sorgu; cevap upsert'i; feedback insert'i ve son durum hesabı için gereken özet sorguları ekle.
2. Cevap gövdesini trim et; boş ve 10.000 karakter üstü cevabı veritabanına gitmeden reddet.
3. `sayisal` türünde deterministik değerlendirme üret ve `answer_feedback.model = "deterministik-v1"` olarak sakla.
4. `acik` türünde cevabı önce sakla, sonra mevcut `degerlendir()` fonksiyonunu yalnız sunucudaki soru/rubrik/cevapla çağır. `DegerlendiriciYok` durumunu veri kaybı olmadan ayrı sonuç yap.
5. `tahmin` türünde yalnız cevabı sakla; başarı feedback'i uydurma.
6. Her gönderimden sonra tüm soruların en son durumundan `answered/reviewed/mastered` türet ve `advanceProgress` çağır.
7. Server action oturumu `auth()` ile doğrulasın; istemciden gelen lesson ID ile prompt üyeliğini sunucuda doğrulasın; `revalidatePath` ile yalnız ilgili ders ve `/akademi` yolunu yenilesin.
8. Kullanıcıya dönen hata metni iç ayrıntı veya secret taşımasın; beklenmeyen hata sessizce yutulmasın.

**GREEN doğrulaması**

```bash
node --import tsx --test src/server/services/lesson-practice.logic.test.ts
```

---

## Görev 3: Kapalı etkileşim ayrıştırıcısını ve hesap motorlarını uygula

**Dosyalar**

- Oluştur: `src/lib/content/interactions.ts`
- Oluştur: `src/components/academy/interactions/calculators.ts`
- Oluştur: `src/components/academy/interactions/THesapLab.tsx`
- Oluştur: `src/components/academy/interactions/DurationConvexityLab.tsx`
- Oluştur: `src/components/academy/interactions/TufeSepetiLab.tsx`
- Oluştur: `src/components/academy/interactions/LessonInteraction.tsx`
- Oluştur: `src/components/academy/LessonContent.tsx`
- Değiştir: `src/lib/content/lesson.ts`

**Sözleşme**

```ts
export type LessonContentPart =
  | { kind: "markdown"; content: string }
  | { kind: "interaction"; config: LessonInteractionConfig };
export function parseLessonContent(contentMd: string, location?: string): LessonContentPart[];
```

**Uygulama**

1. Yalnız tam satır fence biçimi ` ```etkilesim` kabul edilir.
2. JSON üç Zod şemasından tam birine uymalı; `.strict()` ile fazla alan reddedilir.
3. `parseLessonFile` gövdeyi seed sırasında aynı ayrıştırıcıdan geçirerek erken hata üretsin.
4. `LessonContent`, Markdown parçalarını mevcut `renderMarkdown()` ile; widget parçalarını kapalı `LessonInteraction` switch'i ile render etsin.
5. Üç laboratuvar hesaplamayı `calculators.ts` saf fonksiyonlarından alsın. Bileşenlerde formül, varsayım, giriş birimi, aralık, sonuç ve sınır notu görünür olsun.
6. Yeni paket veya grafik kütüphanesi ekleme. Mevcut input/range öğeleri ve ürün renkleriyle küçük araç yüzeyi kur.

**GREEN doğrulaması**

```bash
node --import tsx --test src/lib/content/interactions.test.ts src/components/academy/interactions/calculators.test.ts
```

---

## Görev 4: Pilot ölçümünü kalıcı ve test edilebilir yap

**Dosyalar**

- Değiştir: `src/lib/db/schema.ts`
- Oluştur: `src/server/services/lesson-reflection.logic.ts`
- Oluştur: `src/lib/db/queries/lesson-reflection.ts`
- Oluştur: `src/app/(dashboard)/akademi/[hafta]/[ders]/reflection-actions.ts`
- Oluştur: `src/components/academy/LessonReflection.tsx`
- Oluştur: `drizzle/0001_*.sql` ve Drizzle meta çıktısı (`npm run db:generate` ana koordinatörde)

**Şema**

`lesson_reflections`:

- `user_id` → user, cascade delete;
- `lesson_id` → lesson, cascade delete;
- `boredom`, `effort`, `continue_intent` → integer, not null;
- `created_at`, `updated_at`;
- `(user_id, lesson_id)` benzersiz.

Veritabanı CHECK kısıtları üç değeri de 1–7 aralığında tutar.

**Uygulama**

1. Saf doğrulama yalnız 1–7 tam sayıyı kabul etsin.
2. Query kullanıcı/ders çifti için mevcut kaydı okusun ve upsert etsin.
3. Server action auth ve ders varlığını doğrulasın.
4. `LessonReflection` üç ayrı 1–7 radio grubu kullansın. Yönlendirici etiket yerine yalnız uç açıklamaları göster: `1 düşük`, `7 yüksek`.
5. Kaydetme, başarı ve hata durumları ekran okuyucuya bildirilsin.

**GREEN doğrulaması**

```bash
node --import tsx --test src/server/services/lesson-reflection.logic.test.ts
```

---

## Görev 5: Beş editoryal pilotu ve üç etkileşim bloğunu ekle

**Dosyalar**

- Değiştir: `content/akademi/hafta-01/01-takas-efsanesi-ve-paranin-kokeni.md`
- Değiştir: `content/akademi/hafta-01/02-krediyi-banka-yaratir.md`
- Değiştir: `content/akademi/hafta-03/04-iskonto-matematigi-durasyon-konveksite.md`
- Değiştir: `content/akademi/hafta-04/01-tufe-sepet-agirliklari-ve-olcum-sapmasi.md`
- Değiştir: `content/akademi/hafta-08/03-turkiye-2001-2026.md`
- Değiştir: `content/akademi/hafta-08/05-dijital-para-cbdc-ve-stablecoin.md`

Önce gerçek slug'ları dosya sisteminden doğrula; tahmin edilen adla yeni ders oluşturma.

**Uygulama**

1. 1.1 gövdesini kavram duruşması ritmine geçir: iki iddia, kanıt standardı, kısa hüküm tablosu.
2. 1.2 içine doğrulanmış `t-hesap` bloğu yerleştir; çevresindeki metin laboratuvarın hangi invariantı gösterdiğini açıklar.
3. 3.4 içine `durasyon-konveksite` bloğu yerleştir; tam fiyatın benchmark olduğunu açıkla.
4. 4.1 gövdesini veri adli incelemesi ritmine geçir ve `tufe-sepeti` bloğunu yerleştir.
5. 8.3'e vaka kronolojisi, dönem bilgi seti ve en az iki rakip teşhis tablosu ekle.
6. 8.5'e politika notu: seçenekler, riskler, azınlık görüşü ve tarih/olay temelli gözden geçirme tetikleyicisi ekle.
7. Mevcut kaynak URL'lerini, akademik iddiaları ve frontmatter soru kimliklerini koru. Yeni doğrulanmamış olgu veya kaynak ekleme.
8. Beş ders aynı açılış/kapanış kalıbına dönmesin. Dekoratif hikâye, rozet, XP veya sahte piyasa verisi ekleme.

**İçerik doğrulaması**

```bash
npm run seed
```

Seed; bilinmeyen/bozuk etkileşim bloğunda dosya adıyla başarısız olmalı, geçerli pilotlarda tamamlanmalı.

---

## Görev 6: Ders sayfasını öğrenme yüzeyine bağla

**Dosyalar**

- Oluştur: `src/components/academy/LessonPractice.tsx`
- Oluştur: `src/components/academy/LessonPromptCard.tsx`
- Değiştir: `src/app/(dashboard)/akademi/[hafta]/[ders]/page.tsx`
- Değiştir: `src/server/services/academy.ts`
- Gerekirse değiştir: `src/app/globals.css`

**Uygulama**

1. `getStep` yansıma kaydını da döndürsün veya sayfa için ayrı, paralel okuma ekle.
2. Sayfa gerçek kullanıcı kimliğiyle açıldığında `advanceProgress(..., "reading")` çağır; metadata üretimi ilerleme yazmasın.
3. Ham `renderMarkdown` bloğunu `LessonContent` ile değiştir.
4. `found.prompts` değerini `LessonPractice` içine geçir; sorular içerikten sonra, kaynaklardan önce görünsün.
5. `LessonPromptCard` her prompt için ayrı `useActionState` kullanır; eski cevap formu doldurur; feedback revizyondan sonra sunucu yenilemesiyle güncellenir.
6. `LessonReflection` yalnız beş pilot slug'da, kaynaklardan sonra gösterilir.
7. Server ve client sınırında yalnız seri hale getirilebilir props kullan.
8. Dar ekranlarda kartlar tek sütun; giriş ve eylemler en az 44 px dokunma alanına sahip olsun.

**Davranış smoke testi**

Gerçek tarayıcıda:

- daha önce açılmamış ders `reading` olur;
- sayısal yanlış/doğru/tolerans sınırı;
- açık cevap AI bağlı ve bağlı değil durumları;
- cevap revizyonu ve yeni feedback;
- sayfa yenilemede cevap/feedback kalıcılığı;
- beş pilot biçim;
- üç laboratuvarın sınır değerleri;
- üç 1–7 ölçüm kaydı;
- mobil 390×844 ve masaüstü 1440×900.

---

## Görev 7: Entegrasyon, göç ve son doğrulama

1. Drizzle göçünü üret ve yalnız `lesson_reflections` değişikliğini içerdiğini incele:

```bash
npm run db:generate
npm run db:up
npm run db:migrate
npm run seed
```

2. Davranış testleri:

```bash
node --import tsx --test src/server/services/lesson-practice.logic.test.ts src/lib/content/interactions.test.ts src/components/academy/interactions/calculators.test.ts src/server/services/lesson-reflection.logic.test.ts
```

3. Repo kapıları:

```bash
npm run format
npm run typecheck
npm run lint
npm run build
```

4. Uygulamayı çalıştır; Görev 6 smoke senaryolarını gerçek Chromium'da gözle. Konsol hatası, taşma, odak kaybı, erişilemez ad veya bozuk loading durumu bırakma.
5. Son reviewer; tasarım kabul ölçütleri, güvenlik sınırı, eski çağrı noktaları, veri kaybı ve gereksiz kapsam açısından tüm değişikliği inceler. Bloklayıcı bulgular düzeltildikten sonra ilgili doğrulamalar yeniden çalıştırılır.

## Tamamlanma ölçütü

Tasarım belgesindeki bütün kabul ölçütleri gerçek uygulama, kalıcı veritabanı ve tarayıcı üzerinde gözlenmeden iş tamamlanmış sayılmaz. Yalnız tip kontrolü veya render görüntüsü yeterli değildir.
