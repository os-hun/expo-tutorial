import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useSecureStore } from './useSecureStore'

export const useAuth = () => {
  const { save } = useSecureStore()
  
  const baseUrl = 'http://localhost:5173'
  const redirectUrl = Linking.createURL('/')

  const signIn = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `${baseUrl}/auth/login?from=native&redirectUrl=${redirectUrl}`
    )

    if (result.type === 'success') {
      const url = new URL(result.url)
      const params = new URLSearchParams(url.search)

      const session = params.get('session')
      const csrfToken = params.get('csrfToken')

      if (session && csrfToken) {
        await save('session', session)
        await save('csrfToken', csrfToken)
      }
    }
  }

  return {
    signIn,
  }
}
