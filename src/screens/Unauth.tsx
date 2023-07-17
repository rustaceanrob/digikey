import { View, SafeAreaView } from 'react-native'
import React from 'react'

const Unauth = () => {
  return (
    <View className="w-full bg-white dark:bg-black h-screen justify-start items-center">
        <SafeAreaView className='flex flex-col w-full bg-white dark:bg-black h-screen justify-start items-center'>
        </SafeAreaView>
    </View>
  )
}

export default Unauth