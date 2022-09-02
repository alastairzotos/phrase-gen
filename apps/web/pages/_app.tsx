import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getEnv } from '../env';
import { useEffect } from 'react';
import { useAuthState } from '../state/auth';

function PhraseGenApp({ Component, pageProps }: AppProps) {
  const initLocalStorage = useAuthState(s => s.initLocalStorage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initLocalStorage();
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={getEnv().googleClientId}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default PhraseGenApp
