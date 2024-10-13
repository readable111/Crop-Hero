/****
 * @author McKenna Beard
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * UNT Notebook Page as apart of the notebook tab on the nav bar--last updated 10_13_2024
 * This  page is meant to keep track of what was done that day for future reference if needed
 ***/

import { React, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Col, Row } from '../assets/Grid.jsx';
import Colors from '../assets/Color';
import AppButton from '../assets/AppButton.jsx';
import { Input } from 'react-native-elements';
import NavBar from '../assets/NavBar';
import JournalEntryModal from '../assets/NotebookModals/JournalEntryModal';
import { SpeedDial } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Notebook = () => {
    const [entries, setEntries] = useState([]); // Store journal entries
    const [modalVisible, setModalVisible] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null); // To handle editing entries
    const [selectedMonth, setSelectedMonth] = useState("All"); // State for month filter
    const [selectedYear, setSelectedYear] = useState("All"); // State for year filter
    const [open, setOpen] = useState(false); // State for SpeedDial
    const [selectedEntry, setSelectedEntry] = useState(null); // To store the currently selected entry

    const handleSaveEntry = (entryID, jsonData) => {
        const entry = JSON.parse(jsonData);
        if (entryID) {
            // Update existing entry
            setEntries(prevEntries =>
                prevEntries.map(item => item.EntryID === entryID ? entry : item)
            );
        } else {
            // Add new entry
            entry.EntryID = entries.length > 0 ? Math.max(...entries.map(e => e.EntryID)) + 1 : 1; // Increment EntryID
            setEntries(prevEntries => [...prevEntries, entry]);
        }
    };

    const openModalForEdit = (entry) => {
        setEditingEntry(entry);
        setModalVisible(true);
    };

    // Function to filter entries based on month and year
    const filteredEntries = () => {
        return entries.filter(entry => {
            const [month, year] = entry.EntryDate.split('');
            const monthMatch = selectedMonth === "All" || month === selectedMonth;
            const yearMatch = selectedYear === "All" || year === selectedYear;

            return monthMatch && yearMatch;
        });
    };

    // Sort entries from newest to oldest
    const sortedEntries = () => {
        return filteredEntries().sort((a, b) => b.EntryID - a.EntryID);
    };

    const renderItem = ({ item }) => (
        <View style={styles.entryContainer}>
            <Text style={styles.entryText}>Entry ID: {item.EntryID}</Text>
            <Text style={styles.entryText}>Date: {item.EntryDate}</Text>
            <Text style={styles.entryText}>Contents: {item.Contents}</Text>
        </View>
    );

    const handleExport = () => {
        // Implement your export logic here
        console.log("Exporting entries:", entries);
    };

    const handleDelete = (entryID) => {
        // Alert the user for confirmation before deleting
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: () => {
                        // Delete the entry
                        setEntries(prevEntries => prevEntries.filter(item => item.EntryID !== entryID));
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.topContainer}>
            <StatusBar backgroundColor={Colors.WHITE_SMOKE} />
            <View style={styles.btnGridContainer}>
                <Row height={80}>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="To-Do" specifiedStyle={styles.ovals} onPress={() => router.replace('/todo')} />
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="Notebook" specifiedStyle={styles.oval} onPress={() => router.replace('/notebook')} />
                    </Col>
                </Row>
            </View>

            
            <View style={styles.filterContainer }>
                    <Picker
                        selectedValue={selectedMonth}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    >
                        <Picker.Item label="Month" value="All" />
                        {[...Array(12)].map((_, i) => (
                            <Picker.Item key={i} label={`${i + 1}`.padStart(2, '0')} value={`${i + 1}`.padStart(2, '0')} />
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={selectedYear}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    >
                        <Picker.Item label="Date" value="All" />
                        {[2023, 2024].map(year => (
                            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                        ))}
                    </Picker>
            </View>
            
            
            <ScrollView style={styles.scrollContainer}>
                
                    {sortedEntries().map(item => (
                        <View style={styles.outsideEntryBox }>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedEntry(item); // Set the selected entry
                                    setOpen(true); // Open the Speed Dial
                                }}
                                style={styles.entryContainer}
                            >
                                <Text style={styles.entryText}>Entry ID: {item.EntryID}</Text>
                                <Text style={styles.entryText}>Date: {item.EntryDate}</Text>
                                <Text style={styles.entryText}>Contents: {item.Contents}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                
            </ScrollView>
            
               
                
                <SpeedDial
                    isOpen={open}
                    icon={{ name: 'edit', color: 'white' }}
                    openIcon={{ name: 'close', color: 'white' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(false)}
                    buttonStyle={{ backgroundColor: 'green' }}
                    style={styles.speedDial}
                >
                    <SpeedDial.Action
                        icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
                        title="Add"
                        buttonStyle={{ backgroundColor: 'green' }}
                        onPress={() => {
                            setEditingEntry(null); // Clear editing entry
                            setModalVisible(true); // Open modal to add new entry
                        }}
                    />
                    <SpeedDial.Action
                        icon={<MaterialCommunityIcons name="export" size={24} color="white" />}
                        title="Export"
                        onPress={handleExport}
                        buttonStyle={{ backgroundColor: 'green' }}
                    />
                    <SpeedDial.Action
                        icon={<MaterialCommunityIcons name="pencil" size={24} color="white" />}
                        title="Edit"
                        buttonStyle={{ backgroundColor: 'green' }}
                        onPress={() => {
                            if (selectedEntry) {
                                openModalForEdit(selectedEntry); // Reopen modal for editing
                            } else {
                                Alert.alert("Select an entry to edit."); // Alert if no entry selected
                            }
                        }}
                    />
                    <SpeedDial.Action
                        icon={<MaterialCommunityIcons name="delete" size={24} color="white" />}
                        title="Delete"
                        buttonStyle={{ backgroundColor: 'green' }}
                        onPress={() => {
                            if (editingEntry) {
                                handleDelete(editingEntry.EntryID); // Trigger delete function
                            } else {
                                Alert.alert("Select an entry to delete."); // Alert if no entry selected
                            }
                        }}
                    />
                    </SpeedDial>
                
            <JournalEntryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveEntry}
                journalEntry={editingEntry} // Pass entry to edit
            />
            <NavBar notebookSelected />
        </View>
    );
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({



    outsideEntryBox: { // outside box of the entries
        backgroundColor: Colors.SCOTCH_MIST_TAN, 
       // height: '90%',
        width: '90%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15,
        //marginBotton: 15,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10


    },
    scrollContainer: { //holds outsideEntrybox>entryContainer
        flex: 1,
        width: '100%',
        //height: 'auto',
        //marginTop: 60,
       // backgroundColor: 'red',
        backgroundColor: 'transparent',
        //alignContent: 'center'
        //borderRadius: 5,
       // borderWidth: 1,
        //borderColor: 'black',
        marginTop: 15,
        alignSelf: 'center'
        
        
    },
    entryContainer: { //should be the box surrounding each entry individually
        width: '90%',
       // height: '80%',
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 27,
        marginTop: 20,
        border: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',

    },
    filterContainer: { // holds picker
        flexDirection: 'row',
        backgroundColor: Colors.ALMOND_TAN,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignContent: 'flex-start',
        width: '100%',
        height: '7%', 
        marginTop: 5,
        marginBotton: 3,
        alignSelf: 'center'
      

    },
    picker: { // two drop down elements overall contained in filterContainer
        height: '20%',
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.ALMOND_TAN,
        //marginBottom: 20,
       // marginTop: 20,
        flexDirection: 'row'

        
    },
   
    entryText: {
        fontSize: 16,
        backgroundColor: 'white'
    },

    pickerItem: {
        backgroundColor: Colors.HOT_GREEN
    },
    btnGridContainer: {
        marginHorizontal: "auto",
        width: '100%',
        backgroundColor: Colors.ALMOND_TAN,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        height: '13%'
    },
  
    container: { // took out used to be above filter container but was blocking everything
        flex: 4,
        //padding: 20,
        //backgroundColor: 'blue',
        //backgroundColor: Colors.ALMOND_TAN,
        width: '90%',
        marginTop: 5,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        height: '100%',
        
        


    },

  
    entryText: {
        marginBottom: 5,
    },
    speedDialContainer: { // didnt end up needing this
        backgroundColor: 'purple',
        //height: '80%',
        width: '100%',
        //zIndex: 20,
       // marginBottom: -65
    
    },
    speedDial: {
        position: 'absolute',
        bottom: 60,
        right: 5,
        color: Colors.HOT_GREEN,
        flex: 5,
        zIndex: 100,
        flexDirection: 'vertical'
    },
	fstContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		padding: 5,
		marginBottom: 27,
		marginTop: 20,
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf:'center'
    },
	scroll: {
		width: '100%'
	},
	btnGridContainerDate: {
		zIndex: 1000,
		marginHorizontal: 20,
		marginBottom: 30,
    },
	topContainer: { // overall page container
        backgroundColor: Colors.PERIWINKLE_GRAY,
        //backgroundColor:'pink',
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		//zIndex: -1,
		height:'90%',
	},
	
	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',		
	},
	ovals: {
		backgroundColor: Colors.ALMOND_TAN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',
	},
	
})

export default Notebook;
		


				
				




				
				
