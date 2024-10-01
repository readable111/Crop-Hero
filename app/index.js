/****
 * @author Tyler Bowen
 * @reviewer Daniel Moreno
 ***/
import React, {useState}
import Home from './home.jsx'
import { View, Text } from 'react-native'
import { useAuth0, Auth0Provider} from 'react-native-auth0'
import { Button } from 'react-native-elements';




export default function Page() {
  const [user, error] = useAuth0()
  if(user && Log)
  return (
    <Home/>
  );
}
