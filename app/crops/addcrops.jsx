/****
 * @author Isaac Boodt, Tyler Bowen
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import React, { useState, useEffect } from 'react';
import { StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        KeyboardAvoidingView, 
        Platform,
        Keyboard,
        StatusBar,
        TouchableWithoutFeedback, 
        Alert } from 'react-native';
        
import Colors from '../../assets/Color.js';
import { useFonts, useLocalSeachParams } from 'expo-font';
import { router } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../../assets/AppButton.jsx';
import Icons from '../../assets/icons/Icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';



const addCrops = () => {
        {/* */}
        //Dummy object that will be filled in later
        const [cropData, setCropData] = useState({
            "fld_c_ZipCode": "12345",
            "fld_c_State": "TX",
            "fld_f_FarmID_fk": 1,
            "fld_c_HRFNumber": 0,
            "fld_l_LocationID_fk": 1,
            "fld_ct_CropTypeID_fk": 1,
            "fld_m_MediumID_fk": 1,
            "fld_c_CropName": "",
            "fld_c_Variety": "",
            "fld_c_Source": "",
            "fld_c_DatePlanted": "",
            "fld_c_Comments": "",
            "fld_c_Yield": "", 
            "fld_c_WasStartedIndoors": 0b0,
            "fld_c_isActive": 0b0,

        })
        const  [savePressed, setButtonPress ] = useState(false)


        //Change data as given, didn't want to worry about specifics, so search dummy object and change accordingly
        const handleChange = (fieldName, input) => {
                setCropData({
                        ...cropData,
                        [fieldName]: input,
                })
        }

        //on save, alert for save push to view crops and add to list
        const handleSave = () =>{
                Alert.alert(cropData.name + " saved");
                setButtonPress(true)
               // router.push({pathname: '/viewcrops', params: {newCrop: JSON.stringify(cropData)}});
        };
        //Handle old unused print checker
        const printStatement = () =>
        {
                Alert.alert('Save pressed');
                console.log(cropData);
        }
        const [isDark, setIsDarkMode] = useState(false)
        useEffect(() => {
                const fetchDarkModeSetting = async () => {
                        const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
                        let result = null
                        if(JSON_VALUE && JSON_VALUE !== "")
                        {
                                result = JSON.parse(JSON_VALUE)
                                console.log("Async: " + result)
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
         useEffect(()=>{
                        const fetchData = async () =>{
                                console.log(cropData)
                                if(savePressed){
                                try{
                                        const response = await fetch('https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addcrop',{method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({cropData: cropData, subID: "sub123"})})
                                        if (!response.ok) {
                                             throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
                                }catch(error){
                                        console.error("Error: ", error)
                                }
                        }

                        }

                        fetchData()
                }, [savePressed])


        //load fonts
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../../assets/fonts/Domine-Regular.ttf'),
        });

        if(!fontsLoaded && !fontError)
        {
                return null;
        }

        return (
                /* Behavior subject to change, mostly making keyboard disappear after tapping elsewhere*/
                <KeyboardAvoidingView
                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                 keyboardVerticalOffset={Platform.OS ==='ios' ? 0 : 20}
                 style={styles.containment}
                 >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style={[styles.container, isDark && styles.containerDark]}>
                        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={ isDark ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
                        {/* Header */}
                        <View style={[styles.titleCard, isDark && styles.titleCarddark]}>
                                <Text style={[styles.title, isDark && {color: Colors.WHITE_SMOKE}]}>Add Crop</Text>
                        </View>
                        {/* Body (Scrollable inputs)*/}
                        <View>
                                <View style={styles.save}>
                                        <AppButton title="" mci="content-save" mciSize={30} mciColor={'white'} onPress={handleSave}/>
                                </View>
                                <View style={styles.back}>
                                        <AppButton title="" icon={isDark ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                                </View>
                        </View>
                        <ScrollView> 
                                <View style={styles.spacer}/>
                                <StatusBar style={{backgroundColor: 'white'}}/>
                                <Text style = {[styles.label, isDark && styles.labelDark]}>Crop Name</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = "name"
                                        maxLength = {128}
                                        onChangeText={(text) => handleChange('fld_c_CropName', text)}
                                        testID="name-input"
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Variety</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Variety'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_c_Variety', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Source</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Source'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_c_Source', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Date Planted'
                                        maxLength={10}
                                        onChangeText={(text) => handleChange('fld_c_DatePlanted', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Location</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Location'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_l_LocationID_pk', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Comments</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Comments'
                                        maxLength={1024}
                                        onChangeText={(text) => handleChange('fld_c_Comments', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Started Indoors?</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Indoors? (Y/N)'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('fld_c_WasStartedIndoors', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Active</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Active'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('fld_c_isActive', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Type'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_CropTypeID_fk', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Medium</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Medium'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_MediumID_fk', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' HRF Number'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_HRFNumber', parseInt(text))}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Yield</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Yield'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_Yield', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Visible</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Visibility'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_IsVisible', text)}

                                />
                        </ScrollView>
                        
                        <View>
                        </View>
                        
                </View>
                
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        )
}


const styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: Colors.SANTA_GRAY,
        },
        containerDark:{
                backgroundColor: Colors.BALTIC_SEA
        },
        containment:{
                flex:1
        },
        spacer:{
                marginTop: 20,
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
        save:{
                position: 'absolute',
                marginTop: 10,
                marginLeft: 300,
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
        textBox:{
                marginTop: -5,
                backgroundColor: "white",
                borderColor: Colors.CHARCOAL,
                overflow: 'hidden',
                borderWidth: 2,
                borderBottomWidth: 2,
                width:'90%',
                marginLeft: '5%',
                marginRight: '5%',
                height: 40,
                borderRadius: 12,
                zIndex: 1,
        },
        textBoxDark:{
                backgroundColor: Colors.IRIDIUM,
                borderColor: Colors.WHITE_SMOKE,
                borderWidth: 2,
                borderBottomWidth: 2,
                width:'90%',
                marginLeft: '5%',
                marginRight: '5%',
                height: 40,
                borderRadius: 12,
        },
        label:{
                marginTop: -15,
		marginLeft: '15%',
		alignSelf: 'flex-start',
		backgroundColor: 'white',
		zIndex: 10,
		fontSize: 16,
                fontFamily: 'Domine-Regular',
		borderColor: 'white',
        },
        labelDark:{
                backgroundColor: Colors.IRIDIUM,
                marginTop: -17,
		marginLeft: '15%',
		alignSelf: 'flex-start',
		zIndex: 10,
		fontSize: 16,
                color: Colors.WHITE_SMOKE,
                fontFamily: 'Domine-Regular',
                
        },
        inputText:{
                fontSize: 16,
        },
        icon:{

        }



      });
      export default addCrops;