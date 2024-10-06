/****
 * @author Tyler Bowen
 * @reviewer Daniel Moreno
 ***/
import React, {useState} from 'react'
import Home from './home.jsx'
import { View, Text } from 'react-native'
import { useAuth0, Auth0Provider} from 'react-native-auth0'
import { Button } from 'react-native-elements';
import  Login  from './login.jsx'
import { router } from 'expo-router'




export default function Page() {
  //const [user, error] = useAuth0()
  /*user = false
  if(user){
  return (
    <Auth0Provider>
      <Home/>
    </Auth0Provider>
  )}else{
    return(
      <Auth0Provider>
        <Login/>
      </Auth0Provider>      
    )
  }*/

    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const handleLogin = async () => {
        try {
            const user = await authorize();
            setIsAuthenticated(true)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
      if(isAuthenticated){
       router.push({
          pathname: "/home",
          params:{id: user.email() }
       }) 
      }
    })

    return(
      <Auth0Provider domain="">
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Button title="Login" onPress={handleLogin} />
          </View>
        </View>
      </Auth0Provider>

      );


  
}

    const styles = StyleSheet.create({

      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252A33',
      },
      messageContainer: {
        backgroundColor: '#F1DDBF',
        width: 200,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10, // Optional: for rounded corners
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000', // Black text to contrast with the lighter background
      },
    });
