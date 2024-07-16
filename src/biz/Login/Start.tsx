import { NButton } from '@src/components/Button/NButton'
import { HelloWave } from '@src/components/HelloWave'
import { auth } from '@src/hooks/useAuth'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated'
type TProps = {
	changePage: React.Dispatch<
		React.SetStateAction<'start' | 'login' | 'register'>
	>
}

export const StartIndex = observer(({ changePage }: TProps) => {
	const opacity = useSharedValue(0)

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		}
	})

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 1000 })
	}, [opacity])

	return (
		<Animated.View style={[animatedStyle]} className="h-full">
			<>
				<View className=" justify-center flex-row mt-[180]">
					<Image
						className=" size-[200]"
						source={require('@src/assets/images/talk.png')}
					/>
				</View>

				<View className="  mb-5 mt-10">
					<View className="flex-row justify-center items-center">
						<Text className=" text-white text-3xl font-semibold bg-red-300">
							Hello !
						</Text>
						<HelloWave />
					</View>
					<View className="px-10 justify-center mt-5">
						<Text className=" text-gray-500 text-lg text-center">
							Wish can be a good companion on your growth journey.
						</Text>
					</View>
				</View>

				<View className="absolute bottom-40 w-full flex-row justify-center">
					<NButton
						type="primary"
						className=" rounded-lg w-[270]"
						onPress={() => {
							changePage('login')
						}}
					>
						SIGN IN
					</NButton>
				</View>

				<View className="absolute bottom-20 w-full flex-row justify-center">
					<NButton
						className=" rounded-lg w-[270]"
						onPress={() => {
							changePage('register')
						}}
					>
						SIGN UP
					</NButton>
				</View>

				<View className=" absolute bottom-10 w-full">
					<Text className=" text-white text-sm text-center">
						design by jimmy
					</Text>
				</View>
			</>
		</Animated.View>
	)
})
