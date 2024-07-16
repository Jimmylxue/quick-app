import Button from '@src/components/Button/Button'
import { useUser } from '@src/hooks/useAuth'
import { Text, View } from 'react-native'

export function Home() {
	const { logOut } = useUser()
	return (
		<View className=" w-full h-full justify-center items-center">
			<Text>Homeaa</Text>
			<Button
				theme="primary"
				onPress={() => {
					logOut()
				}}
			>
				退出登录
			</Button>
		</View>
	)
}
