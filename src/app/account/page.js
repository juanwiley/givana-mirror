'use client';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { getEnv } from '@/utils/get-env';

export default function AccountPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const env = getEnv(); // 'staging' or 'production'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Sending magic link...');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setStatus('Error sending magic link');
    } else {
      setStatus('Check your email for a login link!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Environment:</strong>{' '}
        <span style={{
          backgroundColor: env === 'staging' ? '#ffdd57' : '#def6d8',
          color: env === 'staging' ? '#997700' : '#2a7d2e',
          padding: '0.3rem 0.6rem',
          borderRadius: '6px',
          fontWeight: 600
        }}>
          {env.toUpperCase()}
        </span>
      </div>

      {session ? (
        <>
          <h2>Welcome, {session.user.email}</h2>
          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Email address:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <button type="submit" style={{ marginLeft: '1rem' }}>Send Magic Link</button>
          <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>{status}</div>
        </form>
      )}
    </main>
  );
}
