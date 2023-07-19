import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Appearance, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Foundation } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import useFetch from '../hooks/useFetch'
import BlinkingDot from '../components/BlinkingDot'
import { useNavigation } from '@react-navigation/native'
import { AppStackParams } from '../stacks/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { ANIMATION_BASE } from '../constants'
import Secret from '../components/Secret'
import useLang from '../hooks/useLang'


const Home = () => {
    const [search, setSearch] = useState("")
    const { loading, error, notes } = useFetch(search)
    const navigation = useNavigation<StackNavigationProp<AppStackParams>>()
    const language = useLang()

    const handleAdd = () => {
      if (!notes) {
        navigation.navigate("Acknowledge")
      } else {
        if (notes.length > 100) { 
          alert(language.maxSecs)
          return
        }
        navigation.navigate("Add")
      }
    }

    const renderNotes = () => {
      if (loading) {
        return (
         <BlinkingDot/>
        )
      }
      if (!loading && !notes) {
        return (
          <TouchableOpacity className='items-center pt-40' onPress={handleAdd}>
            <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)}>
              <Text className='text-blue-500'>{language.addASec}</Text> 
            </Animated.View>
          </TouchableOpacity>
        )
      }
      if (error) {
        return (
          <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)}>
            <Text className='dark:text-white'>{language.error}</Text>
          </Animated.View>
        )
      }
      if (notes) {
        return (
          <ScrollView className='w-full'>
            {
              notes.map((note, index) => {
                return ( <Secret key={index} duration={index} itemKey={note.name} date={note.date} itemId={note.id}/> )
              })
            }
          </ScrollView>
        )
      }
    }


    return (
          <View className="w-full bg-white dark:bg-black h-screen justify-start items-center">
            <SafeAreaView className='flex flex-col w-full bg-white dark:bg-black h-screen justify-start items-center'>
              <View className='flex flex-row pl-2 pr-5 pt-5 pb-5 w-full'>
                <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)}>
                  <View className='flex flex-row justify-center items-center border border-blue-500 px-4 py-2 w-full rounded-lg'>
                    <AntDesign name="search1" color={"#3b82f6"} size={15}/>
                    <View className='w-full pl-2'>
                      <TextInput className='dark:text-white' autoCorrect={false} keyboardType={"web-search"} onChangeText={(text) => setSearch(text)}/>
                    </View>
                  </View>
                </Animated.View>
              </View>
              <View className='w-full'>
                <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)} className="justify-start">
                  <View className='flex flex-row border-b border-neutral-300 dark:border-neutral-700 w-full items-center justify-between pl-3 pr-3'>
                    <View className='flex flex-row justify-center items-center'>
                      <Foundation name='folder-lock' color={Appearance.getColorScheme() === "dark" ? "white" : "black"} size={20}/>
                      <Text className='font-extrabold text-lg pl-1 dark:text-white'>{language.yourSecrets}</Text>
                    </View>
                    <TouchableOpacity className='bg-blue px-2 py-2' onPress={handleAdd}>
                      <AntDesign name='plus' color={Appearance.getColorScheme() === "dark" ? "white" : "black"} size={20}/>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
              {renderNotes()}
            </SafeAreaView>
          </View>
    )
}

export default Home