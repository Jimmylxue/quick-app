import './src/styles/global.css'
import { ComposeProviders } from '@src/components/ComposeProviders'
import { ErrorHandler } from '@src/components/ErrorHandler'
import { RootSiblingParent } from 'react-native-root-siblings'
import Toast from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { NumberInputDemo } from '@src/components/Content'
SplashScreen.preventAutoHideAsync()

export default function App() {
	const [loaded] = useFonts({
		SpaceMono: require('@src/assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
			// 延长启动页的时间
			// setTimeout(SplashScreen.hideAsync, 5000)
		}
	}, [loaded])

	return (
		<ComposeProviders components={[RootSiblingParent, ErrorHandler]}>
			<NumberInputDemo />
			<Toast topOffset={60} />
		</ComposeProviders>
	)
}
