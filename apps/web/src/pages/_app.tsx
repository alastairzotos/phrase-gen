import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from "@bitmetro/auth-react";

function PhraseGenApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider
      localStorageKey="@phrase-gen:access-token"
      propertyId="bitmetro.phrase-gen"
    >
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default PhraseGenApp
