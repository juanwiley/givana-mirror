// Public mirror stub for Supabase. No secrets, no network.
export function createClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOtp: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
    }),
    storage: { from: () => ({ upload: async () => ({ data: null, error: null }) }) },
  };
}
const client = createClient();
export default client;
