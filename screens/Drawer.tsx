import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from './AboutScreen';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = () => {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();

    return (
        <Drawer.Navigator initialRouteName='HomeScreen'>
            <Drawer.Screen name="Gallery">
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

export default Drawer;
