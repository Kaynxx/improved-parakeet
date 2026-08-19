# Tasarım Şeması Mimarisi — Finans Programı

Durum: **taslak, onay bekliyor**. Kod yazılmadı. Bu belge onaylandıktan sonra uygulama planına geçilecek.

## Kapsam

Bu tur yalnız **SP-1: tasarım dili temeli** — token mimarisi, üç şema, tipografi, malzeme, hareket sözlüğü. SP-2 (etkileşim omurgası: loading/error/not-found, spring hareket, gerçek klavye/erişilebilirlik) ve SP-3 (akış algoritmaları: sembol sayfası, akademi yazma yolu, arama) ayrı turlar — SP-1'in ürettiği token/primitiflere bağımlılar.

## Neden üç şema

Kullanıcı isteği: birbirinden bağımsız birden fazla tasarım dili — tek bir "doğru" tema değil, üç mimari olarak var olsunlar ve çalışma anında değişebilsinler. Bu, kozmetik bir renk paleti anahtarı değil; her şema kendi malzemesini, tipografik karakterini ve geometrisini taşıyan ayrı bir üründür.

| Şema | Arketip | Malzeme | Karakter |
|---|---|---|---|
| **Koyu Cam** (mevcut, onarılıyor) | Ethereal Glass | Translucent, blur, üst kenarda ışık çizgisi | Gece piyasası, sakin, az kontrast |
| **Açık Editoryal** | Editorial Luxury | Mat krem, ince mürekkep hatlı çerçeve, blur yok | Okuma-öncelikli, gündüz, güven |
| **Terminal** | Inverted High-Contrast | Düz siyah/beyaz, mono-öncelikli, sıfır radius | Ham veri, disiplin, en az dekorasyon |

Üçü de aynı bileşen ağacını kullanır (`BentoCard`, `Button`, `SectionHeader`, …); şema yalnız bunların *malzeme kompozitini* değiştirir — yeni komponent seti değil.

## Kanıt ile düzeltilenler (uygulanmayacak varsayımlar)

- **Tailwind `@theme` semantiği doğrulandı** (kurulu 4.3.3 derleyici, gerçek derleme çıktısı): normal `@theme` map'i `:root`'a bağlıdır — `data-theme` `<html>` üzerinde olduğu için `html[data-theme]` ile `:root` aynı düğüm, dolayısıyla mapping çalışır. `@theme inline` **kullanılmayacak** — descendant re-tema senaryosu yok ama inline mapping katmanını tamamen atlayıp custom CSS'in semantik rolleri tüketmesini engelliyor.
- **`color-mix` alfa-üstüne-alfa** doğrulandı: bir zaten `color-mix` olan token'a `/70` gibi opaklık modifikatörü uygulamak iç içe `color-mix` üretiyor (çarpımsal alfa sönümü). Kural: **tema token'ları düz renk kalır, opaklık yalnız kullanım noktasında bir kez uygulanır.**
- **`useLinkStatus` kurulu Next 15.5.22'de mevcut** (`next/dist/client/app-dir/link.d.ts:103`) — Gemini araştırması bunun yokluğunu iddia etmişti, kaynak koddan yanlışlandı.
- **Motion `prefers-reduced-motion` yalnız positional key'leri (x/y/scale gibi layout hareketini) susturuyor**, opacity/color animasyonları etkilemiyor (`motion-dom/animation/interfaces/visual-element-target.mjs:84-87`) — global CSS medya sorgusu hâlâ zorunlu, JS tarafı tek başına yetmez.
- **`bounce:0` = tam kritik sönüm** (`dampingRatio = 1 - bounce`), doğrulandı.
- **`duration`+`bounce` birlikte verilirse spring zaman-tanımlı olur ve devralınan hızı yok sayar** — kesinti (interrupt) senaryolarında bu asla kullanılmayacak; yalnız `bounce` (veya hiçbiri, varsayılan critically-damped) kullanılacak.

## Katman mimarisi (iki katman, tek kaynak)

```
Değişmez katman (şemadan bağımsız)     Şema katmanı (@theme, [data-theme="X"])
──────────────────────────────────     ──────────────────────────────────────
spacing ölçeği                         --surface, --surface-elevated
radius SLOT adları                      --ink, --ink-muted, --ink-faint
   (--radius-card/-inner/-pill)         --hairline, --hairline-strong
type ölçek ADIMLARI                     --accent, --accent-soft
   (--text-caption…--text-display)      --up, --down (fiyat yönü)
z-katmanları                            --radius-card/-inner/-pill DEĞERLERİ
motion süre/eğri isimleri               --material-card arka plan tarifi
                                         --font-display, --font-body, --font-figure
```

- Değişmez katman bir kez `globals.css`'te tanımlanır, hiçbir şema değiştirmez.
- Şema katmanı üç blok halinde yazılır: `@theme { … }` (varsayılan = Koyu Cam) + `[data-theme="editorial"] { … }` + `[data-theme="terminal"] { … }`. Değerler değişir, *isimler* değişmez — bileşenler her zaman semantik ismi tüketir (`bg-surface`, `text-ink`), asla ham hex.
- Geçiş: `<html data-theme>` sunucu tarafında bir çerezden okunur (server component, `cookies()` `await` ile — Next 15.5 zorunlu kılıyor), render ile birlikte doğru şema basılır. **Flaş yok**, ekstra client JS yok. İstemci tarafı switch bir server action ile çerezi kalıcılaştırır + `document.documentElement.dataset.theme` anlık günceller (round-trip beklemeden).

## Token temizliği (clean cutover, gerçek kullanım sayımıyla doğrulandı)

Yeniden okunan `globals.css` + `grep` sayımı önceki taslaktaki iki iddiayı düzeltti: `.rise` **kullanılıyor** (stagger animasyonu), `--color-paper`/`--color-rule` de **kullanılıyor** (7-8 dosya) — bunlar ölü değil, `--color-base`/`--color-hairline` ile aynı değeri taşıyan *gereksiz eşanlamlılar*. Gerçek ölü kod yalnız şunlar (0 kullanım sayımı doğrulandı):

| Kaldırılacak | Kanıt | Yerine geçecek |
|---|---|---|
| `.card` CSS sınıfı | `className="card"` sıfır eşleşme; `BentoCard` zaten `.glass` kullanıyor | `.glass` → `.glass-chrome` olarak tek isimde birleşiyor |
| `--color-sunken`, `--color-paper-deep` | sıfır kullanım (`bg-sunken`, `paper-deep` sıfır eşleşme) | silinecek |
| `--shadow-card`, `--shadow-chrome` | sıfır kullanım (yalnız `--shadow-lift` gerçekten tüketiliyor) | silinecek |
| `--color-paper` (7 dosya, hep `bg-ink`/`bg-ink/95` ile eşleşiyor) | değeri `--color-base` ile birebir aynı ama anlamı farklı: "solid ink yüzey üstü metin" | `--color-on-ink` — açık isim, Açık Editoryal'ın gerçek "paper" yüzeyiyle karışmasın |
| `--color-rule`/`--color-rule-strong` (4 dosya) | değeri `--color-hairline`/`--color-hairline-strong` ile birebir aynı | çağrı yerleri `border-hairline`/`border-hairline-strong`'a taşınıyor (hairline zaten 7 dosyada birincil isim) |
| `--color-up: #2dd4a0` (yeşil, "kazandırma hissi" iddiası — kanıtsız) | — | rakam yönü nötr kalır: kalın ağırlık + ok ikonu ile taşınır, renk *yalnız* Terminal şemasında sinyal rengi olarak kullanılır |

## Tipografi (23 px değerinden 7 adıma)

Adımlar Tailwind v4 `@theme` anahtarı olarak tanımlanır, her biri eşleşen `--text-*--line-height`, `--text-*--letter-spacing`, `--text-*--font-weight` taşır (derleyici bunu otomatik `.text-*` sınıfına bağlıyor — doğrulandı):

`--text-caption` `--text-meta` `--text-body` `--text-body-lg` `--text-label` `--text-heading-sm` `--text-heading` `--text-display`

- Büyük punto → negatif tracking (`-0.02em`…`-0.03em`), küçük punto (`caption`/`meta`) → pozitif tracking (`+0.01em`), okunabilirlik için.
- Rakamlar `Geist Mono` figürleri kullanır (tabular, hizalı) her üç şemada da — mono `--font-figure` değişmez tutuluyor, yalnız "human copy" yazı tipi (`--font-display`/`--font-body`) şema başına değişiyor.

| Şema | Display/Heading | Body/UI | Figure |
|---|---|---|---|
| Koyu Cam | Geist Sans (mevcut, değişmiyor) | Geist Sans | Geist Mono |
| Açık Editoryal | **Newsreader** (yeni — okuma için tasarlanmış editoryal serif, dramatik değil) | Geist Sans | Geist Mono |
| Terminal | Geist Mono (başlıklar da veri gibi görünür) | Geist Sans (uzun paragraf mono'da okunmaz — mevcut `globals.css` yorumundaki "Mono = makinenin sesi, Sans = insanın sesi" ilkesi korunuyor, yalnız dozu arttırılıyor) | Geist Mono |

Yeni yazı tipi yükü: yalnız Açık Editoryal `Newsreader` (self-hosted `next/font/google`, tek ağırlık aralığı 400–600). Diğer iki şema mevcut Geist ailesini tekrar kullanır — sıfır ek ağ isteği.

## Malzeme (şema başına, aynı `.material-card` sınıfı)

- **Koyu Cam**: `backdrop-filter: blur()` + yarı saydam beyaz, üst kenarda parlak `inset` çizgi (mevcut `--glass-edge` korunuyor, ama artık tek doğru kaynaktan — 6 yerde el ile yazılmış kopya kaldırılıyor).
- **Açık Editoryal**: blur **yok** (denetimde önerildiği gibi — büyük çözünürlükte malzemenin dolgunluğu blur değil kontrast ve ince mürekkep kenarlıkla kurulacak). Mat krem yüzey, `1px` mürekkep-tonu kenarlık, gölge yalnız yoğun/metin içeriğinin üstünde daha ağır.
- **Terminal**: düz kenarlık, blur yok, gölge yok — malzeme kavramı yok, yalnız çizgi ve zıtlık.

Radius (üç ayrı ölçek, aynı slot adları):

| Slot | Koyu Cam | Açık Editoryal | Terminal |
|---|---|---|---|
| `--radius-card` | 14px | 3px | 0px |
| `--radius-inner` | 8px | 2px | 0px |
| `--radius-pill` | 999px | 999px | 0px |

## Hareket sözlüğü (Apple Design ilkeleri, üç şemada aynı)

- **Press**: `pointerdown`'da anında `scale(0.97)`, CSS `:active`, gecikme yok — mevcut 160ms `ease` gecikmesi (denetim B4) kaldırılıyor.
- **Hover**: yalnız `@media (hover: hover)` altında, `150ms ease-out` — dokunmatik cihazda "sıkışan hover" kalıcı state hatası (denetim B4) düzeltiliyor.
- **Kesilebilir geçişler** (sidebar collapse genişliği, tema cross-fade, ileride eklenecek sheet/drawer): Motion spring, `damping:1.0`/kritik sönüm varsayılan, `bounce`/`duration` asla birlikte verilmez (devralınan hız kaybolmasın diye). X/Y ayrı spring'lere ayrılır.
- **Momentum (bounce > 0)**: yalnız gerçek bir sürükleme/flick hareketinden sonra — bu uygulamada şu an hiçbir sürükleme yüzeyi yok, bu yüzden şimdilik **inşa edilmiyor** (spekülatif hazırlık yasak); ileride bir sheet/carousel gelirse sözlük burada tanımlı kalıyor.
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` tüm giriş/liste animasyonlarını 150ms yalnız-opaklık çapraz geçişe indirir; `NewsTicker` marquee otomatik kayması durur ve görünür bir duraklat/oynat kontrolü eklenir (şu an marquee'nin durdurulacak bir yolu yok — denetim B10).

## Eksik primitif: `Button`

Denetimde `bg-ink` + `press` kalıbı 4 ayrı dosyada el ile kopyalanmış (`LoginForm`, `UserMenu`, `ArticleReader`, akademi CTA). SP-1 kapsamında tek bir `Button` bileşeni çıkarılacak (`primary`/`ghost`/`icon` varyant, `--radius-inner` slotunu tüketir), dört çağrı yeri ona taşınacak. Yeni davranış eklenmiyor — yalnız var olan görsel/etkileşim sözleşmesi tek yere toplanıyor.

## Bu turda YAPILMAYACAKLAR (SP-2/SP-3'e ait, kapsam dışı)

- `loading.tsx` / `error.tsx` / `not-found.tsx` sınırları, gerçek klavye gezinme, WCAG kontrast onarımları → SP-2.
- Sembol sayfası, akademi week→lesson yazma yolu, arama → SP-3.
- Hiçbir yeni özellik, hiçbir veri sözleşmesi değişikliği bu belgede yok.
