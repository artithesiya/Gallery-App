import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from './AboutScreen';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState,createContext } from 'react';
import CheckBox from 'react-native-check-box'

export const GlobalInfo = createContext("Ascending");
const Drawer = () => {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();

    return (
        <Drawer.Navigator initialRouteName='HomeScreen'>
            <Drawer.Screen name="Gallery" options={{
                headerRight: () => <Filter />
            }}>
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    </Stack.Navigator>
                )}
            </Drawer.Screen>
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
        </Drawer.Navigator>
    );
};

const Filter = () => {
    const [modalvisible, setmodalvisible] = useState(false)
    const [fliterCheckboxEnabled, setFilterChecboxEnabled] = useState(true)
    const [filterText, setFilterText] = useState("Ascending")

    function handleFliterClick(): void {
        setmodalvisible(true)
    }
    function handleFliterSaveClick(): void {
        setmodalvisible(!modalvisible)
        console.log(filterText)
    }
    return (
        <GlobalInfo.Provider value={filterText}>
        <View>
            {modalvisible ?
                <View >
                    <Modal style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}
                        animationType="slide"
                        transparent={true}
                        visible={modalvisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setmodalvisible(false)
                        }}>
                        <View style={style.modalView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <CheckBox
                                    style={{ padding: 10 }}
                                    checkedCheckBoxColor='#2196F3'
                                    onClick={() => {
                                        setFilterChecboxEnabled(true)
                                        setFilterText("Ascending")
                                    }}
                                    isChecked={fliterCheckboxEnabled}
                                />
                                <Text style={{ color: 'black', alignSelf: 'center' }}>Ascending</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <CheckBox
                                    style={{ padding: 10 }}
                                    checkedCheckBoxColor='#2196F3'
                                    onClick={() => {
                                        setFilterChecboxEnabled(false)
                                        setFilterText("Descending")
                                    }}
                                    isChecked={!fliterCheckboxEnabled}
                                />
                                <Text style={{ color: 'black', alignSelf: 'center' }}>Descending</Text>
                            </View>

                            <Pressable
                                style={[style.button, style.buttonClose]}
                                onPress={() => handleFliterSaveClick()}>
                                <Text style={{ color: 'black' }}>Save</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
                : null}
            <TouchableOpacity onPress={() => handleFliterClick()}>
                <Icon name="filter" size={25}
                    color='black'
                    style={{
                        marginRight: 15, alignSelf: 'flex-end',
                        justifyContent: 'center', alignContent: 'center'
                    }} />
            </TouchableOpacity>
        </View>
        </GlobalInfo.Provider>

    )
}
const style = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        padding: 20,
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center", alignItems: "center"
    },
})
export default Drawer;
