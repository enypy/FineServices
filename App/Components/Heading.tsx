import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({ heading, isViewAll = false }: { heading: string, isViewAll?: boolean }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            {isViewAll && <Text>View All</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})