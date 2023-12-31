import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as LocalAuthentication from 'expo-local-authentication'
import Unauth from '../screens/Unauth'
import MainStack from '../stacks/Main'
import { StatusBar } from 'expo-status-bar'

const Root = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        (async () => {
          try {
            const { success } = await LocalAuthentication.authenticateAsync({promptMessage: "Authentication required"})
            setAuth(success)
          } catch {}
        })()
      }, [])

    return (
        <NavigationContainer>
            {auth ? <MainStack/> : <Unauth/>}
            <StatusBar style='auto'/>
        </NavigationContainer>
    )
}

export default Root