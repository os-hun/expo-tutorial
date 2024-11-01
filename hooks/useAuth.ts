import * as WebBrowser from 'expo-web-browser'

type GetCsrfTokenData = {
  csrfToken: string
}

type SignInData = {
  url: string
}

export const useAuth = () => {
  const apiBaseUrl = 'http://localhost:8787'

  const getCsrfToken = async () => {
    const res = await fetch(`${apiBaseUrl}/auth/csrf`)
    const data = (await res.json()) as GetCsrfTokenData
    return data.csrfToken
  }

  const signIn = async () => {
    const result = await WebBrowser.openAuthSessionAsync(`${apiBaseUrl}/auth/signin/`)
    console.log(result)
  }

  return {
    getCsrfToken,
    signIn
  }
}
