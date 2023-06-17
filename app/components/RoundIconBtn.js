import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../misc/colors'

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
    return (
        <AntDesign name={antIconName} size={size || 24} color={color || colors.light}
            style={[styles.icon, { ...style }]}
            onPress={onPress}
        />
    )
}

export default RoundIconBtn

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 60,
        elevation: 5,
    }
})