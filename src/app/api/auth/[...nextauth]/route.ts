import { handlers } from "@/auth";

/** Auth.js'in tüm uç noktaları: /api/auth/signin, /callback/google, /signout … */
export const { GET, POST } = handlers;
