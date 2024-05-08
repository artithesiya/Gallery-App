import { AppState, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PERMISSIONS, RESULTS, check, request, requestNotifications } from 'react-native-permissions';

const Permission = ({ navigation }: { navigation: any }) => {
  const [permissionStatus, setPermissionStatus] = useState('Set Permission')
  useEffect(() => {
    checkPermission();
    AppState.addEventListener('change', handleAppStateChange);
    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  })
  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      checkPermission();
    }
  };
  const checkPermission = async () => {
    const permission = Platform.Version == 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setPermissionStatus('Next')
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        setPermissionStatus('null')
      });
    console.log(permissionStatus)
    // if (permissionStatus === RESULTS.GRANTED) {
    //   navigation.replace("Home")
    // }
  }

  const askPermission = () => {
    let permission
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY
    } else {
      Platform.Version == 33 ? permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES :
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    }
    request(permission).then((result) => {
      console.log(result)
      if (result === RESULTS.GRANTED) {
        navigation.navigate("Drawer")
      } else if (result === RESULTS.BLOCKED) {
        // Permission is blocked, navigate to app settings
        navigateToSettings();
      }
    });
  }
  const navigateToSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  }
  return (
    <View style={styles.mainView}>
      <Image source={require('../image/permission.jpg')} style={{ width: 400, height: 250 }} />
      <View style={styles.bottomCard}>
        <Text style={styles.text}>Give Read and Write Storage Permission</Text>
        <TouchableOpacity style={{ backgroundColor: 'skyblue', padding: 20, margin: 15, borderRadius: 10 }}
          onPress={() => askPermission()}>
          <Text style={styles.btnText}>{permissionStatus}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Permission

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  bottomCard: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -50,
    elevation: 10
  },
  text: {
    color: 'black',
    fontSize: 25,
    margin: 15,
    alignSelf: 'center'
  },
  btnText: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'center'
  },
  img: {
    width: 200,
    height: 250
  }
})