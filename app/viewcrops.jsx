import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { Input, colors } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';
import { Picker } from '@react-native-picker/picker';
import Colors from '../assets/Color';



const viewcrops = () => {
        {/* Array of objects, used to differentiate picked items */}
        const [selectedItem, setItem] = useState(null);
        {/* Dummy Data, for picker use */}

        const crops = [
                { label: 'Carrot', value: { name: 'Carrot', active: 'Y', location: 'Greenhouse', variety: 'Standard', source: 'Home Depot' } },
                { label: 'Cabbage', value: { name: 'Cabbage', active: 'N', location: 'Outside', variety: 'Standard', source: 'Friend Recommendation'} },
                { label: 'Potato', value: { name: 'Potato', active: 'Y', location: 'Dump', variety: 'Standard', source: "Farmer's market" } },
                { label: 'Tomato', value: { name: "Tomato", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered"} }
        ]

        const handleChange = (itemValue, itemIndex) =>
        {
                setItem(itemValue);
        }

        return (
                <View>
                        <Text style={styles.title}>View Crop</Text>
                        <View style={styles.container}>
                        
                        </View>
                </View>
        )
}

export default viewcrops;

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
                marginTop: -40,
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
        backdrop: {
                alignItems: "center",
                backgroundColor : colors.white,

        }




      });