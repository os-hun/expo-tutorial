import * as SecureStore from 'expo-secure-store'

export const useSecureStore = () => {
  const save = async (key: string, value: string) => {
    return await SecureStore.setItemAsync(key, value)
  }

  const get = (key: string) => {
    return SecureStore.getItem(key)
  }

  const getAsync = async (key: string) => {
    return await SecureStore.getItemAsync(key)
  }

  const remove = async (key: string) => {
    return await SecureStore.deleteItemAsync(key)
  }

  return {
    save,
    get,
    getAsync,
    remove,
  }
}