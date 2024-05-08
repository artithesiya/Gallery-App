import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PhotoScreen from './PhotoScreen';
import VideoScreen from './VideoScreen';
const HomeScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="PhotoScreen" component={PhotoScreen} />
            <Tab.Screen name="VideoScreen" component={VideoScreen} />
        </Tab.Navigator>
        // <View>
        //     <Text> test </Text>
        // </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})