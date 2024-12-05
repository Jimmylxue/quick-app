import { fetchCoin } from "@src/api/app/user"
import { fetchRequestWithdraw } from "@src/api/app/withdraw"
import Button from "@src/components/Button/Button"
import { useUser } from "@src/hooks/useAuth"
import classNames from "classnames"
import { useRef, useState } from "react"
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"
import Toast from "react-native-toast-message"

const getAvatar = (id: number) => {
  const url = id % 10
  switch (url) {
    case 1:
      return require("../../assets/uploadUrl/1.png")
    case 2:
      return require("../../assets/uploadUrl/2.png")
    case 3:
      return require("../../assets/uploadUrl/3.png")
    case 4:
      return require("../../assets/uploadUrl/4.png")
    case 5:
      return require("../../assets/uploadUrl/5.png")
    case 6:
      return require("../../assets/uploadUrl/6.png")
    case 7:
      return require("../../assets/uploadUrl/7.png")
    case 8:
      return require("../../assets/uploadUrl/8.png")
    case 9:
      return require("../../assets/uploadUrl/9.png")
    default:
      return require("../../assets/uploadUrl/0.png") // 默认头像
  }
}

export function Mine() {
  const { logOut, user } = useUser()
  const { data, refetch } = fetchCoin()
  const fadeAnimA = useRef(new Animated.Value(1)).current
  const fadeAnimB = useRef(new Animated.Value(0)).current
  const topB = useRef(new Animated.Value(100)).current
  const [isWithdraw, setIsWithdraw] = useState(true)
  const [coin, setCoin] = useState("")
  const { mutateAsync } = fetchRequestWithdraw()
  const [isShowButton, setIsShowButton] = useState(true)

  // 切换到 B
  const showB = () => {
    Animated.parallel([
      Animated.timing(fadeAnimA, {
        toValue: 0, // A 渐隐
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimB, {
        toValue: 1, // B 渐显
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(topB, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // 切换回 A
  const showA = () => {
    Animated.parallel([
      Animated.timing(fadeAnimA, {
        toValue: 1, // A 渐显
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimB, {
        toValue: 0, // B 渐隐
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(topB, {
        toValue: 999,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const options = [
    {
      title: "提现记录",
      onPress: () => {
        setIsShowButton(false)
        setIsWithdraw(false)
        showB()
      },
    },
    {
      title: "敬请期待",
      onPress: () => {
        Toast.show({
          type: "success",
          text1: "敬请期待",
          visibilityTime: 500,
        })
      },
    },
  ]
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#3db4f6",
          padding: 20,
          paddingTop: 40,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 50 }}
          source={user?.id ? getAvatar(user.id) : null}
        />
        <View
          style={{
            marginLeft: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            用户ID：{user?.id}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 15,
              color: "#fff",
            }}
          >
            用户级别：{user?.level === 1 ? "新人" : "专职"}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          margin: 20,
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          source={require("@assets/images/coin.png")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 22 }}>{data as any}</Text>
        <View
          style={{
            backgroundColor: "#fff",
            marginLeft:
              130 -
              ((data as any) >= 1000
                ? 30
                : (data as any) >= 100
                ? 35
                : (data as any) >= 10
                ? 20
                : 0),
            borderLeftWidth: 2,
            borderLeftColor: "#eee",
            paddingLeft: 20,
          }}
        >
          <Pressable
            onPress={() => {
              setIsShowButton(false)
              setIsWithdraw(true)
              showB()
            }}
          >
            <Image
              source={require("@assets/images/withdraw.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>提现</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          position: "relative",
          flex: 1,
          margin: 20,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnimA,
            backgroundColor: "#fff",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {options.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomColor: "#eee",
                borderBottomWidth: 2,
                padding: 20,
              }}
            >
              <Pressable onPress={item.onPress}>
                <Text>{item.title}</Text>
              </Pressable>
            </View>
          ))}
        </Animated.View>

        {/* B 部分 */}
        <Animated.View
          style={{
            display: "flex",
            opacity: fadeAnimB,
            position: "absolute",
            transform: [{ translateY: topB }],
            width: "100%",
            height: "100%",
            borderRadius: 20,
            backgroundColor: "#fff",
            zIndex: 2,
          }}
        >
          {isWithdraw && (
            <View className=" flex-row border-b border-solid border-blue-300 items-center">
              <TextInput
                placeholderTextColor="#d1d5db"
                className={classNames("  py-4  text-lg -mt-2 flex-grow pl-4")}
                style={{ color: "#1e90ff" }}
                placeholder="请输入提现金额"
                value={coin}
                keyboardType="numeric" // 显示数字键盘
                onChangeText={(text) => {
                  // 限制输入为纯数字
                  const numericValue = text.replace(/[^0-9]/g, "")
                  setCoin(numericValue) // 更新值
                }}
              />
              <Pressable
                style={({ pressed }) => [
                  {
                    marginRight: 20,
                    backgroundColor: pressed ? "#1e90ff" : "#3db4f6", // 按下时变暗
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 6,
                  },
                ]}
                onPress={() => {
                  if (Number(coin) > (data as any)) {
                    Toast.show({
                      type: "error",
                      text1: "当前数量大于拥有金币",
                      visibilityTime: 1000,
                    })
                    return
                  } else if (Number(coin) < 10) {
                    Toast.show({
                      type: "error",
                      text1: "金币太少，请先浏览",
                      visibilityTime: 500,
                    })
                    return
                  }
                  const res = mutateAsync({
                    withdrawalCoin: Number(coin) >= 300 ? 300 : Number(coin),
                  })
                  console.log(res, "resres")

                  refetch()
                }}
              >
                <Text style={{ color: "white" }}>提现</Text>
              </Pressable>
            </View>
          )}
          <Pressable
            style={{
              position: "absolute",
              top: -40,
              left: "50%",
              zIndex: 2,
              padding: 10,
              transform: [{ translateX: -25 }],
            }}
            onPress={() => {
              setIsShowButton(true)
              setCoin("")
              showA()
            }}
          >
            <Text
              style={{
                height: 36,
                width: 36,
                backgroundColor: "rgba(0,0,0,.4)",
                borderRadius: 18,
                textAlign: "center",
                lineHeight: 36,
                color: "white",
              }}
            >
              X
            </Text>
          </Pressable>
          <ScrollView
            style={{
              position: "relative",
              flex: 1,
              padding: 10,
            }}
          >
            {[
              1,
              2,
              3,
              4,
              4,
              123,
              1,
              23,
              12,
              123,
              123,
              123,
              123,
              1,
              2,
              3,
              4,
              4,
              123,
              1,
              23,
              12,
              123,
              123,
              123,
              123,
              ,
              1,
              2,
              3,
              4,
              4,
              123,
              1,
              23,
              12,
              123,
              123,
              123,
              123,
            ].map((item, index) => (
              <View key={index}>
                <Text>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
      {isShowButton && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 10,
            // zIndex: 99,
          }}
        >
          <Button
            theme="primary"
            className=" mt-20 rounded-3xl"
            onPress={() => {
              logOut()
            }}
          >
            退出登录
          </Button>
        </View>
      )}
    </View>
  )
}
