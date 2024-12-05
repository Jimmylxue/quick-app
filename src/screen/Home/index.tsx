import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { getProductList } from "@src/api/app"
import { useEffect, useState } from "react"
import { BackHandler, Pressable, Text, View } from "react-native"
import Toast from "react-native-toast-message"
import { WebView } from "react-native-webview"

export const LINK_TYPE = {
  TaoBao: 1,
  Amazon: 2,
}

function randomNum(num = 10) {
  return Math.floor(Math.random() * num)
}

function getCoin(coin: number) {
  Toast.show({
    type: "success",
    text1: `获得${coin}金币`,
    visibilityTime: 1000,
  })
}

export function Home() {
  const tabBarHeight = useBottomTabBarHeight()
  const [linkType, setLinkType] = useState(2)
  const [uri, setUrl] = useState<any>({})
  const { data, refetch } = getProductList({ pageSize: 10, linkType })
  const [visitTime, setVisitTime] = useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isStop, setIsStop] = useState<boolean>(false)
  const [isNoShow, setIsNoShow] = useState<boolean>(false)

  useEffect(() => {
    // async function initData() {
    //   setIsLoading(true) // 开始加载
    //   await refetch()
    //   console.log(data.length)

    //   if (data.length === 0) {
    //     setIsNoShow(true)
    //   } else {
    //     setIsNoShow(false)
    //   }
    //   const randomData = data?.[randomNum(data?.length)]
    //   setUrl(randomData)
    //   setVisitTime(randomData?.visitTime || 10) // 初始化倒计时
    // }
    // initData()
    console.log("linktype", linkType)
  }, [linkType, data])

  useEffect(() => {
    if (isStop) {
      return
    }
    if (isLoading || visitTime <= 0) {
      if (visitTime <= 0) {
        getCoin(uri.coin || 10)
        async function refreshData() {
          setIsLoading(true)
          await refetch()
          const randomData = data?.[randomNum(data?.length)]
          setUrl(randomData)
          setVisitTime(randomData?.visitTime || 10)
          setTimeout(() => setIsLoading(false), 3000)
        }
        refreshData()
      }
    } else {
      const timer = setTimeout(() => setVisitTime(visitTime - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [visitTime, isLoading, data])

  useEffect(() => {
    const onBackPress = () => {
      if (isStop) {
        async function refreshData() {
          setIsLoading(true)
          await refetch()
          const randomData = data?.[randomNum(data?.length)]
          setUrl(randomData)
          setVisitTime(randomData?.visitTime || 10)
          setIsStop(false) // 重置状态
        }
        refreshData()
        return true // 拦截返回键事件
      }
      return false // 如果 isStop 为 false，则执行默认返回行为
    }

    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }
  }, [isStop, refetch, data])

  useEffect(() => {
    console.log("isNoShow", isNoShow)
  }, [isNoShow])

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        paddingTop: tabBarHeight,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: tabBarHeight / 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          zIndex: 999,
        }}
      >
        <Pressable onPress={() => setLinkType(2)}>
          <Text style={linkType === 2 ? { color: "red" } : {}}>亚马逊</Text>
        </Pressable>
        <Pressable onPress={() => setLinkType(1)}>
          <Text style={linkType === 1 ? { color: "red" } : {}}>淘宝</Text>
        </Pressable>
      </View>
      {!isLoading && (
        <Text
          style={{
            position: "absolute",
            left: -15,
            top: "50%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,.3)",
            padding: 20,
            fontSize: 20,
            color: "white",
            borderRadius: 30,
          }}
        >
          {visitTime}
        </Text>
      )}
      {!isNoShow && (
        <WebView
          style={{ zIndex: -1 }}
          source={{
            uri: uri?.fullLink,
          }}
          onShouldStartLoadWithRequest={(event) => {
            if (event.url.includes("login")) {
              setIsLoading(true)
              setIsStop(true)
            }
            return true
          }}
          onLoad={() => {
            setIsLoading(false)
          }}
        />
      )}
      {isNoShow && <Text>暂未开通</Text>}
    </View>
  )
}
