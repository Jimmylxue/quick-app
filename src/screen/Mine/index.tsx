import Button from '@src/components/Button/Button'
import { useUser } from '@src/hooks/useAuth'
import { Text, View } from 'react-native'

export function Mine() {
	const { logOut } = useUser()
	return (
		<View className=" w-full h-full justify-center items-center">
			<Text>Mine~</Text>

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
