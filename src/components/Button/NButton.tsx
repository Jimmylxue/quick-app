import { Pressable, Text, View, ViewProps } from 'react-native'
import { NIcon, TIconType } from '../Icon/NIcon'
import classNames from 'classnames'

interface TProps extends ViewProps {
	type?: 'primary' | 'default'
	onPress?: () => void
	iconName?: string
	iconType?: TIconType
}

export function NButton({
	type = 'default',
	children,
	iconName,
	iconType,
	onPress,
	className,
}: TProps) {
	return (
		<View
			className={classNames(
				'p-4',
				{
					'bg-[#f8d55c]': type === 'primary',
					'bg-transparent': type === 'default',
					'border border-solid border-[#f8d55c]': type === 'default',
				},
				className
			)}
		>
			<Pressable
				onPress={onPress}
				className=" flex-row justify-center items-center"
			>
				{iconType && <NIcon name={iconName} iconType={iconType} />}
				<Text
					className={classNames({
						'text-[#f8d55c]': type === 'default',
						'text-white': type === 'primary',
					})}
				>
					{children}
				</Text>
			</Pressable>
		</View>
	)
}
