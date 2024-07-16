import { NButton } from '@src/components/Button/NButton'
import { NIcon } from '@src/components/Icon/NIcon'
import { Input } from '@src/components/Input'
import { useUser } from '@src/hooks/useAuth'
import { auth } from '@src/hooks/useAuth'
import { encrypt } from '@src/utils/encrypt'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
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

export const Login = observer(({ changePage }: TProps) => {
	const [phone, setPhone] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const { login } = useUser()

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
		<Animated.View style={[animatedStyle]}>
			<View className=" mt-[70] px-4">
				<NIcon
					iconType="EvilIcons"
					name="chevron-left"
					color="#FFF"
					size={50}
					onPress={() => {
						changePage('start')
					}}
				/>

				<View className=" px-4">
					<View className=" mt-10 ">
						<Text className=" text-white text-5xl">Sign in</Text>
						<Text className=" text-gray-500 text-xl mt-2">
							Sign in to continue
							{auth.token}
						</Text>
					</View>
					<View className=" mt-10">
						<Input
							title="UserName"
							placeholder="Please type your name"
							value={phone}
							onChangeText={val => {
								setPhone(val)
							}}
						/>
					</View>
					<View className=" mt-10">
						<Input
							title="Password"
							secureTextEntry
							autoComplete="password"
							textContentType="password"
							placeholder="Please type your password"
							value={password}
							onChangeText={val => setPassword(val)}
						/>
					</View>

					<View className=" justify-center flex-row">
						<NButton
							type="primary"
							className=" mt-20 rounded-3xl w-full"
							onPress={async () => {
								const newPassword = await encrypt(password)
								await login({ phone, password: newPassword })
							}}
						>
							Login
						</NButton>
					</View>
				</View>
			</View>
		</Animated.View>
	)
})
