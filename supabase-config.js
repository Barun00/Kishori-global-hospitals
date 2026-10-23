/* KISHORI GLOBAL HOSPITAL — SUPABASE CONNECTION */

(function () {
  "use strict";

  const SUPABASE_URL =
    "https://vvfatzkkhkwaxszjidun.supabase.co";

  const SUPABASE_PUBLIC_KEY =
    sb_publishable_99Ke5fwz7jGHOpjiZocBrA_0_DSAFkj;

  if (!window.supabase?.createClient) {
    window.kghSupabase = null;
    console.error("Supabase SDK did not load.");
    return;
  }

  if (SUPABASE_PUBLIC_KEY.includes("PASTE_YOUR")) {
    window.kghSupabase = null;
    console.warn("Supabase public key has not been configured.");
    return;
  }

  window.kghSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  console.info("Kishori Global Hospital backend connected.");
})();