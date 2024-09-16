/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        KeyboardAvoidingView, 
        Platform,
        Keyboard,
        TouchableWithoutFeedback, 
        Alert } from 'react-native';
        
import Colors from '../assets/Color';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';



const addcrops = () => {
        {/* */}
        const [cropData, setCropData] = useState({
                medium:'',
                location:'',
                type:'',
                hrfNum:'',
                name:'',
                variety:'',
                source:'',
                datePlanted:'',
                comments:'',
                yield:'',
                indoors:'',
                active:'',
                visible:'',

        })

        const handleChange = (fieldName, input) => {
                setCropData({
                        ...cropData,
                        [fieldName]: input,
                })
        }
        const printStatement = () =>
        {
                Alert.alert('Save pressed');
                console.log(cropData);
        }
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
        });

        return (
                /* Behavior subject to change, mostly making keyboard disappear after tapping elsewhere*/
                <KeyboardAvoidingView
                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                 keyboardVerticalOffset={Platform.OS ==='ios' ? 0 : 20}
                 style={styles.containment}
                 >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style={styles.container}>
                        {/* Header */}
                        <View style={styles.titleCard}>
                                <Text style={styles.title}>Add Crop</Text>
                        </View>
                        {/* Body (Scrollable inputs)*/}
                        <ScrollView> 

                                <View style={styles.save}>
                                        <AppButton title="" mci="content-save" mciSize={30} mciColor={'white'} onPress={printStatement}/>
                                </View>
                                <View style={styles.back}>
                                        <AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                                </View>
                                

                                <StatusBar style={{backgroundColor: 'white'}}/>
                                <Text style={styles.label}>Crop Name</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Name'
                                        maxLength = {128}
                                        onChangeText={(text) => handleChange('name', text)}
                                />
                                <Text style={styles.label}>Variety</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Variety'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('variety', text)}
                                />
                                <Text style={styles.label}>Source</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Source'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('source', text)}
                                />
                                <Text style={styles.label}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Date Planted'
                                        maxLength={10}
                                        onChangeText={(text) => handleChange('datePlanted', text)}
                                />
                                <Text style={styles.label}>Location</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Location'
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('location', text)}
                                />
                                <Text style={styles.label}>Comments</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Comments'
                                        maxLength={1024}
                                        onChangeText={(text) => handleChange('comments', text)}
                                />
                                <Text style={styles.label}>Started Indoors?</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Indoors? (Y/N)'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('indoors', text)}

                                />
                                <Text style={styles.label}>Active</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Active'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('active', text)}

                                />
                                <Text style={styles.label}>Type</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Type'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('type', text)}

                                />
                                <Text style={styles.label}>Medium</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Medium'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('medium', text)}

                                />
                                <Text style={styles.label}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' HRF Number'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('hrfNum', text)}

                                />
                                <Text style={styles.label}>Yield</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Yield'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('yield', text)}

                                />
                                <Text style={styles.label}>Visible</Text>
                                <Input
                                        inputContainerStyle = {styles.textBox}
                                        placeholder = ' Visibility'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('visible', text)}

                                />
                        </ScrollView>
                        
                </View>
                
                
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        )
}

export default addcrops;

const styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: Colors.SANTA_GRAY,
        },
        containment:{
                flex:1
        },
        titleCard:{
                backgroundColor: Colors.ALMOND_TAN,
                borderColor: Colors.CHARCOAL,
                borderWidth: 1,
                padding: 18,
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
        label:{
                marginTop: -15,
		marginLeft: '15%',
		alignSelf: 'flex-start',
		backgroundColor: 'white',
		zIndex: 10,
		fontSize: 16,
                borderColor: Colors.CHARCOAL,
		borderWidth: 2,
		borderRadius: 7,
                FontFamily: 'Domine-Regular',
		borderColor: 'white',
        },
        inputText:{
                fontSize: 16,
        },
        icon:{

        }



      });