"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { type GirisDurumu, girisYap } from "@/app/(auth)/giris/actions";
import { Button } from "@/components/common/Button";

const BASLANGIC: GirisDurumu = { hata: null };

export function LoginForm({ donus }: { donus: string }) {
  const [durum, action] = useActionState(girisYap, BASLANGIC);

  return (
    <form action={action} className="mt-7 flex flex-col gap-4">
      <input type="hidden" name="donus" value={donus} />

      <Alan
        id="email"
        name="email"
        type="email"
        label="E-posta"
        autoComplete="username"
        placeholder="ornek@eposta.com"
      />
      <Alan
        id="password"
        name="password"
        type="password"
        label="Şifre"
        autoComplete="current-password"
        placeholder="••••••••"
      />

      {durum.hata ? (
        <p
          role="alert"
          className="rounded-[var(--radius-inner)] bg-down-soft px-4 py-3 text-copy leading-relaxed text-down"
        >
          {durum.hata}
        </p>
      ) : null}

      <GonderDugmesi />
    </form>
  );
}

interface AlanProps {
  id: string;
  name: string;
  type: "email" | "password";
  label: string;
  autoComplete: string;
  placeholder: string;
}

function Alan({ id, name, type, label, autoComplete, placeholder }: AlanProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="inset-panel h-11 px-3.5 text-md text-ink placeholder:text-ink-faint"
      />
    </div>
  );
}

/**
 * `useFormStatus` yalnız formun İÇİNDEKİ bir bileşenden okunabiliyor — bu
 * yüzden düğme ayrı. Gönderim sırasında kilitlenir; iki kez basmak iki giriş
 * denemesi başlatıyordu.
 */
function GonderDugmesi() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-1 w-full">
      {pending ? "Giriş yapılıyor…" : "Giriş yap"}
    </Button>
  );
}
