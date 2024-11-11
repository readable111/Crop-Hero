/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { StatusBar } from 'expo-status-bar';
import { React, useEffect, useState} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'
import NavBar from '../../assets/NavBar.jsx'
import Colors from '../../assets/Color.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
const crops = () => {


  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    'WorkSans-Semibold': require('../../assets/fonts/WorkSans-SemiBold.ttf'),
    'Domine-Medium': require('../../assets/fonts/Domine-Medium.ttf'),
    'Domine-Regular': require('../../assets/fonts/Domine-Regular.ttf'),
});
const [isDark, setIsDarkMode] = useState(false)
        useEffect(() => {
                const fetchDarkModeSetting = async () => {
                        const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
                        let result = null
                        if(JSON_VALUE && JSON_VALUE !== "")
                        {
                                result = JSON.parse(JSON_VALUE)
                                //console.log("Async: " + result)
                        }
                        else
                        {
                                useColorScheme.Appearence.getColorScheme()
                                if(colorScheme == 'dark')
                                {
                                        result = true;
                                }
                                else
                                {
                                        result = false;
                                }
                                console.log("colorScheme: " + result)
                        }
                        setIsDarkMode(result)
                }
                fetchDarkModeSetting()
                .catch(console.error);
        }, [])
  return (
    <View style={[ styles.container, isDark && styles.containerDark]}>
      <View style={[styles.titleCard, isDark && styles.titleCarddark]}>
        <Text style={[styles.title, isDark && {color: Colors.WHITE_SMOKE}]}>My Crops</Text>
      </View>
      {/*<View style={styles.circle}></View>*/} 
        <View style={ [ styles.button, isDark && styles.buttonDark ] }>
          <Pressable testID = "addCrops" onPress={() => router.push("./addcrops", {relativeTopDirectory: true})}>
            <Text style={styles.buttonText}>Add Crop</Text>
          </Pressable>
        </View>
        <View style={[ styles.button, isDark && styles.buttonDark ]}>
          <Pressable onPress = {() => router.push("./viewcrops", {relativeToDirectory: true})}>
            <Text style={styles.buttonText}>View Crop</Text>
          </Pressable>
        </View>
      <NavBar cropsSelected darkMode={isDark}/>
    </View>

  );
}

export default crops;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY,
  },
  containerDark:{
    backgroundColor: Colors.BALTIC_SEA
},
  circleBlock:{
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: -20,

  },
  titleCard:{
    backgroundColor: Colors.ALMOND_TAN,
    borderColor: Colors.CHARCOAL,
    borderWidth: 1,
    padding: 18,
  },
  titleCarddark:{
    backgroundColor: Colors.CHARCOAL
  },
  title:{
    textAlign: 'right',
    fontSize: 42,
    fontFamily: 'Domine-Medium',
    alignContent: 'center'
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
  buttonDark:{
    backgroundColor: Colors.LICHEN,
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

