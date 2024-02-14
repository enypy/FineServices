import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default function Categories() {

    const [categories, setCategories] = useState<undefined | Categories["categories"]>(undefined)
    const navigation = useNavigation<StackNavigationProp<any>>()

    useEffect(() => {
        getCategories()
            .then((res: Categories | unknown) => {
                if (res && typeof res === 'object' && 'categories' in res) {
                    setCategories((res as Categories).categories)
                } else {
                    throw new Error('CATEGORIES : unexpected response')
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error)
            })

    }, [])

    return (
        <View>
            <Heading heading={'Categories'} isViewAll={true} />
            <FlatList
                data={categories}
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => index <= 3 ? (
                    <TouchableOpacity onPress={() => navigation.push('businessListByCategory', {
                        category: item.name
                    })} style={styles.container}>
                        <View style={styles.iconContainer}>
                            <Image
                                style={styles.icon}
                                source={{ uri: item?.icon?.url }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'outfit-medium', marginTop: 5 }}>{item?.name}</Text>
                    </TouchableOpacity>
                ) : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,

    },
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 17,
        borderRadius: 99
    },
    container: {
        flex: 1,
        alignItems: 'center'
    }
})