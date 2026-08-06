import { Bell, Search } from "lucide-react";

/**
 * Sabit kabuk. İçerik altından aktığı için saydam; alt kenarında çizgi yerine
 * `scroll-edge` solması var — çizgi içeriğin bitip bitmediğine bakmadan durur
 * ve sayfayı boş yere böler.
 *
 * Arama ve bildirim hâlâ kabuk. Auth bağlanınca sağdaki düğme oturum menüsüne
 * dönüşecek; o zaman değişecek tek şey harfin yerine kullanıcının adı olacak.
 */
export function TopBar() {
  return (
    <header className="chrome scroll-edge sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 px-4 sm:px-7">
      <label className="relative flex min-w-0 flex-1 items-center sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3 size-4 text-ink-faint"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="sr-only">Haberlerde ve gönderilerde ara</span>
        {/* Yer tutucu metin ne aranabileceğini SÖYLÜYOR. "Ara…" yalnız
            kutunun ne olduğunu tekrar ediyordu; ikon zaten onu söylüyor. */}
        <input
          type="search"
          placeholder="Başlık veya sembol ara"
          className="h-10 w-full rounded-[var(--radius-inner)] bg-card pr-3 pl-9 text-[14px] text-ink shadow-[var(--shadow-card)] placeholder:text-ink-faint"
        />
      </label>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="press flex size-10 items-center justify-center rounded-[var(--radius-inner)] bg-card text-ink-muted shadow-[var(--shadow-card)] hover:text-ink"
        >
          <Bell className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">Bildirimler</span>
        </button>
        <button
          type="button"
          className="press flex size-10 items-center justify-center rounded-[var(--radius-inner)] bg-ink text-[13px] font-semibold text-paper hover:bg-accent"
        >
          <span aria-hidden="true">K</span>
          <span className="sr-only">Hesap</span>
        </button>
      </div>
    </header>
  );
}
