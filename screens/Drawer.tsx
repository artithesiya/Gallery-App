import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from './AboutScreen';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, createContext, useContext } from 'react';
import CheckBox from 'react-native-check-box'

const SortingContext  = createContext({
    filterText: 'Descending', setFilterText: (text: string) => { }
});
const Drawer = () => {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();
    const [filterText, setFilterText] = useState("Descending")
    function CustomDrawerContent(props: DrawerContentComponentProps) {
        return (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'flex-start'}}>
              <DrawerItemList {...props} />
            </View>
            <DrawerItem
              label={()=><Text style={{alignSelf:'center', color:'black',fontSize:20}}>V1.0</Text>}
              onPress={() => console.warn('Version: V1.0')}
            />
          </DrawerContentScrollView>
        );
      }
    return (
        <SortingContext.Provider value={{ filterText, setFilterText}}>

        <Drawer.Navigator initialRouteName='HomeScreen'
                drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" options={{
                headerRight: () => <Filter />
            }}>
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    </Stack.Navigator>
                )}
            </Drawer.Screen>
            {/* <DrawerItem label={()=><Text style={{color:'black'}}>AboutScreen</Text>} onPress={()=>console.warn("version: V1.0")}/> */}
        </Drawer.Navigator>
        </SortingContext.Provider>
    );
};

const Filter = () => {
    const [modalvisible, setmodalvisible] = useState(false)
    const [fliterCheckboxEnabled, setFilterChecboxEnabled] = useState(false)
    const {filterText, setFilterText}= useContext(SortingContext)
    const [sort,setSort]=useState("Descending")

    function handleFliterClick(): void {
        setmodalvisible(true)
    }
    function handleFliterSaveClick(sortType:string): void {
        setmodalvisible(!modalvisible)
        setFilterText(sortType)
    }
    return (
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
                                            setSort("Ascending")
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
                                            setSort("Descending")
                                        }}
                                        isChecked={!fliterCheckboxEnabled}
                                    />
                                    <Text style={{ color: 'black', alignSelf: 'center' }}>Descending</Text>
                                </View>

                                <Pressable
                                    style={[style.button, style.buttonClose]}
                                    onPress={() => handleFliterSaveClick(sort)}>
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
export const useFilter = () => useContext(SortingContext)
