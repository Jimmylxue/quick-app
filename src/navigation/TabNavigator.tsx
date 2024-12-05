import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "@src/screen/Home"
import Message from "@src/screen/Message"
import { Mine } from "@src/screen/Mine"

import React from "react"
const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2a77c9",
        tabBarInactiveTintColor: "#3db2f5",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 20,
          marginBottom: 10,
        },
        tabBarIcon: () => <></>,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "首页",
          unmountOnBlur: true,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Message"
        options={{
          tabBarLabel: "消息",
          unmountOnBlur: true,
        }}
        component={Message}
      />
      <Tab.Screen
        name="Mine"
        options={{
          tabBarLabel: "我的",
          unmountOnBlur: true,
        }}
        component={Mine}
      />
    </Tab.Navigator>
  )
}
