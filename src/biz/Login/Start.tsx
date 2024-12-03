import { NButton } from "@src/components/Button/NButton"
import { HelloWave } from "@src/components/HelloWave"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Image, Text, View } from "react-native"
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

export const StartIndex = observer(({ changePage }: TProps) => {
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
    <Animated.View style={[animatedStyle]} className="h-full">
      <>
        <View className=" justify-center flex-row mt-[180]">
          <Image
            className=" size-[200]"
            source={require("@src/assets/images/talk.png")}
          />
        </View>

        <View className="  mb-5 mt-10">
          <View className="flex-row justify-center items-center">
            <Text className="  text-3xl font-semibold ">淘宝推广系统</Text>
          </View>
        </View>

        <View className="absolute bottom-40 w-full flex-row justify-center">
          <NButton
            type="primary"
            className=" rounded-lg w-[270]"
            onPress={() => {
              changePage("login")
            }}
          >
            登录
          </NButton>
        </View>
      </>
    </Animated.View>
  )
})
