import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Utils/Colors'
import BusinessPictures from './Components/BusinessPictures'
import BusinessAboutMe from './Components/BusinessAboutMe'
import BookingModal from './Components/BookingModal'

export default function BusinessDetailScreen(): React.JSX.Element {
    const param: any = useRoute().params
    const [business, setBusiness] = useState<undefined | BusinessList['businessLists'][number]>(undefined)
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    useEffect(() => {
        setBusiness(param.business)
    }, [param])

    const onMessageBtnClick = () => {
        Linking.openURL(`mailto:${business?.email}?subject=I am looking for your Service&body=Hello there,`)
    }

    return (
        <View>
            <ScrollView style={{ height: '91%' }}>
                <TouchableOpacity
                    style={styles.backBtnContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
                </TouchableOpacity>


                <Image source={{ uri: business?.images[0]?.url }}
                    style={{ width: '100%', height: 300 }}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.businessName}>{business?.name}</Text>
                    <View style={styles.subInfoContainer}>
                        <Text style={styles.contactPerson}>{business?.contactPerson} 🌟 </Text>
                        <Text style={styles.categoryName}>{business?.category?.name}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                        <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 17, flex: 1 }}>
                            {business?.adress}
                        </Text>
                    </View>
                    <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY }}></View>
                    <BusinessAboutMe business={business} />
                    <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY }}></View>
                    <BusinessPictures business={business} />
                </View>
            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', margin: 8, gap: 8 }}>
                <TouchableOpacity 
                style={styles.messageBtn}
                onPress={() => {onMessageBtnClick()}}
                >
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 18 }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: Colors.WHITE, fontSize: 18 }}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <BookingModal isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                businessId={business?.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backBtnContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 20
    },
    infoContainer: {
        display: 'flex',
        gap: 7,
        padding: 20
    },
    subInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    businessName: {
        fontFamily: 'outfit-bold',
        fontSize: 25
    },
    contactPerson: {
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
        fontSize: 20,

    },
    categoryName: {
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 5,
        borderRadius: 5,
        fontSize: 14
    },
    messageBtn: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    },
    bookBtn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    }
})