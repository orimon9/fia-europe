"use client";

import { createBrowserClient } from "@supabase/ssr";

// Single browser client for the whole app (auth + data, real-time included)
export function createClient() {
 /* return createBrowserClient(
   // process.env.NEXT_PUBLIC_SUPABASE_URL,
   // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );  */
}

// Convenience singleton
let _client;
export function supabase() {
  if (!_client) _client = createClient();
  return _client;
}
