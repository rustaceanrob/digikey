import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Add from '../screens/Add'
import Delete from '../screens/Delete'
import Acknowledge from '../screens/Acknowledge'


export type AppStackParams = {
    Feed: undefined,
    Add: undefined,
    Acknowledge: undefined,
    Delete: {
        name: string
        id: string
    }
}

const Stack = createNativeStackNavigator<AppStackParams>()

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Add" component={Add} options={{ headerShown: false }}/>
            <Stack.Screen name="Acknowledge" component={Acknowledge} options={{ headerShown: false }}/>
            <Stack.Screen name="Delete" component={Delete} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default MainStack