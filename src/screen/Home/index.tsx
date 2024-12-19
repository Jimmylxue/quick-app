import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { getProductList } from "@src/api/app"
import { fetchCoin, getPlantForm } from "@src/api/app/user"
import { fetchGetCoin } from "@src/api/app/withdraw"
import { useUser } from "@src/hooks/useAuth"
import { useEffect, useRef, useState } from "react"
import {
  Animated,
  BackHandler,
  Image,
  Pressable,
  Text,
  View,
} from "react-native"
import Toast from "react-native-toast-message"
// 基于expo的项目使用expo install react-native-webview 安装该包
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
    visibilityTime: 2000,
    text1Style: {
      color: "red",
      fontSize: 20,
    },
  })
}

export function Home() {
  const [linkType, setLinkType] = useState(-1)
  const { data, refetch } = getProductList({ linkTypeId: linkType }, linkType)
  const [uri, setUrl] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isStop, setIsStop] = useState<boolean>(false)
  const [visitTime, setVisitTime] = useState(10)
  const { mutateAsync: reqCoin } = fetchGetCoin()
  const [isShowLoadingImg, setIsShowLoadingImg] = useState(false)
  const [isAutoClick, setIsAutoClick] = useState(false)
  const fadeAnimA = useRef(new Animated.Value(0)).current
  const { data: platformList } = getPlantForm() as any
  const { data: coin, refetch: getCoinFetch } = fetchCoin() as any
  const currentTime = useRef(+new Date())
  useEffect(() => {
    if ((+new Date() - currentTime.current) / 1000 / 60 > 1) {
      setIsAutoClick(false)
    }
  }, [coin])

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
    setIsShowLoadingImg(true)
    setIsLoading(true)
    refetch()
  }, [linkType, isAutoClick])

  useEffect(() => {
    if (data?.data?.length > 0) {
      setIsStop(false)
      const randomData = data?.data[randomNum(data?.data?.length)]
      setUrl(randomData)
      setVisitTime(randomData.visitTime)
    } else {
      setIsStop(true)
      setUrl(null)
      setIsShowLoadingImg(false)
    }
  }, [data])

  useEffect(() => {
    const onBackPress = () => {
      if (isStop) {
        async function refreshData() {
          setIsLoading(true)
          await refetch()
          const randomData = data?.data?.[randomNum(data?.data?.length)]
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
    if (isLoading || isShowLoadingImg) {
      return
    }
    if (visitTime > 0) {
      const timer = setTimeout(() => setVisitTime((vit) => vit - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      getCoin(uri.coin)
      reqCoin({ linkId: uri.linkId })
      getCoinFetch()
      if (isAutoClick) {
        refetch()
      }
    }
  }, [uri, visitTime, isLoading, isShowLoadingImg])

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#fff",
      }}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          transform: [{ translateY: fadeAnimA }],
          zIndex: 999,
          padding: 20,
        }}
      >
        {platformList?.map((item: any) => (
          <Pressable
            style={{
              backgroundColor: "rgba(0,0,0,.1)",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
            className="relative"
            onPress={() => {
              if (item?.openStatus === 2) {
                Toast.show({
                  type: "error",
                  text1: "该平台暂未开放",
                  visibilityTime: 500,
                })
                return
              }
              setLinkType(item?.linkTypeId)
              Animated.parallel([
                Animated.timing(fadeAnimA, {
                  toValue: 999, // A 渐显
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]).start()
            }}
          >
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: item?.mainImage }}
                width={50}
                height={50}
                borderRadius={25}
                className="ml-10"
              />
              <Text className="text-2xl ml-4">{item?.name}</Text>
            </View>
            <View
              className="absolute"
              style={{
                top: 50,
                right: 10,
                backgroundColor: item?.openStatus === 2 ? "red" : "green",
                width: 10,
                height: 10,
                borderRadius: 10,
                transform: [{ translateX: -25 }, { translateY: -20 }],
              }}
            ></View>
          </Pressable>
        ))}
      </Animated.View>
      <View
        className="justify-evenly"
        style={{
          position: "absolute",
          top: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          zIndex: 3,
          height: 40,
          paddingHorizontal: 20,
        }}
      >
        <View className="w-32 flex flex-row items-center">
          <Image
            source={require("@assets/images/coin.png")}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
          <Text>{coin as any}</Text>
        </View>
        <Pressable
          className="w-32 text-center flex flex-row items-center justify-center"
          style={{
            borderColor: "#3db2f5",
            borderWidth: 1,
            borderRadius: 50,
            padding: 5,
          }}
          onPress={() => {
            setLinkType(-1)
            Animated.parallel([
              Animated.timing(fadeAnimA, {
                toValue: 0, // A 渐显
                duration: 500,
                useNativeDriver: true,
              }),
            ]).start()
          }}
        >
          <Text style={{ color: "#3db2f5" }}>
            {platformList?.find((item: any) => item.linkTypeId === linkType)
              ?.name || ""}
          </Text>
        </Pressable>
        <Pressable
          className="w-32 text-center"
          onPress={() => setIsAutoClick(true)}
        >
          <Text className="text-center">开始</Text>
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
      {/* {!isStop && !isAutoClick && (
        <Pressable
          onPress={() => refetch()}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,.3)",
            padding: 20,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            下一条
          </Text>
        </Pressable>
      )} */}
      {!uri?.fullLink ? (
        <View className=" justify-center flex-row mt-[180]">
          <Image source={require("@src/assets/images/not.png")} />
        </View>
      ) : (
        <WebView
          style={{ zIndex: -1 }}
          source={{
            uri: uri?.fullLink,
          }}
          injectedJavaScript={handleInjectJavaScript}
          onShouldStartLoadWithRequest={(event: any) => {
            setIsShowLoadingImg(true)
            if (event.url.includes("login")) {
              setIsStop(true)
              setIsShowLoadingImg(false)
            }
            return true
          }}
          onLoad={() => {
            setIsLoading(true)
            setIsShowLoadingImg(true)
          }}
          onLoadEnd={() => {
            setIsLoading(false)
            setIsShowLoadingImg(false)
          }}
        />
      )}
      {isShowLoadingImg && (
        <Image
          source={require("@assets/images/loading.gif")}
          style={{ position: "absolute", top: 50, left: 50 }}
        />
      )}
    </View>
  )
}
