/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input, colors } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';
import Colors from '../assets/Color';
import { useFonts } from 'expo-font'



const viewcrops = () => {
        {/* Array of objects, used to differentiate picked items */}
        const [selectedItem, setItem] = useState(null);

        //Fonts
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
        });

        {/* Dummy Data, for picker use */}
        const [crops, setCrops] = useState([
                {label: 'Carrot', name: 'Carrot', active: 'Y', location: 'Greenhouse', variety: 'Standard', source: 'Home Depot', datePlanted: '05/06/2024', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '193242', visible:'visible', yield:'none'},
                {label: 'Cabbage', name: 'Cabbage', active: 'N', location: 'Outside', variety: 'Standard', source: 'Friend Recommendation', datePlanted: '01/24/2022', comments: 'None', indoors: 'Yes', type:'Standard' , medium: 'Hugel Mound', hrfNum: '945304', visible:'not visible', yield:'large'},
                {label: 'Potato', name: 'Potato', active: 'Y', location: 'Dump', variety: 'Standard', source: "Farmer's market", datePlanted: '11/13/2019', comments: 'None', indoors: 'Yes', type:'Standard', medium: 'Hugel Mound', hrfNum: '835242', visible:'visible', yield:'medium' },
                {label: 'Tomato', name: "Tomato", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", datePlanted: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard', medium: 'Hugel Mound', hrfNum: '999999', visible:'not visible', yield:'small' },
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
                        <View style={styles.button}>
                                <Text style={styles.buttonText}>{item.name}</Text>
                        </View>
                </TouchableOpacity>
        );

        const handlePress = (item) => 
        {
                console.log('Item pressed:');
                router.push({pathname: '/cropspage', params: item})
        }
        return (
                <View>
                        <Text style={styles.title}>View Crops</Text>
                        <View style={styles.container}>
                                <View style={styles.back}>
                                        <AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.push('/crops')}/>
                                </View>
                                <FlatList
                                        data={crops}
                                        renderItem={renderItem}
                                        keyExtractor={ item => item.hrfNum}
                                />

                        </View>
                </View>
        )
}

export default viewcrops;

const styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: Colors.SANTA_GRAY,
        },
        title:{
                backgroundColor: Colors.ALMOND_TAN,
                borderColor: '#20232a',
                borderWidth: 1,
                padding: 18,
                textAlign: 'right',
                fontSize: 42,
        },
        save:{
                marginTop: 10,
                marginLeft: 370,
                width: 40,
                height: 40,
                borderRadius: 40/2,
                backgroundColor: "lime",
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
        textBox:{
                marginTop: -10,
                backgroundColor: "#FFFFFF",
                borderColor: "#20232a",
                overflow: 'hidden',
                borderWidth: 2,
                borderBottomWidth: 2,
                marginLeft: 20,
                marginRight: 30,
                width: 350,
                height: 40,
                borderRadius: 12,
                paddingLeft: 10,
        },
        label:{
                marginTop: -12,
		marginLeft: 47,
		alignSelf: 'flex-start',
		backgroundColor: 'white',
		zIndex: 10,
		fontSize: 16,
		borderWidth: 3,
		borderRadius: 7,
		borderColor: 'white',
        },
        dropdownBox: {
                width: 200, 
                height: 40, 
                borderWidth: 1, 
                borderColor: "#ccc",
                borderRadius: 5,
        },
        button:{
                backgroundColor: Colors.SCOTCH_MIST_TAN,
                textAlign: 'center',
                padding: 20,
                fontSize: 38,
                marginTop: 20,
                marginHorizontal: 20,
                borderColor: '#20232a',
                borderWidth: 2,
                borderRadius: 8,
        },
        buttonText:{
                fontSize: 24,
                fontFamily: 'Domine-Regular',
                textAlign: 'center',

        }
});