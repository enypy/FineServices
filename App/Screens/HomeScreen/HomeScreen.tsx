import { View } from 'react-native'
import React from 'react'
import Header from './Components/Header'
import Slider from './Components/Slider'
import Categories from './Components/Categories'
import BusinessList from './Components/BusinessList'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen() {
    return (
        <ScrollView horizontal={false}>
            <Header />
            <View style={{ padding: 20 }}>
                <Slider />
            </View>
            <View style={{ padding: 20 }}>
                <Categories />
            </View>
            <View style={{ padding: 20 }}>
                <BusinessList />
            </View>
        </ScrollView>
    )
}
