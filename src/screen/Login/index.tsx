import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Login } from '@src/biz/Login/Login'
import { StartIndex } from '@src/biz/Login/Start'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { auth, useUser } from '@src/hooks/useAuth'

export const LoginScreen = observer(() => {
	const [currentPage, setCurrentPage] = useState<
		'start' | 'login' | 'register'
	>('start')

	const { phone } = useUser()

	useEffect(() => {
		if (phone) {
			setCurrentPage('login')
		}
	}, [phone])

	return (
		<View className=" w-screen h-full ">
			<StatusBar style="auto" />
			{currentPage === 'start' && <StartIndex changePage={setCurrentPage} />}
			{currentPage === 'login' && <Login changePage={setCurrentPage} />}
		</View>
	)
})
