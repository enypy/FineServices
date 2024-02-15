import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Colors from '../../../Utils/Colors'


export default function BookingItem({ booking }): React.JSX.Element {
    const navigation = useNavigation<StackNavigationProp<any>>()
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.push('businessDetail', { business: booking.businessList })}
        >
            <Image source={{ uri: booking.businessList.images[0].url }} style={styles.image} />
            <View style={styles.subContainer}>
                <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 15 }}>{booking.businessList.contactPerson}</Text>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 19 }}>{booking.businessList.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 3, flex: 1 }}>
                    <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                    <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16, flex: 1 }}>
                        {booking.businessList.adress}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        margin: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        flex: 1,
    },
    subContainer: {
        display: 'flex',
        gap: 8,
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
})