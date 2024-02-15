import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import { getUserBookings } from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import Heading from '../../Components/ScreenHeading'
import BookingItem from './Components/BookingItem'
import Colors from '../../Utils/Colors'

export default function BookingScreen() {
    const { user } = useUser()
    const [userBookings, setUserBookings] = useState<any>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && fetchUserBookings()
    }, [user])

    const fetchUserBookings = () => {
        setLoading(true)
        getUserBookings(user?.primaryEmailAddress?.emailAddress)
            .then(res => {
                if (res && typeof res === 'object' && 'bookings' in res) {
                    setUserBookings(res.bookings)
                    setLoading(false)
                } else {
                    setLoading(false)
                    throw new Error('BusinessListsByCategory : unexpected response')
                } 
                
            })
            .catch(err => {
                console.error("Error fetching BusinessListsByCategory:", err)
                setLoading(false)
            })
    }

    return (
        <View style={{ padding: 20 }}>
            <Heading heading='MyBookings' color={Colors.BLACK} />
            <View>
                <FlatList data={userBookings}
                onRefresh={() => { fetchUserBookings() }}
                refreshing={loading}
                    renderItem={({ item }) => (
                        <BookingItem booking={item} />
                    )} />
            </View>
        </View>
    )
}