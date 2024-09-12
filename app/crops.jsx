/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'
import NavBar from '../assets/NavBar.jsx'
import Colors from '../assets/Color';
import { useFonts } from 'expo-font';
const crops = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
    'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
    'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
});
  return (
    <View style={{
      flex: 1,
    }}>
      <Text style={styles.title}>My Crops</Text>
      {/*<View style={styles.circle}></View>*/} 
      
      <View style={styles.background}>
        <View style={styles.button}>
          <Pressable onPress={() => router.push("/addcrops")}>
            <Text style={styles.buttonText}>Add Crop</Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <Pressable onPress = {() => router.push("/viewcrops")}>
            <Text style={styles.buttonText}>View Crop</Text>
          </Pressable>
        </View>
      <NavBar cropsSelected/>
      </View>
    </View>

  );
}

export default crops;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: Colors.SANTA_GRAY,
  },
  circleBlock:{
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: -20,

  },
  title:{
    flex: .3,
    backgroundColor: Colors.ALMOND_TAN,
    borderColor: '#20232a',
    borderWidth: 1,
    padding: 10,
    textAlign: 'right',
    alignContent: 'center',
    fontSize: 42,
    fontFamily: 'Domine-Medium'
  },
  backdrop:{
    flex: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    position: 'absolute',
  },
  background:{
    flex: 3,
    marginBottom: 'auto',
    backgroundColor: Colors.SANTA_GRAY,
  },
  circle:{
    position: 'absolute',
    marginTop: -50,
    marginLeft: 20,
    width: 100,
    height: 110,
    borderRadius: 100 / 2,
    backgroundColor: "lime",
    overflow: 'hidden',
  },
  button:{
    backgroundColor: Colors.SCOTCH_MIST_TAN,
    textAlign: 'center',
    padding: 30,
    fontSize: 38,
    marginTop: 60,
    marginHorizontal: 20,
    borderColor: '#20232a',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Domine-Regular'
  },
  whitebox: {
    backgroundColor: 'white',
    marginTop: -40
  },
  pressable: {
    marginTop: 70
  }
});

