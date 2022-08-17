import 'react-native-gesture-handler';
import RootNavigator from './src/Navigation/Root';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { Amplify, Auth} from 'aws-amplify'
import awsconfig from "./src/aws-exports"
import { withAuthenticator } from 'aws-amplify-react-native'
import {useEffect, useState} from "react"
import {Platform, AppState} from "react-native"
import * as NavigationBar from 'expo-navigation-bar';
import {hide} from "./src/helperFunc/navigationbarFunctions"




Amplify.configure(awsconfig)

function App() {

  /*
  useEffect(() => {
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }, [])
  */
  
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default withAuthenticator(App)