import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NIcon } from '@src/components/Icon/NIcon'
import { Home } from '@src/screen/Home'
import { Mine } from '@src/screen/Mine'

import React from 'react'
const Tab = createBottomTabNavigator()

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
					tabBarIcon: () => (
						<NIcon
							iconType="EvilIcons"
							name="chevron-left"
							color="#000"
							size={22}
							onPress={() => {}}
						/>
					),
				}}
				component={Home}
			/>
			<Tab.Screen
				name="Mine"
				options={{
					tabBarLabel: '我的',
					headerShown: false,
				}}
				component={Mine}
			/>
		</Tab.Navigator>
	)
}
