import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '../../../Utils/Colors'
import Heading from '../../../Components/Heading'

export default function BusinessPictures({ business }: { business: BusinessList["businessLists"][number] | undefined }): React.JSX.Element {

    return (
        <View>
            <Heading heading={'Image Gallery'} />
                <FlatList
                    data={business?.images}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Image style={styles.image} source={{ uri: item.url }} />
                    )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        borderRadius: 15,
        margin: 7,
        borderWidth: 0.2,
        borderColor: Colors.BLACK
    }
})