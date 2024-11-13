/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester Isaac Boodt
 ***/

import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, StatusBar, Text, View, Appearance, ScrollView, Image, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input, colors } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';
import Colors from '../assets/Color';
import { useFonts } from 'expo-font'



const ViewCrops = () => {
        {/* Array of objects, used to differentiate picked items */}
        const [selectedItem, setItem] = useState(null);

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

        {/* Dummy Data, for picker use */}
        const [crops, setCrops] = useState([
                {label: 'Carrot', name: 'Carrot', active: 'Y', location: 'Greenhouse', variety: 'Standard', source: 'Home Depot', datePlanted: '05/06/2024', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '193242', visible:'visible', yield:'none'},
                {label: 'Cabbage', name: 'Cabbage', active: 'N', location: 'Outside', variety: 'Standard', source: 'Friend Recommendation', datePlanted: '01/24/2022', comments: 'None', indoors: 'Yes', type:'Standard' , medium: 'Hugel Mound', hrfNum: '945304', visible:'not visible', yield:'large'},
                {label: 'Potato', name: 'Potato', active: 'Y', location: 'Dump', variety: 'Standard', source: "Farmer's market", datePlanted: '11/13/2019', comments: 'None', indoors: 'Yes', type:'Standard', medium: 'Hugel Mound', hrfNum: '835242', visible:'visible', yield:'medium' },
                {label: 'Tomato', name: "Tomato", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999999', visible:'not visible', yield:'small' },
                {label: 'Tomato2', name: "Tomato2", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999991', visible:'not visible', yield:'small' },
                {label: 'Tomato3', name: "Tomato3", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999998', visible:'not visible', yield:'small' },
                {label: 'Tomato4', name: "Tomato4", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999997', visible:'not visible', yield:'small' },
                {label: 'Tomato5', name: "Tomato5", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999996', visible:'not visible', yield:'small' },
                {label: 'Tomato6', name: "Tomato6", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999995', visible:'not visible', yield:'small' },
                {label: 'Tomato7', name: "Tomato7", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999994', visible:'not visible', yield:'small' },
                {label: 'Tomato8', name: "Tomato8", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999993', visible:'not visible', yield:'small' },
        
        
        ]);
        const { newCrop } = useLocalSearchParams();

        useEffect(() => {
                //Alert.alert("Test");
                if(newCrop)
                        {
                               // Alert.alert("Test2");
                                const crop = JSON.parse(newCrop);
                                //Alert.alert("Crop Recieved: " + crop.name);
                                console.log(JSON.stringify(crops))
                                setCrops((prevCrops)=>[...prevCrops, crop]);
                        }
        }, [newCrop]);
        console.log(crops);
               
        {/* Was testing something, leaving for now
        const handleChange = (itemValue, itemIndex) =>
        {
                setItem(itemValue);
        }
        */}

        //Testing functions now

        {/* Deals with rendering the items (In this case, selectables) in the flatlist */}

        const renderItem = ({ item }) => 
        (
                <TouchableOpacity onPress={() => handlePress(item)}>
                        <View style={[ styles.button, isDark && styles.buttonDark ]}>
                                <Text style={styles.buttonText}>{item.name}</Text>
                        </View>
                </TouchableOpacity>
        );

        const handlePress = (item) => 
        {
                console.log('Item pressed:');
                router.push({pathname: '/cropspage', params: item})
        }

        {/*load in all fonts used for this page*/}
	const [fontsLoaded, fontError] = useFonts({
		'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
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
                                <View style={styles.back}>
                                        <AppButton title="" icon={isDark ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.push('/crops')}/>
                                </View>
                                <FlatList
                                        data={crops}
                                        renderItem={renderItem}
                                        keyExtractor={ item => item.hrfNum }
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
                fontSize: 42,
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
        }
});