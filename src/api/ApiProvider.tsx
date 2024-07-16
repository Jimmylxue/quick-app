import { useAppState } from '@src/hooks/useAppState'
import { useOnLineManager } from '@src/hooks/useOnLineManager'
import {
	focusManager,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import type { AppStateStatus, ViewProps } from 'react-native'

function onAppStateChange(status: AppStateStatus) {
	focusManager.setFocused(status === 'active')
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

interface TProps extends ViewProps {}

export const ApiProvider = ({ children }: TProps) => {
	useOnLineManager()
	useAppState(onAppStateChange)
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
