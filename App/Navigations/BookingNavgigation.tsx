import { createStackNavigator } from "@react-navigation/stack"
import BookingScreen from "../Screens/BookingScreen/BookingScreen"
import BusinessDetailScreen from "../Screens/BusinessDetailScreen/BusinessDetailScreen"


const Stack = createStackNavigator()

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="bookingScreen" component={BookingScreen} />
      <Stack.Screen name="businessDetail" component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}