import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Home from './Drawer';
import Permission from './Permission';

const Splash = ({navigation}:{navigation:any}) => {
    // const navigation = useNavigation();

    useEffect(() => {
        checkPermissionAndNavigate();
    }, [])

    const checkPermissionAndNavigate = async () => {
        let permission;
        if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
        } else {
            permission = Platform.Version == 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        }

        const result = await check(permission);
        if (result === 'granted') {
            navigation.navigate("Drawer");
        } else {
            setTimeout(() => {
                navigation.navigate("Permission");
            }, 2000);
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.centeredItem}>
                <StatusBar backgroundColor={'white'} barStyle={"dark-content"} />
                <Text style={styles.Text}>splash</Text>
            </View>
            <View style={styles.IndicatorView}>
                <ActivityIndicator style={styles.indicator} color='black' size={'large'} />
            </View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    mainView: {
        flex: 1, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center',
        alignItems: 'center'
    },
    centeredItem: {
        flex: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'
    },
    IndicatorView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    Text: {
        fontSize: 35,
        color: 'black',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    indicator: {
        bottom: 20,
        justifyContent: 'flex-end'
    }
})
