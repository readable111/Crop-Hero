import Home from './home.jsx'
import { View, Text } from 'react-native'
import { useAuth0, Auth0Provider} from 'react-native-auth0'
import { Button } from 'react-native-elements';




export default function Page() {


  return (
    //<View style={styles.container}>
      //<View style={styles.main}>
        //<Text style={styles.title}>Hello World</Text>
        //<Text style={styles.subtitle}>This is the first page of your app.</Text>
      //</View>
    //</View>
    <Auth0Provider domain ={"localhost:3000"} clientId={"n9emrUe1MQcYoFlIlguf3SFOz16hADMR"}>
      <Home/>
    </Auth0Provider>
  );
}
