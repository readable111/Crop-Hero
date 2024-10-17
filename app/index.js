/****
 * @author Tyler Bowen
 * @reviewer Daniel Moreno
 ***/
import React, {useState, useEffect} from 'react'
import Home from './home.jsx'
import { View, ActivityIndicator} from 'react-native'
import * as AuthSession from 'expo-auth-session'
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Page() {

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
*/
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        router.replace('/home'); // Redirect to home page if logged in
      } else {
        router.replace('/login'); // Redirect to login page if not logged in
      }
    } catch (error) {
      console.log('Error checking login status:', error);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack />;
}