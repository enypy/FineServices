import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default function BusinessListItemSmall({ business }: { business: BusinessList['businessLists'][number] }): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<any>>()
    return (
        <TouchableOpacity style={styles.container} 
        onPress={() => navigation.push('businessDetail', { business: business })}
        >
            <Image source={{ uri: business?.images[0]?.url }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.businessName} numberOfLines={1}>{business?.name}</Text>
                <Text style={styles.contactPerson} numberOfLines={1}>{business?.contactPerson}</Text>
                <Text style={styles.categoryName}>{business?.category?.name}</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        maxWidth: 180
    },
    infoContainer: {
        padding:7,
        display:'flex',
        gap:3
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10,
    },
    businessName: {
        fontSize: 17,
        fontFamily: 'outfit-medium'
    },
    contactPerson: {
        fontSize: 13,
        fontFamily: 'outfit',
        color: Colors.GRAY,
    },
    categoryName: {
        fontSize: 10,
        fontFamily: 'outfit',
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 7
    }
})