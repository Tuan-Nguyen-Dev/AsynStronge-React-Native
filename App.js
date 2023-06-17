import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import NoteScreen from './app/screens/NoteScreen';
import Intro from './app/screens/Intro';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';



export default function App() {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);


  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result))
    setIsAppFirstTimeOpen(false)
    // console.log('check result', result);
  }
  useEffect(() => {
    findUser()
    // AsyncStorage.clear()
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />
  return (
    // <Intro />
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{
          headerTitle: '',
          headerTransparent: true
        }}>
          <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
