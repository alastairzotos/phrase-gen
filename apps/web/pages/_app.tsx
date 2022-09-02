import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getEnv } from '../env';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={getEnv().googleClientId}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp
