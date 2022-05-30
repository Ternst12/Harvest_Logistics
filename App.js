import 'react-native-gesture-handler';
import RootNavigator from './src/Navigation/Root';
import { useEffect } from 'react';
import { store } from './src/redux/store';
import { useDispatch } from 'react-redux';
import { setDriverEmail } from './src/redux/Slices';
import { Provider } from 'react-redux';
import { Amplify, Auth, API, graphqlOperation, input } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(awsconfig)

function App() {

  
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default withAuthenticator(App)