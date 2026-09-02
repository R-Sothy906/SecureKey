import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfptpdgpbpusfzsqlnfw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHRwZGdwYnB1c2Z6c3FsbmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTY5ODksImV4cCI6MjA4MDc3Mjk4OX0.wIsSFHo3_RHUnl4z8p2jzeuLLctmwLUXkruDckjWTE4';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
