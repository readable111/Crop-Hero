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

    const [ isAuthenticated, setIsAuthenticated ]
    const handleLogin = async () => {
        try {
            const credentials = await authorize();
        } catch (e) {
            console.log(e);
        }
    };
  
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
