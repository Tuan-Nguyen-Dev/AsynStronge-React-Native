import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { AntDesign } from "@expo/vector-icons"

import { TextInput } from 'react-native'
import colors from '../misc/colors'

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Search here ...' />
            {value ? <AntDesign name='close' size={15} color={colors.primary} onPress={onClear} style={styles.clearIcon} /> : null}
            {/* <Text>SearchBar</Text> */}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.primary,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 16
    },
    container: {
        justifyContent: 'center'
    },
    clearIcon: {
        position: 'absolute',
        right: 15
    }
})