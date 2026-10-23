/* =====================================================
   KISHORI GLOBAL HOSPITAL
   Supabase client configuration
   ===================================================== */

(function () {
  "use strict";

  const SUPABASE_URL =
    "https://vvfatzkkhkwaxszjidun.supabase.co";

  const SUPABASE_PUBLIC_KEY =
    "sb_publishable_99Ke5fwz7jGHOpjiZocBrA_0_DSAFkj";

  if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
  ) {
    window.kghSupabase = null;
    console.error("KGH: Supabase SDK failed to load.");
    return;
  }

  try {
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

    console.info("KGH: Supabase client initialized.");
  } catch (error) {
    window.kghSupabase = null;
    console.error("KGH: Supabase initialization failed.");
  }
})();