import { Keyboard, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title);
            setDesc(note.desc);

        }
    }, [isEdit])


    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    // console.log(title, desc);

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();
        if (isEdit) {
            // for edit
            onSubmit(title, desc, Date.now())
        } else {
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }


    return (
        <>

            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput
                        value={title}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                        placeholder="Title"
                        style={[styles.input, styles.title]} />
                    <TextInput
                        value={desc}
                        multiline
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                        placeholder='Note'
                        style={[styles.input, styles.desc]} />


                    <View style={styles.submit}>
                        <RoundIconBtn size={15} style={{ marginRight: 15 }} antIconName='check' onPress={handleSubmit} />
                        {title.trim() || desc.trim() ? <RoundIconBtn size={15} antIconName='close'
                            onPress={closeModal} /> : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default NoteInputModal

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        fontSize: 16,
        color: colors.dark
    },

    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    desc: {
        height: 100,

    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    submit: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    }

})