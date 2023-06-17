import { FlatList, Keyboard, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'


import colors from '../misc/colors'
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';


const reverseData = data => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if (aInt < bInt) return 1;
        if (aInt == bInt) return 0;
        if (aInt > bInt) return -1;
    });
};

const NoteScreen = ({ user, navigation }) => {

    const [greet, setGreet] = useState('');

    const [modalVisibile, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { notes, setNotes, findNotes } = useNotes();

    const [resultNotFound, setResultNotFound] = useState(false)


    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    }

    useEffect(() => {
        // AsyncStorage.clear();
        findGreet();
    }, [])

    const reverseNotes = reverseData(notes)


    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now() }
        const updateNotes = [...notes, note];
        setNotes(updateNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updateNotes));

    }

    const openNote = note => {
        navigation.navigate('NoteDetail', { note })
    }

    const handleSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery('')
            setResultNotFound(false);
            return await findNotes();
        }
        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note;
            }
        })

        if (filteredNotes.length) {
            setNotes([...filteredNotes])
        } else {
            setResultNotFound(true)
        }
    }

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes()
    }
    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.light} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}
                    </Text>
                    {notes.length ? (
                        <SearchBar value={searchQuery} onChangeText={handleSearchInput} containerStyle={{ marginVertical: 15 }} onClear={handleOnClear} />
                    ) : null}

                    {resultNotFound ? <NotFound /> : <FlatList
                        data={reverseNotes}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
                        renderItem={({ item }) => <Note onPress={() => openNote(item)} item={item} />}
                    />
                    }

                    {!notes.length ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>

                            <Text style={styles.emptyHeader}>Add Notes</Text>

                        </View>) : null}
                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn antIconName='plus' style={styles.addBtn} onPress={() => setModalVisible(true)}
            />
            <NoteInputModal
                visible={modalVisibile}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

export default NoteScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        zIndex: -1,
        // backgroundColor: 'red'

    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    emptyHeader: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.5
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        zIndex: 1,
        bottom: 50,
    }

})