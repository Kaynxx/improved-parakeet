import { encode } from "next-auth/jwt";
import "./load-env";

const secret = process.env.AUTH_SECRET;
if (!secret) throw new Error("AUTH_SECRET denetim için yüklenemedi.");

const token = await encode({
  secret,
  salt: "authjs.session-token",
  token: {
    sub: "security-audit",
    name: "Güvenlik Denetimi",
    email: "guvenlik-denetimi@example.test",
  },
});

const origin = "http://127.0.0.1:3000";
const cookie = `authjs.session-token=${token}`;

async function konum(
  yol: string,
): Promise<{ durum: number; konum: string | null; disOrigin: boolean | null }> {
  const yanit = await fetch(`${origin}${yol}`, { headers: { cookie }, redirect: "manual" });
  const konum = yanit.headers.get("location");
  return {
    durum: yanit.status,
    konum,
    disOrigin: konum ? new URL(konum, origin).origin !== origin : null,
  };
}

const dashboard = await fetch(`${origin}/`, { headers: { cookie } });
const govde = await dashboard.text();

console.log(
  JSON.stringify(
    {
      tersBolu: await konum("/giris?donus=%2F%5Cevil.example"),
      mutlak: await konum("/giris?donus=https%3A%2F%2Fevil.example%2F"),
      protokolGoreli: await konum("/giris?donus=%2F%2Fevil.example"),
      gecerliIcYol: await konum("/giris?donus=%2Fhaberler"),
      dashboard: {
        durum: dashboard.status,
        panelIcerigi: /Haber akışı|Piyasa|Akademi/.test(govde),
        sirIsareti: /DATABASE_URL|AUTH_SECRET|password_hash/.test(govde),
      },
    },
    null,
    2,
  ),
);
