import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons'


export default function BusinessListItem({ business }: { business: BusinessList["businessLists"][number] }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Image source={{ uri: business.images[0].url }} style={styles.image} />
            <View style={styles.subContainer}>
                <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 15 }}>{business.contactPerson}</Text>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 19 }}>{business.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 3, flex: 1 }}>
                    <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                    <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16, flex: 1 }}>
                        {business.adress}
                    </Text>
                </View>
            </View>
        </View>
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