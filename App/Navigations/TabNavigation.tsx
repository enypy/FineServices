import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen'
import { StyleSheet, Text } from 'react-native'
import Colors from '../Utils/Colors'
import { FontAwesome } from '@expo/vector-icons'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY
        }}>
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ ...styles.navBarText, color: color }}>Home</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="booking" component={BookingScreen} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ ...styles.navBarText, color: color }}>Booking</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bookmark" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="profile" component={ProfileScreen} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ ...styles.navBarText, color: color }}>Profile</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="user-circle" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    navBarText: {
        fontSize: 12,
        marginTop: -7,
        color: Colors.BLACK
    }
})
console.log(styles)