import 'react-native-gesture-handler';
import RootNavigator from './src/Navigation/Root';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { Amplify} from 'aws-amplify'
import awsconfig from "./src/aws-exports"
import { withAuthenticator } from 'aws-amplify-react-native'
import {useEffect} from "react"
import {Platform} from "react-native"
import * as NavigationBar from 'expo-navigation-bar';
import {hide} from "./src/helperFunc/navigationbarFunctions"
import * as Sentry from 'sentry-expo';



Amplify.configure(awsconfig)

function App() {
  
  useEffect(() => {
    hide()
    if(Platform.OS == "android") {
      setInterval(async() => {
      const visibilityCheck = await NavigationBar.getVisibilityAsync();
      if(visibilityCheck == "visible")
      {
        hide()
      } else {
        return;
      }
      }, 7000
      )}
      
      }, [])
 
  
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default withAuthenticator(App)