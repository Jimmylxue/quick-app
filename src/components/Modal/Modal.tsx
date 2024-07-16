import { Pressable, Text, View, ViewProps } from 'react-native'
import { Modal as RModal } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface TProps extends ViewProps {
	visible: boolean
	title: string
	onClose: () => void
}

/**
 * 系统风格的 Modal
 */
export function Modal({ title, visible, onClose, children }: TProps) {
	return (
		<RModal animationType="slide" transparent={true} visible={visible}>
			<View className=" w-full min-h-[200] bg-[#25292e] absolute bottom-0">
				<View className=" bg-[#464C55] w-full rounded-tl-lg rounded-tr-lg py-1 flex flex-row justify-between items-center px-4">
					<Text className=" text-white">{title}</Text>
					<Pressable onPress={onClose}>
						<MaterialIcons name="close" color="#fff" size={22} />
					</Pressable>
				</View>
				<View className=" flex justify-center items-center p-5">
					{children}
				</View>
			</View>
		</RModal>
	)
}
