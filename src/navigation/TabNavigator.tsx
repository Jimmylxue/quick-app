import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "@src/screen/Home"
import { NewHome } from "@src/screen/Home/index copy"
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
        component={NewHome}
      />
      <Tab.Screen
        name="Message"
        options={{
          tabBarLabel: "消息",
        }}
        component={Message}
      />
      <Tab.Screen
        name="Mine"
        options={{
          tabBarLabel: "我的",
        }}
        component={Mine}
      />
    </Tab.Navigator>
  )
}
