import 'react-native-gesture-handler';

import RootNavigator from './src/Navigation/Root';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from "socket.io-client"
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { setSocket } from './src/redux/Slices';

export default function App() {

  
 





  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
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
