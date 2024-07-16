import {
	TUser,
	TUserRegisterParams,
	useLogin,
	useRegister,
} from '@src/api/login'
import {
	getAuthToken,
	getAuthUser,
	removeAuthToken,
	setAuthToken,
	setAuthUser,
} from '@src/utils/storage'

import { action, makeAutoObservable, observable, configure } from 'mobx'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

configure({ enforceActions: 'observed' })

class Auth {
	shouldLogin: boolean = true

	user?: TUser

	@observable token?: string = ''

	constructor() {
		makeAutoObservable(this)
		this.initState()
	}

	private async initState() {
		const [token, user] = await Promise.all([
			await getAuthToken(),
			await getAuthUser(),
		])
		this.user = JSON.parse(user!)
		this.token = token || ''
	}

	@action setShouldLoginStatus(status: boolean) {
		this.shouldLogin = status
	}

	@action setLoginUser(user?: TUser) {
		this.user = user
	}

	@action setToken(token?: string) {
		this.token = token
	}
}

export const auth = new Auth()

export function useUser() {
	const { mutateAsync } = useLogin({
		onSuccess: async res => {
			Toast.show({
				type: 'success',
				text1: '登录成功',
			})
			await setAuthToken(res.token)
			await setAuthUser(JSON.stringify(res.user))
			auth.setLoginUser(res.user)
			auth.setToken(res.token)
		},
	})
	const { mutateAsync: registerFn } = useRegister({
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: '注册成功',
			})
		},
	})

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem('login-user')!)
			if (user) {
				auth.setLoginUser(user)
			} else {
				auth.setShouldLoginStatus(true)
			}
		} catch {
			auth.setShouldLoginStatus(true)
		}
	}, [])

	const login = async (params: { phone: string; password: string }) => {
		console.log('pppp', params)
		await mutateAsync({
			phone: params.phone,
			password: params.password,
		})
	}

	const register = async (params: TUserRegisterParams) => {
		await registerFn(params)
	}

	const showLoginModal = () => {
		auth.setShouldLoginStatus(true)
	}

	const checkUserLoginBeforeFn = () => {
		if (auth.user?.id) {
			return true
		}
		showLoginModal()
		return false
	}

	const updateUser = async (user: TUser) => {
		await setAuthUser(JSON.stringify(user))
		auth.setLoginUser(user)
	}

	const logOut = async () => {
		auth.user = undefined
		auth.setLoginUser(undefined)
		await removeAuthToken()
		await setAuthUser('')
		auth.setToken('')
		Toast.show({ type: 'info', text1: '已退出' })
		auth.setShouldLoginStatus(true)
	}

	return {
		user: auth.user,
		login,
		showLoginModal,
		register,
		checkUserLoginBeforeFn,
		updateUser,
		logOut,
	}
}
