const { createClient } = require("@supabase/supabase-js");

// Create a Supabase client for user routes (Public Access)
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY
);

// Create a Supabase client for book routes (Service Role Access)
const createSupabaseClient = (token) => {
  const supabaseService = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,  // Use service role key here
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
  return supabaseService;
};

module.exports = { supabaseAnon, createSupabaseClient };
