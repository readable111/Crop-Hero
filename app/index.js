/****
 * @author Tyler Bowen
 * @reviewer Daniel Moreno
 ***/
import React, {useState} from 'react'
import Home from './home.jsx'
import { View, Text } from 'react-native'
import { useAuth0, Auth0Provider } from 'react-native-auth0'
import { Button } from 'react-native-elements';
import  Login  from './login.jsx'
import { router } from 'expo-router'




export default function Page() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

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

    const handleLogin = async () =>{
      await loginWithRedirect()
    }

    
    const loggedIn = user !== undefuined && user !==null;
    useEffect(() => {
      if(isAuthenticated){
        router.push('/home') 
      }
    }, [isAuthenticated]);

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
