
import { createClient } from '@supabase/supabase-js';

// Kredensial Supabase Anda (Connected!)
const supabaseUrl = 'https://txtocupgvtdxypektnyq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dG9jdXBndnRkeHlwZWt0bnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDc1MzksImV4cCI6MjA4NDk4MzUzOX0.g140zVqqbkWnuE4HUYmeN738IhOE-nog2McBZVyu7Hk';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
