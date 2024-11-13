/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester Isaac Boodt
 ***/

import React, { useEffect, useState } from 'react';
import { Pressable, Switch, StyleSheet, StatusBar, Text, View, Appearance, ScrollView, Image, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input, colors } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../../assets/AppButton.jsx';
import Icons from '../../assets/icons/Icons.js';
import Colors from '../../assets/Color.js';
import { useFonts } from 'expo-font'



const ViewCrops = () => {
        {/* Array of objects, used to differentiate picked items */}
        const [selectedItem, setItem] = useState(null);
        const [cropData, setCropData] = useState([])
        const [isDark, setIsDarkMode] = useState(false)
        const subID = "sub123"
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
                                colorScheme = Appearance.getColorScheme()
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

        const { newCrop } = useLocalSearchParams();

        useEffect(() => {
                //Alert.alert("Test");
                if(newCrop)
                        {
                               // Alert.alert("Test2");
                                const crop = JSON.parse(newCrop);
                                //Alert.alert("Crop Recieved: " + crop.name);
                                console.log(JSON.stringify(cropData))
                                setCropData((prevCrops)=>[...prevCrops, cropData]);
                        }
        }, [newCrop]);

        useEffect(() => {
                const fetchData = async () => {
                  const url = `https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/getCropsVerbose/${subID}`;
                  try {
                    const response = await fetch(url, { method: 'GET' });
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
              
                    const data = await response.json();
                    setCropData(data);
                  } catch (error) {
                    console.error("Error fetching crop data:", error);
                  }
                };
              
                fetchData();
              }, []);
                     
        {/* Was testing something, leaving for now
        const handleChange = (itemValue, itemIndex) =>
        {
                setItem(itemValue);
        }
        */}

        //Testing functions now

        //Delete toggle
        const [isDelete, setIsDelete] = useState(false);

        const deleteItem = (hrfNum) => {
                setCropData((prevItems) => prevItems.filter(item => item.hrfNum !== hrfNum))
        }
        {/* Deals with rendering the items (In this case, selectables) in the flatlist */}

        const renderItem = ({ item }) => 
        (
                <TouchableOpacity onPress={() => handlePress(item)}>
                        <View style={[ styles.button, isDark && styles.buttonDark ]}>
                                <Text style={styles.buttonText}>{item[10]}</Text>
                        </View>
                </TouchableOpacity>
        );

        const handlePress = (item) => 
        {
                if(isDelete)
                {
                        Alert.alert(`Delete Item`, `Are you sure you want to delete "${item.name}"?`,
                                [
                                        { text: "Delete", onPress: () => deleteItem(item.hrfNum) },
                                        { text: "Cancel", style: "cancel"}
                                ]
                        )
                        
                }
                else{

                        console.log('Item pressed:');
                        router.push({pathname: './cropspage', params: item, relativeToDirectory:true})
                }
        }

        {/*load in all fonts used for this page*/}
	const [fontsLoaded, fontError] = useFonts({
		'Domine-Medium': require('../../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../../assets/fonts/Domine-Regular.ttf'),
	});

	{/*return an error if the fonts fail to load*/}
	if (!fontsLoaded && !fontError) {
		return null;
	}

        return (
                <View style={styles.wrapper}>
                        <View style={[ styles.title, isDark && styles.titleDark ]}>
                                <View style={styles.titleContainer}>
                                        <Text style = {[styles.titleText, isDark && styles.darkTitleText]}>View Crops</Text>
                                        <View style={styles.semicircle}></View>
                                </View>
                        </View>
                        <View style={[styles.container, isDark && styles.containerDark]}>
                                <View style={[styles.topContainer, styles.spaceBetween]}>
                                        <View style={styles.back}>
                                                <AppButton title="" icon={isDark ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.push('./crops', {relativeToDirectory:true})}/>
                                        </View>
                                        <View style={[styles.toggleContainer, isDark && styles.toggleContainerDark]}>
                                                <Text style={styles.toggleLabel}>Toggle Delete</Text>
                                                <Switch
                                                        value={isDelete}
                                                        onValueChange={setIsDelete}
                                                />
                                        </View>
                                </View>
                                <FlatList
                                        data={Object.values(cropData)}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                />
                        </View>
                </View>
        )
}

export default ViewCrops;

const styles = StyleSheet.create({
        container: {
          height: "100%",
          flex: 1,
          backgroundColor: Colors.SANTA_GRAY,
        },
        containerDark:{
                backgroundColor: Colors.BALTIC_SEA
        },
        semicircle:{
                position: 'absolute',
                top: -19,
                left: 0,
                width: 140,
                height: 70,
                backgroundColor: Colors.MALACHITE,
                borderBottomLeftRadius: 140,
                borderBottomRightRadius: 140,
                overflow: 'hidden',
        },
        titleContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative', 
        },
        title:{
                backgroundColor: Colors.ALMOND_TAN,
                borderColor: '#20232a',
                borderWidth: 1,
                padding: 18,
                textAlign: 'right',
                fontSize: 42,
        },
        titleDark:{
                backgroundColor: Colors.CHARCOAL
        },
        titleText:{
                textAlign: 'right',
                fontSize: 38,
                fontFamily: 'Domine-Medium',
                alignContent: 'center',
                flex: 1,
        },
        darkTitleText:{
                color: Colors.WHITE_SMOKE
        },
        save:{
                marginTop: 10,
                marginLeft: 370,
                width: 40,
                height: 40,
                borderRadius: 40/2,
                backgroundColor: Colors.MALACHITE,
                justifyContent: "center",
                alignItems: "center",
        },
        back:{
                marginLeft: 10,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
        },
        button:{
                backgroundColor: Colors.SCOTCH_MIST_TAN,
                textAlign: 'center',
                padding: 20,
                marginBottom: 20,
                fontSize: 38,
                marginHorizontal: 20,
                borderColor: '#20232a',
                borderWidth: 2,
                borderRadius: 8,
        },
        buttonDark:{
                backgroundColor: Colors.LICHEN,
        },
        buttonText:{
                fontSize: 24,
                fontFamily: 'Domine-Regular',
                textAlign: 'center',

        },
        spacer:{
                marginTop: 20,
        },
        wrapper:{
                flex:1
        },
        toggleContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor: Colors.SCOTCH_MIST_TAN, // Light background color around the toggle
                borderRadius: 20,
                borderColor: '#20232a',
                borderWidth: 2,
                margin: 10,
                marginRight: "5%"
        },
        toggleContainerDark:
        {
                backgroundColor: Colors.LICHEN
        },
        toggleLabel: {
                
                fontSize: 18,
                marginRight: 0,
        },
        topContainer: {
                flexDirection: "row",
                alignItems: "center"
        },
        spaceBetween:
        {
                justifyContent: "space-between"
        }
});