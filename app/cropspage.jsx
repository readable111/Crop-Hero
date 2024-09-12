/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';



const cropspage = () => {

        {/* Grabs variable form viewcrops page for use */}
        const crop = useLocalSearchParams();
        console.log(crop); //test
        console.log(crop.name); //test

        //Use state for switching if something is editable
        const [readOnly, setReadOnly] = useState(true)

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

        return (
                <ScrollView style={styles.container}> 
                        <Text style={styles.title}>{crop.name}</Text>
                        
                        <View style={styles.back}>
                                <AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                        </View>

                        <StatusBar style={{backgroundColor: 'white'}}/>
                        <Text style={styles.label}>Crop Name</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.name}
                                maxLength = {128}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Variety</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.variety}
                                maxLength={128}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Source</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.source}
                                maxLength={128}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Date Planted</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.datePlanted}
                                maxLength={10}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Location</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.location}
                                maxLength={128}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Comments</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.comments}
                                maxLength={1024}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Started Indoors?</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.indoors}
                                maxLength={3}
                                readOnly = {readOnly}
                        />
                        <Text style={styles.label}>Active</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.active}
                                maxLength={3}
                                readOnly = {readOnly}

                        />
                        <Text style={styles.label}>Type</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.type}
                                maxLength={64}
                                readOnly = {readOnly}

                        />
                        <Text style={styles.label}>HRF Number</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.hrfNum}
                                maxLength={64}
                                readOnly = {readOnly}

                        />
                        <Text style={styles.label}>Visible</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.visible}
                                maxLength={64}
                                readOnly = {readOnly}

                        />
                        <Text style={styles.label}>Yield</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                value={crop.yield}
                                maxLength={64}
                                readOnly = {readOnly}

                        />
                </ScrollView>
        )
}

export default cropspage;

const styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: '#97A5BF',
        },
        title:{
                backgroundColor: '#f1ddbf',
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
        inputText:{
                fontSize: 16,
        },
        icon:{

        }



      });