import { Bell, Search } from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import type { SessionUser } from "@/types";

/**
 * Sabit kabuk. İçerik altından aktığı için saydam; alt kenarında çizgi yerine
 * `scroll-edge` solması var — çizgi içeriğin bitip bitmediğine bakmadan durur
 * ve sayfayı boş yere böler.
 *
 * Arama ve bildirim hâlâ kabuk; sağdaki oturum menüsü artık gerçek.
 */
export function TopBar({ user }: { user: SessionUser }) {
  return (
    <header className="glass-chrome scroll-edge sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-hairline px-4 sm:px-7">
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
          className="inset-panel h-10 w-full pr-3 pl-9 text-[14px] text-ink placeholder:text-ink-faint"
        />
      </label>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="inset-panel press flex size-10 items-center justify-center text-ink-muted hover:border-hairline-strong hover:text-ink"
        >
          <Bell className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">Bildirimler</span>
        </button>
        <UserMenu name={user.name} email={user.email} image={user.image} />
      </div>
    </header>
  );
}
