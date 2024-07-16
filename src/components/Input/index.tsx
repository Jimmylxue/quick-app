import classNames from 'classnames'
import { Text, TextInput, TextInputProps, View } from 'react-native'

interface TProps extends TextInputProps {
	title: string
}

export function Input({ title, className, ...args }: TProps) {
	return (
		<View>
			{title && (
				<View>
					<Text className=" text-gray-300 font-semibold text-lg">{title}</Text>
				</View>
			)}
			<TextInput
				placeholderTextColor="#d1d5db"
				className={classNames(
					' border-b border-solid border-white py-4 text-gray-300 text-lg -mt-2',
					className
				)}
				placeholder="Please type your name"
				{...args}
			/>
		</View>
	)
}
