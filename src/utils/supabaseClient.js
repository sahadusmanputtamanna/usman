import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] MISSING environment variables! Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      // Keep session across page refreshes
      persistSession: true,
      // Automatically refresh JWT before it expires
      autoRefreshToken: true,
      // Detect session from URL (needed for magic links / OAuth)
      detectSessionInUrl: true,
    },
    // Send the apikey header on every request
    global: {
      headers: {
        apikey: supabaseAnonKey,
      },
    },
  }
);
