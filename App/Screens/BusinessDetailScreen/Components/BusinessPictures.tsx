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
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <Image style={styles.image} source={{ uri: item.url }} />
                    )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
        objectFit: 'fill',
        flex: 1,
        borderRadius: 15,
        margin: 7
    }
})