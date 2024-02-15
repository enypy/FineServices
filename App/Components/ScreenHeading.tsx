import { Text } from 'react-native'
import React from 'react'

export default function Heading({ heading, color }: { heading: string, color: string }) {
    return (
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 26, marginTop: 20, color: color}}>{heading}</Text>
    )
}