import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '@src/screen/Home'

import React from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image } from 'react-native'
const Tab = createBottomTabNavigator()

const TabIcon = ({ source }: { source?: ImageSourcePropType | undefined }) => {
	return <Image className="size-6" source={source} />
}

export const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#378BFF',
				tabBarInactiveTintColor: '#58595B',
				tabBarLabelStyle: {
					fontSize: 10,
					fontWeight: '500',
				},
			}}
		>
			<Tab.Screen
				name="Home"
				options={{
					tabBarLabel: '首页',
					headerShown: false,
				}}
				component={Home}
			/>
		</Tab.Navigator>
	)
}
