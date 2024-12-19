import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaView, StatusBar } from "react-native"
import { Home } from "@src/screen/Home"
import Message from "@src/screen/Message"
import { Mine } from "@src/screen/Mine"
import { fetchHeart } from "@src/api/app/user"
const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  let timer: any = null
  const { mutateAsync } = fetchHeart()
  useEffect(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      mutateAsync()
    }, 1000 * 60 * 5)
    return () => clearInterval(timer)
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    </>
  )
}
