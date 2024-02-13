import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser"
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image style={styles.loginImage} source={require('./../../../assets/images/login.png')} />
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: 'center' }}>
          Let's Find
          <Text style={{ fontWeight: 'bold' }}> Professional Cleaning and Repair </Text>
          Service
        </Text>
        <Text style={{ fontSize: 17, color: Colors.WHITE, textAlign: 'center', marginTop: 20 }}>Best App to find services near you which deliver professional services</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ textAlign: 'center', color: Colors.PRIMARY, fontSize: 17 }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    height: 450,
    width: 230,
    borderRadius: 15,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    alignSelf: 'center'
  },
  subContainer: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 40
  }
})