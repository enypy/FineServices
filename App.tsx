import 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import Login from './App/Screens/LoginScreen/Login'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import Colors from './App/Utils/Colors'
import * as SecureStore from 'expo-secure-store'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './App/Navigations/TabNavigation'
import { useFonts } from 'expo-font'


const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
      'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
      'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
      'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    })

    if (!fontsLoaded && !fontError) {
      return null
    }

  return (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </View>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
})
