import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


export default function PageHeading({ title }: { title: string }) {

    const navigation = useNavigation()

    return (
        <View
            style={{ paddingTop: 30, padding: 20, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>
                {title}
            </Text>
        </View>
    )
}