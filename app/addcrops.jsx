/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester Isaac Boodt
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
        Alert,
        Appearance
} from 'react-native';
        
import Colors from '../assets/Color';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cleanText, cleanNumbers} from '../assets/sanitizer'
import DropDownPicker from 'react-native-dropdown-picker';



const AddCrops = () => {
        {/* */}
        //Dummy object that will be filled in later
        const [cropData, setCropData] = useState({
                name:'',
                medium:'',
                location:'',
                type:'',
                hrfNum:'',
                variety:'',
                source:'',
                datePlanted:'',
                comments:'',
                yield:'',
                indoors:'',
                active:'',
                visible:'',

        });
        const [open, setOpen] = useState(false);
        const [selectedIndoors, setSelectedIndoors] = useState(cropData.type)
        const [selectedActive, setSelectedActive] = useState(cropData.active)
        const [items, setItems] = useState([
                {label: 'Yes', value: 'Yes' },
                {label: 'No', value: 'No'}
        ]);


        const handleIndoorsChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        indoors: value,
                })
        }
        const handleActiveChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        active: value,
                })
                setSelectedActive(value);
        }

        //Change data as given, didn't want to worry about specifics, so search dummy object and change accordingly
        const handleChange = (fieldName, input) => {
                
                setCropData({
                        ...cropData,
                        //[fieldName]: cleanText(input, noStopwords = false, noSQL = true, textOnly = true, hexCode = true)
                        [fieldName]: input
                })
        }

        //on save, alert for save push to view crops and add to list
        const handleSave = () =>{
                const emptyFields = Object.values(cropData).some(value=> value ==='');
                if(emptyFields)
                {
                        console.log(emptyFields)
                        Alert.alert("Unable to save, some fields are still empty");
                }
                else
                {
                        Alert.alert(cropData.name + " saved");
                        router.push({pathname: '/viewcrops', params: {newCrop: JSON.stringify(cropData)}});
                }
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
                const min = 100000;
                const max = 999999;
                const setHRFnum = Math.floor(Math.random() * (max - min - 1)) + min;
                cropData.hrfNum = setHRFnum;
                console.log(setHRFnum);
                console.log(cropData.hrfNum)
        }, [])

        //load fonts
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
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
                                <View style={styles.titleContainer}>
                                        <Text style={[styles.title, isDark && {color: Colors.WHITE_SMOKE}]}>Add Crop</Text>
                                        <View style={styles.semicircle}></View>
                                </View>
                        </View>
                        {/* Body (Scrollable inputs)*/}
                        <View>
                                <View style={styles.save}>
                                        <AppButton title="" mci="content-save" mciSize={30} mciColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL} onPress={handleSave}/>
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
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength = {128}
                                        onChangeText={(text) => handleChange('name', text)}
                                        testID="name-input"
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Variety</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Variety'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('variety', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Source</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Source'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('source', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Date Planted'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={10}
                                        onChangeText={(text) => handleChange('datePlanted', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Location</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Location'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('location', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Comments</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Comments'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={1024}
                                        onChangeText={(text) => handleChange('comments', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Started Indoors?</Text>
                                
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open}
                                        setOpen={setOpen}
                                        value={selectedIndoors}
                                        setValue={setSelectedIndoors}
                                        items={items}
                                        onChangeValue={handleIndoorsChange}
                                        placeholder="Started Indoors?"
                                        style={styles.textBox}
                                />
                                
                                {/*}
                               <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Indoors'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('indoors', text)}

                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Active</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Active'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('active', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Type'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('type', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Medium</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Medium'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('medium', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={cropData.hrfNum.toString()}
                                        editable={false}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Yield</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Yield'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('yield', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Visible</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Visibility'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('visible', text)}

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
                alignContent: 'center',
                flex: 1
        },
        save:{
                position: 'absolute',
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
        inputTextDark:{
                  color: Colors.WHITE_SMOKE
        },
        icon:{

        }



      });
      export default AddCrops;