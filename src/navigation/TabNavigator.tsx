import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NIcon } from "@src/components/Icon/NIcon"
import { Home } from "@src/screen/Home"
import Message from "@src/screen/Message"
import { Mine } from "@src/screen/Mine"

import React from "react"
const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f8d55c",
        tabBarInactiveTintColor: "#58595B",
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
          headerShown: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Message"
        options={{
          tabBarLabel: "消息",
          headerShown: false,
        }}
        component={Message}
      />
      <Tab.Screen
        name="Mine"
        options={{
          tabBarLabel: "我的",
          headerShown: false,
        }}
        component={Mine}
      />
    </Tab.Navigator>
  )
}
