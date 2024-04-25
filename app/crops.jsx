import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'
import NavBar from '../assets/NavBar.jsx'
import Colors from '../assets/Color';
import { useFonts } from 'expo-font';
const crops = () => {
  const router = useRouter();
  return (
    <View style={{
      flex: 1,
    }}>
      
      <View style={styles.backdrop}></View>
      <Text style={styles.title}>My Crops</Text>
      {/*<View style={styles.circle}></View>*/} 
      
      <View style={styles.background}>
        <View style={styles.button}>
          <Pressable onPress={() => router.push("/addcrops")}>
            <Text style={styles.buttonText}>Add Crop</Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <Pressable onPress = {() => router.push("/EditCrop")}>
            <Text style={styles.buttonText}>Edit Crop</Text>
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
    backgroundColor: '#f1ddbf',
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
    fontSize: 42,
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
    backgroundColor: Colors.PERIWINKLE_GRAY,
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
    backgroundColor: '#FFFADA',
    textAlign: 'center',
    padding: 30,
    fontSize: 38,
    marginTop: 60,
    marginHorizontal: 20,
    borderColor: '#20232a',
    borderWidth: 2,
    borderRadius: 8,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 38,
  },
  whitebox: {
    backgroundColor: 'white',
    marginTop: -40
  },
  pressable: {
    marginTop: 70
  }
});

