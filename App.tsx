import '@styles/global.css'
import { RootNavigator } from '@src/navigation/RootNavigator'
import { ComposeProviders } from '@src/components/ComposeProviders'
import { ApiProvider } from '@src/api/ApiProvider'
import { NavigationContainer } from '@src/navigation/NavigationContainer'
import { ErrorHandler } from '@src/components/ErrorHandler'
import { RootSiblingParent } from 'react-native-root-siblings'
import Toast from 'react-native-toast-message'

export default function App() {
	return (
		<ComposeProviders
			components={[
				RootSiblingParent,
				ErrorHandler,
				ApiProvider,
				NavigationContainer,
			]}
		>
			<RootNavigator />
			<Toast topOffset={60} />
		</ComposeProviders>
	)
}
