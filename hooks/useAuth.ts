import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useState } from 'react'

export const useAuth = () => {
  const [session, setSession] = useState<string | null>(null)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  
  const baseUrl = 'http://localhost:5173'
  const redirectUrl = Linking.createURL('/')

  const signIn = async () => {
    const result = await WebBrowser.openAuthSessionAsync(`${baseUrl}/callback?from=native&redirectUrl=${redirectUrl}`)
    console.log(result)

    if (result.type === 'success') {
      const url = new URL(result.url)
      const params = new URLSearchParams(url.search)

      const session = params.get('session')
      const csrfToken = params.get('csrfToken')

      if (session && csrfToken) {
        setSession(session)
        setCsrfToken(csrfToken)
      }
    }
  }

  return {
    signIn,
    session,
    csrfToken,
  }
}
