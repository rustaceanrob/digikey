import { View, Text, TouchableOpacity, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import * as SecureStore from 'expo-secure-store'
import * as Clipboard from 'expo-clipboard';
import { ANIMATION_BASE, SECRET_PREFIX } from '../constants'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParams } from '../stacks/Main';
import useLang from '../hooks/useLang';

type Props = {
  itemKey: string
  itemId: string
  date: string
  duration: number
  pinned: boolean
}


const Secret = (props: Props) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [secret, setSecret] = useState<string>("")
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>()
  const language = useLang()

  useEffect(() => {
    (async () => {
      let sec = await SecureStore.getItemAsync(SECRET_PREFIX+props.itemId)
      if (sec) {
        setSecret(sec)
      }
    })()
  }, [])

  const handleCopy = async () => {
    await Clipboard.setStringAsync(secret)
    alert(language.copiedTo)
  }

  const showOrHide = () => {
    if (toggle) {
      return (
        <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)} className={"w-full pr-5"}>
          <View className='w-full px-3 py-3 rounded-md bg-neutral-100 dark:bg-neutral-900 flex-row items-center'>
            <Text className='dark:text-white font-bold pr-2'>{secret}</Text>
            <TouchableOpacity onPress={handleCopy}>
              <Feather name="copy" size={16} color={Appearance.getColorScheme() === "dark" ? "white" : "black"}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
    } else {
      return (
        <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)} className={"w-full pr-5"}>
          <View className='w-full px-5 py-5 rounded-md bg-neutral-100 dark:bg-neutral-900'></View>
        </Animated.View>
      )
    }
  }
 
  return (
    <Animated.View className={"w-full" } entering={FadeIn.duration(ANIMATION_BASE + 100 * props.duration)} exiting={FadeOut.duration(ANIMATION_BASE)}>
      <View className='w-full px-5 py-5 jusitfy-start flex flex-col items-center border-b border-neutral-300 dark:border-neutral-700'>
        <View className='flex flex-row justify-between items-center w-full'>
          <View className='flex flex-row justify-center items-center space-x-2'>
            <Text className='dark:text-white font-semibold'>{props.itemKey}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Delete", { id: props.itemId, name: props.itemKey })}>
              <AntDesign name='delete' color={Appearance.getColorScheme() === "dark" ? "white" : "black"} size={15}/>
            </TouchableOpacity>
          </View>
          <View className='flex flex-row justify-center items-center'> 
            <Text className=' font-semibold text-neutral-300 dark:text-neutral-700'>{props.date.toLocaleUpperCase()}</Text>
          </View>
        </View>
        <View className='flex flex-row justify-start items-center w-full space-x-2 pt-5'>
          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            <AntDesign name='eye' color={Appearance.getColorScheme() === "dark" ? "white" : "black"} size={20}/>
          </TouchableOpacity>
          {showOrHide()}
        </View>
      </View>
    </Animated.View>
  )
}

export default Secret