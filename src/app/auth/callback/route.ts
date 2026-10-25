import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code && supabase) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      console.error('[AUTH CALLBACK] Error exchanging code for session:', err);
    }
  }

  // Redirect to application root after authentication
  return NextResponse.redirect(`${origin}/`);
}
