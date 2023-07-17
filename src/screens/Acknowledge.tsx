import { View, Text, SafeAreaView, Appearance, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { acknowledgement } from '../interfaces/languages/en'
import { useNavigation } from '@react-navigation/native'
import { AppStackParams } from '../stacks/Main'
import { StackNavigationProp } from '@react-navigation/stack'

const Acknowledge = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParams>>()
    return (
        <View className="w-full bg-white dark:bg-black h-screen justify-between items-center">
            <SafeAreaView className='flex flex-col w-full bg-white dark:bg-black h-screen justify-between items-center'>
                <View className='w-full'>
                    <View className='pt-5 flex flex-row justify-start items-center w-full border-b border-neutral-300 dark:border-neutral-700 pb-5 pl-5 pr-5'>
                        <Feather name="alert-circle" size={16} color={"#3b82f6"}/>
                        <Text className='font-extrabold text-xl pl-1 text-blue-500'>{"Important"}</Text>
                    </View>
                    <ScrollView className='pt-5 pl-5 pr-5'>
                        <Text className='dark:text-white font-semibold text-lg'>{acknowledgement}</Text>
                    </ScrollView>
                </View>
                <View className='w-full pl-5 pr-5 pb-5'>
                    <TouchableOpacity className='w-full justify-end items-center bg-blue-500 px-4 py-4 pl-5 pr-5 rounded-lg' onPress={() => navigation.navigate("Add")}>
                        <Text className='font-extrabold text-xl pl-1 text-white'>{"Acknowledge"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Acknowledge