import "./src/helperFunc/ignoreWarnings";
import 'react-native-gesture-handler';
import RootNavigator from './src/Navigation/Root';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { Amplify, Auth} from 'aws-amplify'
import awsconfig from "./src/aws-exports"
import { withAuthenticator } from 'aws-amplify-react-native'





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