import { NButton } from "@src/components/Button/NButton"
import { NIcon } from "@src/components/Icon/NIcon"
import { Input } from "@src/components/Input"
import { useUser } from "@src/hooks/useAuth"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

type TProps = {
  changePage: React.Dispatch<
    React.SetStateAction<"start" | "login" | "register">
  >
}

export const Login = observer(({ changePage }: TProps) => {
  const [phone, setPhone] = useState<string>("173116001")
  const [password, setPassword] = useState<string>("123456")

  const { login } = useUser()

  const opacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 })
  }, [opacity])

  return (
    <Animated.View style={[animatedStyle]}>
      <View className=" mt-[70] px-4">
        <NIcon
          iconType="EvilIcons"
          name="chevron-left"
          // color="#FFF"
          size={50}
          onPress={() => {
            changePage("start")
          }}
        />

        <View className=" px-4">
          <View className=" mt-10 ">
            <Text className="  text-3xl">登录</Text>
            <Text className=" text-gray-500 text-ls mt-2">
              请输入您的账号密码
            </Text>
          </View>
          <View className=" mt-10">
            <Input
              style={{ color: "black" }}
              title="ID"
              placeholder="请输入ID"
              value={phone}
              onChangeText={(val) => {
                setPhone(val)
              }}
            />
          </View>
          <View className=" mt-10">
            <Input
              style={{ color: "black" }}
              title="密码"
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              placeholder="请输入密码"
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
          </View>

          <View className=" justify-center flex-row">
            <NButton
              type="primary"
              className=" mt-20 rounded-3xl w-[270]"
              onPress={async () => {
                await login({ id: phone, password, noEncrypt: true })
              }}
            >
              登录
            </NButton>
          </View>
        </View>
      </View>
    </Animated.View>
  )
})
