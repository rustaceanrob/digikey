import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppStackParams } from '../stacks/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { AntDesign, Feather } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { ANIMATION_BASE, PATH_TO_REF, SECRET_PREFIX } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../interfaces/Note'
import * as SecureStore from 'expo-secure-store'
import { randomUUID } from 'expo-crypto'
import useLang from '../hooks/useLang'

const Add = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParams>>()
    const [name, setName] = useState<string>("")
    const [secret, setSecret] = useState<string>("")
    const [byteString, setByteString] = useState<string>("")
    const [disabled, setDisabled] = useState<boolean>(false)
    const language = useLang()

    useEffect(() => {
        (async () => {
            let randomBytes = randomUUID()
            setByteString(randomBytes)
        })()
    }, [])

    const handleSubmit = async () => {
        if (name === "" || secret === "" || byteString === "") {
            alert(language.isBlankSec)
            return
        } 
        setDisabled(true)
        const note: Note  = { name: name, date: (new Date()).toDateString(),  id: byteString}
        try {
            const notes = await AsyncStorage.getItem(PATH_TO_REF)
            if (!notes) {
                await AsyncStorage.setItem(PATH_TO_REF, JSON.stringify([note]))
            } else {
                let jsonedNotes = JSON.parse(notes)
                await AsyncStorage.setItem(PATH_TO_REF, JSON.stringify([...jsonedNotes, note]))
            }
            await SecureStore.setItemAsync(SECRET_PREFIX + byteString, secret, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY })
        } catch {
            alert(language.error)
        } finally {
            navigation.replace("Feed")
        }
    }

    const renderSuggestions = () => {
        if (name === "" && secret === "") {
            return (
                <Animated.View entering={FadeIn.duration(ANIMATION_BASE)} exiting={FadeOut.duration(ANIMATION_BASE)}>
                    <View className='flex flex-row items-center pt-2'>
                        <Feather name="alert-circle" size={12} color={Appearance.getColorScheme() === "dark" ? "white": "black"}/>
                        <Text className='dark:text-white text-xs font-semibold pl-1'>{language.secTip}</Text>
                    </View>
                </Animated.View>
            )
        }
    }

    return (
        <View className="w-full bg-white dark:bg-black h-screen">
            <SafeAreaView className='flex flex-col w-full bg-white dark:bg-black h-screen justify-start items-start'>
                <View className='p-5 w-full flex-row justify-between items-center'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='flex flex-row justify-start items-center bg-blue-500 px-2 py-2 rounded-md'>
                        <AntDesign name="back" color={"white"} size={12}/>
                        <Text className='text-white font-semibold pl-1'>{language.back}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex flex-row justify-start items-center bg-blue-500 px-2 py-2 rounded-md' onPress={handleSubmit} disabled={disabled}>
                        <AntDesign name="save" color={"white"} size={12}/>
                        <Text className='text-white font-semibold pl-1'>{language.save}</Text>
                    </TouchableOpacity>
                </View>
                <View className='pl-5 pr-5 w-full'>
                    <View className='border border-neutral-300 dark:border-neutral-700 px-5 py-5 rounded-md space-y-2 pb-7'>
                        <Text className='font-extrabold text-lg dark:text-white'>{language.nameLabel}</Text>
                        <View className='py-2 px-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-black'>
                            <TextInput autoCorrect={false} onChangeText={(text) => setName(text)} className='dark:text-white'></TextInput>
                        </View>
                        <Text className='font-extrabold text-lg dark:text-white'>{language.secretLabel}</Text>
                        <View className='py-2 px-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-black'>
                            <TextInput keyboardType='web-search' autoCorrect={false} onSubmitEditing={handleSubmit} onChangeText={(text) => setSecret(text)} className='dark:text-white'></TextInput>
                        </View>
                    </View>
                    <View className='justify-center items-center w-full pt-2'>
                    {renderSuggestions()}   
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Add