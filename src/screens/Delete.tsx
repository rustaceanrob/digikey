import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParams } from '../stacks/Main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStorage from 'expo-secure-store'
import Note from '../interfaces/Note'
import { PATH_TO_REF, SECRET_PREFIX } from '../constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<AppStackParams, "Delete">

const Delete = (props: Props) => {
    const navigation = useNavigation<StackNavigationProp<AppStackParams>>()
    
    const deleteItem = async () => {   
        try {
            const notes = await AsyncStorage.getItem(PATH_TO_REF)
            if (!notes) {
                return
            }
            const jsonedNotes = JSON.parse(notes)
            let newNotes: Note[] = []
            jsonedNotes.forEach((note: Note) => {
                if (note.id !== props.route.params.id) { newNotes.push(note) }
            })
            await AsyncStorage.setItem(PATH_TO_REF, JSON.stringify(newNotes))
            await SecureStorage.deleteItemAsync(SECRET_PREFIX+props.route.params.id)
        } catch {
            alert("Could not delete that note")
        } finally {
            navigation.replace('Feed')
        }
    }

    return (
        <View className="w-full bg-white dark:bg-black h-screen">
            <SafeAreaView className='flex flex-col w-full bg-white dark:bg-black h-screen justify-between items-start'>
                <View className='flex flex-col w-full justify-start items-center'>
                    <View className='pt-5 flex flex-row justify-start items-center w-full border-b border-neutral-300 dark:border-neutral-700 pb-5 pl-5 pr-5'>
                        <Feather name="alert-circle" size={16} color={"#3b82f6"}/>
                        <Text className='font-extrabold text-xl pl-1 text-blue-500'>{"Important"}</Text>
                    </View>
                    <View className='pt-5 pl-5 pr-5 justify-center items-center space-y-5 w-full'>
                        <Text className='dark:text-white font-semibold text-lg'>{"Are you sure you want to delete this secret? You cannot undo this action."}</Text>
                        <View className='w-full px-5 py-5 rounded-md bg-neutral-100 dark:bg-neutral-900 flex-row justify-center items-center w-full'>
                            <Text className='dark:text-white'>{props.route.params.name}</Text>
                        </View>
                    </View>
                </View>
                <View className='w-full pl-5 pr-5 pb-5 space-y-5'>
                    <TouchableOpacity className='w-full justify-end items-center bg-blue-500 px-4 py-4 pl-5 pr-5 rounded-lg' onPress={() => navigation.goBack()}>
                        <Text className='font-extrabold text-xl pl-1 text-white'>{"Back"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full justify-end items-center bg-red-500 px-4 py-4 pl-5 pr-5 rounded-lg' onPress={deleteItem}>
                        <Text className='font-extrabold text-xl pl-1 text-white'>{"Delete"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Delete