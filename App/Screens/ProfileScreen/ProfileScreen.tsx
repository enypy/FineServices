import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Heading from '../../Components/ScreenHeading'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'

export default function ProfileScreen() {
  const { user } = useUser()
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      name: 'My Bookings',
      icon: 'bookmark',
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'mail',
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
    },
  ]
  return (
    <View>
      <View style={{ padding: 20, backgroundColor: Colors.PRIMARY }}>
        <Heading heading='Profile' color={Colors.WHITE} />
        <View style={styles.imgContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
          <Text style={styles.username}>{user?.fullName}</Text>
          <Text style={{ ...styles.username, fontSize: 18 }}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
      </View>
      <View style={{display:'flex', alignItems: 'center', paddingTop: 50}}>
        <FlatList
          data={profileMenu}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40 }}>
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 99
  },
  username: {
    fontSize: 26,
    fontFamily: 'outfit-medium',
    color: Colors.WHITE,
    marginTop: 8
  }
})