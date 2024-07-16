import AsyncStorage from '@react-native-async-storage/async-storage'

export const AUTH_TOKEN_NAME = 'snow_token'
export const AUTH_USER = 'snow_user'

export async function getAuthToken(): Promise<string | null> {
	const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME)
	return token
}

export async function setAuthToken(token: string) {
	return await AsyncStorage.setItem(AUTH_TOKEN_NAME, token)
}

export async function removeAuthToken() {
	return await AsyncStorage.removeItem(AUTH_TOKEN_NAME)
}

export async function getAuthUser(): Promise<string | null> {
	const token = await AsyncStorage.getItem(AUTH_USER)
	return token
}

export async function setAuthUser(userInfo: string) {
	return await AsyncStorage.setItem(AUTH_USER, userInfo)
}
