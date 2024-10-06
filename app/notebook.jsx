/****
 * @author McKenna Beard
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * UNT Notebook Page as apart of the notebook tab on the nav bar--last updated 4_30_2024
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
import notebookModal from '.../assets/NotebookModals/JournalEntryModal'
import { SpeedDial } from '@rneui/themed';
import { View, Text, FlatList, Button, StyleSheet, Picker, Alert, ScrollView } from 'react-native';
import { SpeedDial } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import JournalEntryModal from './JournalEntryModal'; // Adjust the path if necessary
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
					{/*Month selector for notebook entries (to be connected to database)-----------------------------------------------------*/}
					<View style={styles.btnGridContainerDate}>
						{/*row for date selector*/}
						<Row height={20}>
							<Col relativeColsCovered={2} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								<DropDownPicker
									open={open}
									value={value}
									items={items}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setItems}
									disableBorderRadius={true}
									listMode='SCROLLVIEW'
									backgroundColor={Colors.SCOTCH_MIST_TAN}
									dropDownDirection='BOTTOM'
									props={{
										activeOpacity: 1,
									}}
									scrollViewProps={{
										nestedScrollEnabled: false,
										borderColor: 'black',
										zIndex: 800
									}}
									labelStyle={{
										fontFamily: 'WorkSans-Regular',
										fontSize: 16,
									}}
									listItemLabelStyle={{
										fontFamily: 'WorkSans-Regular',
										fontSize: 16,
									}}
									containerStyle={{
										zIndex: 900,
										marginBottom: 50, // height away from top of container
										marginTop: 10,
										alignSelf: 'flex-start',
										backgroundColor: Colors.SCOTCH_MIST_TAN,
										borderColor: 'black',
										border:1
										
									}}
									dropDownContainerStyle={{
										borderWidth: 1,
										zIndex: 1000,
										backgroundColor: 'white',
										borderColor: 'black',
										width: 150

									}}
									style={{
										borderWidth: 1,
										borderRadius: 5,
										height: 40,
										backgroundColor: Colors.SCOTCH_MIST_TAN,
										borderColor: 'clear',
										width: 150,
										marginTop: 20,
										zIndex: 900
									}}
								/>

							</Col>
							<Col relativeColsCovered={2} alignItems='center'>
								{/*Hold space for year selector for semester 2 --*/ }
							</Col>
							<Col relativeColsCovered={2} alignItems='right'> {/* Section for RNE speedDIAL button to add entry/Delete*/ }
								{/*https://reactnativeelements.com/docs/components/speeddial#props */ }
								<SpeedDial
									isOpen={open} {/* Initial State*/ }
									icon={{ name: 'edit', color: '#fff' }} //color is color for text
									openIcon={{ name: 'close', color: '#fff' }}
									onOpen={() => setOpen(!open)}
									onClose={() => setOpen(!open)}
								>
								<SpeedDial.Action //add
									icon={{ name: 'add', color: '#fff' }} //color is color of text
									title="Add"
									onPress={() => setModalVisible(true)}
								/>
								<SpeedDial.Action //delete
									icon={{ name: 'delete', color: '#fff' }} // color is for color of text
									title="Delete"
									onPress={() => console.log('Delete Something')}
								/>
								<SpeedDial.Action //export
									icon={{ name: 'delete', color: '#fff' }} // color is for color of text
									title="Delete"
									onPress={() => console.log('Delete Something')}
								/>
								</SpeedDial>
							</Col>
						</Row>

			{/*Modal display*/ }
			<View>
					<JournalEntryModal
						modalVisible={true}
						//onBackPress={ }

					/>

					
			</View>

			</View>
			{/*start of scroll viewing portion to scroll between the entries made for the month-----------------------------------------------------*/ }
			<ScrollView style={styles.scroll}>
				
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things I did today...'
						defaultValue={entrySix}
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					
				</View>
				
			</ScrollView>
			<NavBar notebookSelected/>
	</View>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
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
	inputBox: {
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'black',
		overflow: 'hidden',
		borderBottomWidth: 2,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		paddingLeft: 5,
		zIndex: 5,
		flex: 3,
		marginTop: 35,
		marginBottom: -15
	},
	inputDateStyle: {
		paddingBottom: 20,
    },
	inputBoxStyle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		padding:2
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
	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
	},
	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
		fontFamily: 'Domine-Regular',
	},
	//style for the grid layout
	btnGridContainer: {
		marginHorizontal: "auto",
		width: '100%',
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1,
		height:'13%'
	}
})

export default Notebook;



				
				


				
				




				
				
