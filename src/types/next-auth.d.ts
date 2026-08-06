import type { DefaultSession } from "next-auth";

/**
 * Auth.js'in varsayılan `Session["user"]` tipinde `id` yok — yalnız name,
 * email ve image var. `user_progress` kaydı kullanıcı kimliğine bağlı olduğu
 * için sayfaların id'ye ihtiyacı var; `src/auth.ts`'teki session callback onu
 * dolduruyor, burada da tipi bildiriliyor.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
