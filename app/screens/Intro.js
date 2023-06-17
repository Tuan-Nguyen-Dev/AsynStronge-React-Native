import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import colors from '../misc/colors'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Intro = ({ onFinish }) => {


    const [name, setName] = useState("");

    const handleOnChangeText = text => setName(text);
    // console.log('check text', text);

    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
    }


    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
            <TextInput value={name} onChangeText={handleOnChangeText} placeholder='Enter Name' style={styles.textInput} />
            {name.trim().length >= 3 ? <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} /> : null}
        </View>
    )
}

const width = Dimensions.get('window').width - 50

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.primary,
        color: colors.primary,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 16,
        marginBottom: 15
    },

    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    }
})