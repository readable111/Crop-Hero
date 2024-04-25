import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router'
import { Input } from 'react-native-elements'

const addcrops = () => {
        {/* */}
        return (
                <ScrollView style={styles.container}> 
                        <Text style={styles.title}>Add Crop</Text>
                        <Pressable onPress={() => Alert.alert('Save Button Pressed')}>
                                <View style={styles.save}></View>
                        </Pressable>
                        <StatusBar style={{backgroundColor: 'white'}}/>
                        
                        <View style={{marginTop: 70}}></View>
                        <Text style={styles.label}>Crop Name</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Name'
                                maxLength = {128}
                        />
                        <Text style={styles.label}>Variety</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Variety'
                                maxLength={128}
                        />
                        <Text style={styles.label}>Source</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Source'
                                maxLength={128}
                        />
                        <Text style={styles.label}>Date Planted</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Date Planted'
                                maxLength={10}
                        />
                        <Text style={styles.label}>Location</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Location'
                                maxLength={128}
                        />
                        <Text style={styles.label}>Comments</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Comments'
                                maxLength={1024}
                        />
                        <Text style={styles.label}>Started Indoors?</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Indoors? (Y/N)'
                                maxLength={3}
                        />
                        <Text style={styles.label}>Active</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Active'
                                maxLength={3}
                        />
                        <Text style={styles.label}>Type</Text>
                        <Input
                                inputContainerStyle = {styles.textBox}
                                placeholder = 'Type'
                                maxLength={64}
                        />         
                </ScrollView>
        )
}

export default addcrops;

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
                position: 'absolute',
                marginTop: 10,
                marginLeft: 340,
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                backgroundColor: "lime",
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
        }



      });