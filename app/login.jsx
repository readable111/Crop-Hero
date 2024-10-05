import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Colors from '../assets/Color'
import {useAuth0} from 'react-native-auth0'

const Login = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            const credentials = await authorize();
        } catch (e) {
            console.log(e);
        }
    };
      return (
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Button title="Login" onPress={onPress} />
          </View>
        </View>
      );
    };
    
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

export default Login;