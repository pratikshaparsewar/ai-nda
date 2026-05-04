import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

let supabase: SupabaseClient

try {
  supabase = createClient(url, key)
} catch {
  supabase = null as unknown as SupabaseClient
}

export { supabase }
