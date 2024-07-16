import {
	UndefinedInitialDataOptions,
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query'
import { ClientError } from '../type'
import http from '../client'

export type TUser = {
	id?: number
	username: string
	avatar: string
	sex: 1 | 0
	phone: string
	createTime?: string
	mail: string
}

export type TUserLoginParams = {
	phone: string
	password: string
}

export type TUserRegisterParams = TUserLoginParams & {
	username: string
}

export const useData = (
	config?: Omit<
		UndefinedInitialDataOptions<{ name: string }[], ClientError>,
		'queryFn'
	> & { params?: { userId: string } }
) => {
	return useQuery<{ name: string }[], ClientError>({
		...config,
		queryFn: () => http.post('/user/login', { ...config?.params }),
		queryKey: config!.queryKey,
	})
}

export const useLogin = (
	config?: UseMutationOptions<
		{ token: string; user: TUser },
		ClientError,
		TUserLoginParams
	>
) => {
	return useMutation<
		{ token: string; user: TUser },
		ClientError,
		TUserLoginParams
	>({
		mutationFn: async data => {
			const response: any = await http.post('user/login', data)
			console.log('response', response)
			return response
		},
		...config,
	})
}

export const useRegister = (
	config?: UseMutationOptions<any, ClientError, TUserRegisterParams>
) => {
	return useMutation<any, ClientError, TUserRegisterParams>({
		mutationFn: async data => {
			const response: any = await http.post('user/register', data)
			return response
		},
		...config,
	})
}

// export const useLogin = (
// 	config?: Omit<
// 		UndefinedInitialDataOptions<TstOm.VideoService.Group, ClientError>,
// 		'queryFn'
// 	> & { params?: TstOm.VideoService.GroupParams }
// ) => {
// 	return useMutation<{ token: string; user: TUser }, ClientError>({
// 		...config,
// 		mutationFn: () => http.post('/user/login', {}),
// 	})
// }
