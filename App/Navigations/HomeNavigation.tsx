import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../Screens/HomeScreen/HomeScreen"
import BusinessListByCategoryScreen from "../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen"
import BusinessDetailScreen from "../Screens/BusinessDetailScreen/BusinessDetailScreen"


const Stack = createStackNavigator()

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="businessListByCategory" component={BusinessListByCategoryScreen} />
      <Stack.Screen name="businessDetail" component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}