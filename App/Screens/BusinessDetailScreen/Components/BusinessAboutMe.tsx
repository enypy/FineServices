import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../../Components/Heading'
import Colors from '../../../Utils/Colors'

export default function BusinessAboutMe({ business }: { business: BusinessList["businessLists"][number] | undefined }): React.JSX.Element {
    const [nbOfLines, setNbOfLines] = useState<number>(5)

    return (
        <View>
            <Heading heading={'About Me'}></Heading>
            <Text numberOfLines={nbOfLines} style={styles.aboutText}>
                {business?.about}
            </Text>
            {(nbOfLines !== 0) && <TouchableOpacity onPress={() => setNbOfLines(0)}>
                <Text style={styles.readMoreBtn}>Read More</Text>
            </TouchableOpacity>}
        </View>
    )
}


const styles = StyleSheet.create({
    aboutText: {
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 16,
        lineHeight: 28
    },
    readMoreBtn: {
        fontFamily: 'outfit',
        color: Colors.PRIMARY,
        fontSize: 16,
        marginTop: 7,
        marginRight: 10,
        textAlign: 'right'
    }
})