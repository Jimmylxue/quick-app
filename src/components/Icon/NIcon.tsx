import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Feather from '@expo/vector-icons/Feather'
import { Pressable } from 'react-native'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

export type TIconType =
	| 'FontAwesome'
	| 'AntDesign'
	| 'Entypo'
	| 'EvilIcons'
	| 'Feather'

interface TProps extends IconProps<any> {
	iconType: TIconType
	onPress?: () => void
}

export function NIcon({ iconType, onPress, ...arg }: TProps) {
	// @ts-ignore
	const args = { ...arg, size: arg.size ? arg.size : 40 }
	const iconMap = {
		FontAwesome: <FontAwesome {...args} />,
		AntDesign: <AntDesign {...args} />,
		Entypo: <Entypo {...args} />,
		EvilIcons: <EvilIcons {...args} />,
		Feather: <Feather {...args} />,
	}
	return <Pressable onPress={onPress}>{iconMap[iconType]}</Pressable>
}
