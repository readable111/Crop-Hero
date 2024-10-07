/****
 * @author McKenna Beard
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * UNT Notebook Page as apart of the notebook tab on the nav bar--last updated 10_6_2024
 * This  page is meant to keep track of what was done that day for future reference if needed
 ***/

import { React, useState } from 'react';
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color'
import AppButton from '../assets/AppButton.jsx'
import { Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
import NavBar from '../assets/NavBar'
import JournalEntryModal from '../assets/NotebookModals/JournalEntryModal'
import { SpeedDial } from '@rneui/themed';
import { Picker } from 'react-native-picker'
import { View, Text, FlatList, Button, StyleSheet, Alert, ScrollView,StatusBar } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Notebook = () => {
	
const [entries, setEntries] = useState([]); // Store journal entries
    const [modalVisible, setModalVisible] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null); // To handle editing entries
    const [selectedMonth, setSelectedMonth] = useState("All"); // State for month filter
    const [selectedYear, setSelectedYear] = useState("All"); // State for year filter
    const [open, setOpen] = useState(false); // State for SpeedDial

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
            <Button title="Edit" onPress={() => openModalForEdit(item)} />
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

	{/*return an error if the fonts fail to load*/ }
	if (!fontsLoaded && !fontError) {
		return null;
	}

	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }
	return (
		<View style={styles.topContainer }>
			{/*create the default phone status bar at the top of the screen----------------------------------------------------------------------*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*two top circle buttons that swap between todo page and notebook page -------------------------------------------------------------*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>
					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="To-Do" specifiedStyle={styles.ovals} onPress={() => router.replace('/todo') } />
					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.oval} onPress={() => router.replace('/notebook')} />
					</Col>
				</Row>
			</View>
			 <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="01" value="01" />
                    <Picker.Item label="02" value="02" />
                    <Picker.Item label="03" value="03" />
                    <Picker.Item label="04" value="04" />
                    <Picker.Item label="05" value="05" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="07" value="07" />
                    <Picker.Item label="08" value="08" />
                    <Picker.Item label="09" value="09" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                </Picker>

                <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    {/* Add more years as needed */}
                </Picker>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {sortedEntries().map(item => (
                    <View key={item.EntryID} style={styles.entryContainer}>
                        <Text style={styles.entryText}>Entry ID: {item.EntryID}</Text>
                        <Text style={styles.entryText}>Date: {item.EntryDate}</Text>
                        <Text style={styles.entryText}>Contents: {item.Contents}</Text>
                        <Button title="Edit" onPress={() => openModalForEdit(item)} />
                    </View>
                ))}
            </ScrollView>

            {/* Journal Entry Modal */}
            <JournalEntryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveEntry}
                journalEntry={editingEntry} // Pass entry to edit
            />

            {/* Speed Dial */}
            <SpeedDial
                isOpen={open}
                icon={{ name: 'pencil', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(false)}
                style={styles.speedDial}
            >
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="plus" size={24} color="white" />} // Add icon
                    title="Add"
                    onPress={() => {
                        setEditingEntry(null); // Clear editing entry
                        setModalVisible(true); // Open modal to add new entry
                    }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="export" size={24} color="white" />} // Export icon
                    title="Export"
                    onPress={handleExport}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="pencil" size={24} color="white" />} // Edit icon
                    title="Edit"
                    onPress={() => {
                        if (editingEntry) {
                            openModalForEdit(editingEntry); // Reopen modal for editing
                        } else {
                            Alert.alert("Select an entry to edit."); // Alert if no entry selected
                        }
                    }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="delete" size={24} color="white" />} // Delete icon
                    title="Delete"
                    onPress={() => {
                        if (editingEntry) {
                            handleDelete(editingEntry.EntryID); // Trigger delete function
                        } else {
                            Alert.alert("Select an entry to delete."); // Alert if no entry selected
                        }
                    }}
                />
            </SpeedDial>
        </View>	
			<NavBar notebookSelected/>
	</View>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
	 container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    entryContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20, // Rounded corners
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    entryText: {
        marginBottom: 5,
    },
    speedDial: {
        position: 'absolute',
        bottom: 20,
        right: 20,
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
	topContainer: {
		backgroundColor: Colors.PERIWINKLE_GRAY,
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		zIndex: -1,
		height:20
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



				
				


				
				




				
				
