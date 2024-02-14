import { View, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSliders } from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'

export default function Slider() {

    const [slider, setSlider] = useState<undefined | Sliders["sliders"]>(undefined)

    useEffect(() => {
        getSliders()
            .then((res: Sliders | unknown) => {
                if (res && typeof res === 'object' && 'sliders' in res) {
                    setSlider((res as Sliders).sliders)
                } else {
                    throw new Error('SLIDERS : unexpected response')
                }
            })
            .catch(error => {
                console.error("Error fetching sliders:", error)
            })

    }, [])

    return (
        <View>
            <Heading heading={'Offers For You'} />
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View>
                        <Image
                            style={styles.sliderImage}
                            source={{ uri: item?.image?.url }}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: 330,
        height: 150,
        borderRadius: 20,
        objectFit: 'cover',
        marginRight: 20
    },
})