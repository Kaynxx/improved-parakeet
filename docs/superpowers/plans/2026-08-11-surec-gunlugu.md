# Süreç Günlüğü Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Projenin doğrulanmış geçmişini, güncel durumunu ve fazlara/konulara ayrılmış gelecek yol haritasını tek bir yaşayan `SUREC-GUNLUGU.md` belgesinde toplamak.

**Architecture:** Günlük, proje kökünde tek bir operasyonel giriş noktasıdır. Kalıcı teknik ayrıntıları kopyalamak yerine `CLAUDE.md` ve `memory-bank/` belgelerine yönlendirir; güncel gerçekleri belirlerken Git geçmişi ve çalışma ağacını eski dokümantasyonun önünde tutar.

**Tech Stack:** Markdown, Git, PowerShell tabanlı salt-okunur doğrulama komutları.

## Global Constraints

- Belge ve açıklamalar Türkçe olacak.
- Yol haritası `Faz → Konu/iş paketi → Somut görev` hiyerarşisini kullanacak.
- Her fazın amacı, durumu, bağımlılıkları ve tamamlanma ölçütü yazılacak.
- Doğrulanmamış sonuçlar tamamlanmış gösterilmeyecek.
- Kullanıcıya ait mevcut çalışma ağacı değişikliklerine dokunulmayacak.
- Ayrıntılı mimari kararların kaynağı `memory-bank/decisionLog.md`, kalıcı proje kurallarının kaynağı `CLAUDE.md` olarak kalacak.

---

### Task 1: Yaşayan süreç günlüğünü oluştur

**Files:**
- Create: `SUREC-GUNLUGU.md`
- Reference: `CLAUDE.md`
- Reference: `memory-bank/INDEX.md`
- Reference: `memory-bank/now.md`
- Reference: `memory-bank/product.md`
- Reference: `memory-bank/architecture.md`
- Reference: `memory-bank/environment.md`
- Reference: `memory-bank/decisionLog.md`
- Reference: `docs/superpowers/specs/2026-08-11-surec-gunlugu-design.md`

**Interfaces:**
- Consumes: Git commit geçmişi, çalışma ağacı durumu ve yukarıdaki proje belgeleri.
- Produces: Yeni oturumlarda ilk okunacak operasyonel özet olan `SUREC-GUNLUGU.md`.

- [ ] **Step 1: Kaynaklardaki çelişkileri güncel Git durumuyla çöz**

Run:

```powershell
git log --oneline --decorate --all
git status --short
git branch --show-current
```

Expected: Aktif dal `faz2bc-akademi-mufredat`; auth, akademi yapısı, 40 ders ve rota düzeltmesi commit'li görünür. Çelişkide Git ile `memory-bank/now.md` ve `decisionLog.md` kaynak önceliğine göre değerlendirilir.

- [ ] **Step 2: Günlüğü doğrulanmış mevcut durumla oluştur**

Create `SUREC-GUNLUGU.md` with these sections and facts:

```markdown
# Finans Programı — Süreç Günlüğü

## Nasıl kullanılır
## Projenin amacı
## Mevcut durum
## Tamamlanan aşamalar
## Bundan sonra yapılacaklar
### Faz 0 — Mevcut sürümü sağlamlaştırma
### Faz 2C — Topluluk ve Reddit duyarlılığı
### Faz 2D — Video/akademi kaynaklarının sonlandırılması
### Faz 2F — Gerçek piyasa verisi
### Faz 3 — Ürün bütünlüğü ve kalite
### Faz 4 — Dağıtım kararı ve operasyon
## Açık kararlar ve sorunlar
## Çalışma kuralları
## Kronolojik süreç günlüğü
```

Record these verified milestones:

- Faz 1 mock dashboard tamamlandı.
- Faz 2A Postgres/Drizzle/veri temeli tamamlandı.
- Haber motoru RSS, sembol eşleştirme ve worker ile tamamlandı.
- E-posta/şifre tabanlı tek kullanıcı auth ve ilerleme temeli tamamlandı.
- Akademi şeması `weeks`/`lessons` yapısına geçirildi; kaynak, soru, cevap ve AI değerlendirme katmanları eklendi.
- 8 hafta, 40 ders, 120 kaynak, 120 soru ve 70 ön koşul kenarı oluşturuldu ve commit'lendi.
- Ders rotasındaki 404 sorunu `eeb0e19` commit'iyle düzeltildi.
- `sentiment.ts`, `video.ts` ve `market.ts` servislerinin hâlâ mock kullandığı açıkça gösterilecek.

Plan future work in this order:

1. Mevcut dalın güncel doğrulamalarını çalıştır, Memory Bank/`CLAUDE.md` durum özetlerini Git ile eşitle ve çalışma ağacındaki kullanıcı dosyalarını ayır.
2. Reddit kimlik bilgileri sağlanırsa Faz 2C için ayrı tasarım → plan → uygulama turu yap; topluluklar, gönderiler, sembol eşleştirme, duyarlılık skoru ve günlük rollup'ı kapsa.
3. Faz 2D'nin gerekli olup olmadığına karar ver; ders videoları doğrudan YouTube kimlikleriyle çalıştığından Data API'yi yalnız otomatik keşif/yenileme gerekiyorsa ekle.
4. Faz 2F için veri sağlayıcısı, sembol kapsamı, gecikme, kota ve saklama politikasını seç; sonra piyasa mock servisini gerçek veriye geçir.
5. Gerçek veri dilimleri bittikten sonra test altyapısı, erişilebilirlik, hata/boş/yüklenme durumları, performans ve güvenlik kontrollerini tamamla.
6. En son deployment hedefi ile worker/Postgres operasyon modelini seç; localhost-only kararı değişmedikçe dağıtımı tamamlanmış gösterme.

- [ ] **Step 3: İlk kronolojik kaydı ekle**

Add a `2026-08-11 — Süreç günlüğünün kurulması` entry containing:

- amaç: yaşayan süreç günlüğü oluşturmak;
- kaynaklar: `CLAUDE.md`, tüm Memory Bank çekirdek dosyaları, Git geçmişi ve çalışma ağacı;
- yapılanlar: tasarımın ve planın yazılması, faz/konu ayrımının kurulması;
- değişen dosyalar: tasarım, plan ve günlük dosyaları;
- doğrulama: çalıştırılan komutları gerçek sonuçlarıyla kaydet;
- sıradaki adım: Faz 0 sağlamlaştırma ve dokümantasyon eşitleme.

- [ ] **Step 4: Belge bütünlüğünü doğrula**

Run:

```powershell
Get-Content -Raw -Encoding utf8 'SUREC-GUNLUGU.md'
Select-String -Path 'SUREC-GUNLUGU.md' -Pattern 'yer_tutucu|0/40|commit.siz'
git diff --check -- 'SUREC-GUNLUGU.md'
```

Expected: Dosya UTF-8 Türkçe karakterlerle okunur; eski durum ifadeleri ve belirsiz yer tutucular bulunmaz; `git diff --check` hata vermez.

- [ ] **Step 5: Yalnız süreç günlüğü dosyasını commit et**

```powershell
git add -- 'SUREC-GUNLUGU.md'
git commit -m "Proje süreç günlüğünü ve yol haritasını ekle" -- 'SUREC-GUNLUGU.md'
```

Expected: Kullanıcının mevcut `memory-bank/`, `skills-lock.json` ve araç klasörü değişiklikleri commit'e girmez.
