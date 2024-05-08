import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Splash'
import Permission from './Permission'
import Drawer from './Drawer'
import PhotoPager from './PhotoPager'
import VideoPager from './VideoPager'

const Appnavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name='Permission' component={Permission} />
                <Stack.Screen name='Drawer' component={Drawer} options={{ headerShown: false }} />
                <Stack.Screen name='PhotoPager' component={PhotoPager} />
                <Stack.Screen name='VideoPager' component={VideoPager} />

                {/* <Stack.Screen
                    name='PhotoPager'
                    component={PhotoPager} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Appnavigator
