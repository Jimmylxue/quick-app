import { ComponentType, ReactNode } from 'react'
import { Text, View } from 'react-native'

type ComposeProvidersProps = {
	/** Provider components go here */
	components: Array<ComponentType<{ children: ReactNode }>>
	children: ReactNode
}

export function ComposeProviders(props: ComposeProvidersProps) {
	return props.components.reduceRight(
		(memo, Component) => <Component>{memo}</Component>,
		props.children
	)
}
