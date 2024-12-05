import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { getProductList } from "@src/api/app"
import { useEffect, useState } from "react"
import { BackHandler, Image, Pressable, Text, View } from "react-native"
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

export function NewHome() {
  const tabBarHeight = useBottomTabBarHeight()
  const [linkType, setLinkType] = useState(2)
  const { data, refetch } = getProductList({ pageSize: 3, linkType })
  const [uri, setUrl] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isStop, setIsStop] = useState<boolean>(false)
  const [isNoShow, setIsNoShow] = useState<boolean>(false)
  const [visitTime, setVisitTime] = useState(10)

  const handleInjectJavaScript = `
    (function() {
      // 等待页面加载完成
      setTimeout(() => {
        const imgElement = document.querySelector('img[src="https://gw.alicdn.com/tfs/TB1QZN.CYj1gK0jSZFuXXcrHpXa-200-200.png"]');
        if (imgElement) {
          imgElement.click(); // 自动模拟点击
        }
      }, 0)
    })();
  `

  useEffect(() => {
    setIsLoading(true)
    refetch()
  }, [linkType])

  useEffect(() => {
    if (data?.length > 0) {
      setIsStop(false)
      setIsNoShow(false)
      const randomData = data[randomNum(data?.length)] // 随机选择一个商品
      setUrl(randomData)
      setVisitTime(randomData.visitTime)
    } else {
      setIsStop(true)
      setIsNoShow(true)
    }
  }, [data])

  useEffect(() => {
    const onBackPress = () => {
      if (isStop) {
        async function refreshData() {
          setIsLoading(true)
          await refetch()
          const randomData = data?.[randomNum(data?.length)]
          setUrl(randomData)
          setVisitTime(randomData.visitTime)
          setIsStop(false)
        }
        refreshData()
        return true
      }
      return false
    }

    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }
  }, [isStop])

  useEffect(() => {
    if (visitTime > 0) {
      const timer = setTimeout(() => setVisitTime((vit) => vit - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      getCoin(uri.coin)
      refetch()
    }
  }, [uri, visitTime])

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
      {/* {!isLoading && !isOtherPage && ( */}
      {!isStop && !isLoading && (
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
            borderRadius: 50,
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
              setIsStop(true)
            }
            return true
          }}
          onLoad={() => {
            setIsLoading(true)
          }}
          onLoadEnd={() => {
            setIsLoading(false)
          }}
        />
      )}
      {isNoShow && (
        <View className=" justify-center flex-row mt-[180]">
          <Image source={require("@src/assets/images/not.png")} />
        </View>
      )}
    </View>
  )
}