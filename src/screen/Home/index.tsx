import Button from '@src/components/Button/Button'
import { navigates } from '@src/navigation/navigate'
import { Text, View } from 'react-native'

export function Home() {
	return (
		<View className=" w-full h-full justify-center items-center">
			<Text>Homeaa</Text>
			<Button
				theme="primary"
				onPress={() => {
					console.log('click')
					navigates('Painting', undefined)
				}}
			>
				Painting
			</Button>
		</View>
	)
}
