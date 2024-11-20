/****
 * @author McKenna Beard
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * UNT Notebook Page as apart of the notebook tab on the nav bar--last updated 11_10_2024
 * This  page is meant to keep track of what was done that day for future reference if needed
 ***/
import { React, useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Button, 
    StyleSheet, 
    Alert, 
    StatusBar, 
    TouchableOpacity, 
    Appearance 
} from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Col, Row } from '../assets/Grid.jsx';
import Colors from '../assets/Color';
import AppButton from '../assets/AppButton.jsx';
import { Picker } from '@react-native-picker/picker';
import { SpeedDial } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavBar from '../assets/NavBar';
import JournalEntryModal from '../assets/NotebookModals/JournalEntryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notebook = () => {
    const subID ="sub123"
    const [entries, setEntries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [open, setOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [newEntry, setNewEntry] = useState()
    const [savePressed, setSavePressed] = useState(false)
    const [editPressed, setEditPressed] = useState(false)
    const [deletePressed, setDeletePressed] = useState(false)
    const clearSelectedEntry = () => {
        setSelectedEntry(null); // Reset the selected entry
    };
    useEffect(() => {
		// declare the async data fetching function
		const fetchDarkModeSetting = async () => {
			const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
			let result = null
    		if (JSON_VALUE && JSON_VALUE !== "") {
				result = JSON.parse(JSON_VALUE)
                console.log("Async: " + result)
			} else {
				colorScheme = Appearance.getColorScheme()
				if (colorScheme == 'dark') {
					result = true
				} else {
					result = false
				}
                console.log("colorScheme: " + result)
			}
			setIsDarkMode(result)
		}
	  
		// call the function
		fetchDarkModeSetting()
		  	// make sure to catch any error
		  	.catch(console.error);
	}, [])
    const handleSaveEntry = (entry) => {
        console.log(entry)
        setNewEntry(entry)
        setSavePressed(true)
        setOpen(false)
    };

    const openModalForEdit = (entry) => {
        //console.log(formattedDate);
        setEditingEntry(entry);
        setModalVisible(true);
    };

    const filteredEntries = () => {
        return entries.filter(entry => {
            const entryDate = new Date(entry[1]); // iso 
            if (isNaN(entryDate)) return false; // Skip invalid dates

            const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, '0'); // changes month to number
            const entryYear = entryDate.getFullYear().toString(); // Convert year 

            const monthMatch = selectedMonth === "All" || selectedMonth === entryMonth;
            const yearMatch = selectedYear === "All" || selectedYear === entryYear;

            return monthMatch && yearMatch;
        });
    };


    const renderItem = ({ item }) => {
        // Extract month, day, year for display
        //let formattedDate = "Invalid Date";
        //if (item.EntryDate instanceof Date && !isNaN(item.EntryDate)) {
          //    formattedDate = `${item.EntryDate.getMonth() + 1}/${item.EntryDate.getDate()}/${item.EntryDate.getFullYear()}`;
        //}
         //   const entryDate = item.EntryDate ? new Date(item.EntryDate) : null;
    //const formattedDate = entryDate && !isNaN(entryDate.getTime())
      //  ? `${entryDate.getMonth() + 1}/${entryDate.getDate()}/${entryDate.getFullYear()}`
        //: "Invalid Date";
        const formattedDate = new Date(item[1]).toISOString().slice(0,10)
        return (
            <View style={[styles.entryContainer, isDarkMode && styles.darkEntryContainer]}>
                <TouchableOpacity
                    onLongPress={() => {
                        setSelectedEntry(item);
                        setOpen(true);
                    }}
                    style={[styles.entryInsideContainer, isDarkMode && styles.darkEntryInsideContainer]}
                >
                    <Text style={[styles.entryText, isDarkMode && styles.darkText]}>Entry ID: {item[0]}</Text>
                    <Text style={[styles.entryText, isDarkMode && styles.darkText]}>Date: {formattedDate}</Text>
                    <Text style={[styles.entryText, isDarkMode && styles.darkText]}>Contents: {item[3]}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleExport = () => {
        console.log("Exporting entries:", entries);
    };

    const handleDelete = (entryID) => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => {
                    
                    setDeletePressed(true)}}
            ],
            { cancelable: false }
        );
    };

    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
    });

    useEffect(()=>{
        const fetchEntries = async () =>{
            try{
                response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listJournalEntries/${subID}`,{method: 'GET'})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                const data = await response.json()
                setEntries(data)
            }catch(error){
                console.error("Error:", error)
            }
        }
        fetchEntries()
    }, [subID, savePressed])

    useEffect(()=>{
        const addEntry = async () =>{
            if(savePressed){
            try{
                console.log(newEntry)
                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addJournalEntry`,{method: 'POST', headers:{'Content-Type':'application/json'}, body:  JSON.stringify({subID: subID, entry:newEntry})})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                setSavePressed(false)
                setNewEntry(null)
            }catch(error){
                console.error("Error:", error)
            }
        }
        }
        addEntry()
    }, [savePressed])

    useEffect(()=>{
        const editEntry = async () =>{
            if(savePressed && editPressed){
                try{
                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/updateJournalEntry`,{method: 'POST', headers:{'Content-Type':'application/json'}, body:  JSON.stringify({subID: subID, entryID:selectedEntry[0], entry:newEntry})})
               if(!response.ok){
                       console.error("HTTP ERROR:")
                       throw new Error;
                   }
                   setSavePressed(false)
                   setNewEntry(null)
                   setEditPressed(false)
               }catch(error){
                   console.error("Error:", error)
               }
            }
        }
        editEntry()
    }, [savePressed, deletePressed])

    useEffect(()=>{
        const deleteEntry = async () =>{
            if(deletePressed){
                try{
                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/deleteJournalEntry`,{method: 'POST', headers:{'Content-Type':'application/json'}, body:  JSON.stringify({subID: subID, entryID:selectedEntry[0]})})
               if(!response.ok){
                       console.error("HTTP ERROR:")
                       throw new Error;
                   }
                   setNewEntry(null)
                   setDeletePressed(false)
               }catch(error){
                   console.error("Error:", error)
               }
            }
        }
        deleteEntry()
    }, [deletePressed])





    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={[styles.topContainer, isDarkMode && styles.darkContainer]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE} />
            <View style={isDarkMode ? styles.darkBtnGridContainer : styles.btnGridContainer}>
                <Row height={80}>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="To-Do" specifiedStyle={isDarkMode ? styles.darkOvals : styles.ovals} onPress={() => router.replace('/todo')} />
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="Notebook" specifiedStyle={isDarkMode ? styles.darkOval : styles.oval} onPress={() => router.replace('/notebook')} />
                    </Col>
                </Row>
            </View>

            <View style={isDarkMode ? styles.darkFilterContainer : styles.filterContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    style={isDarkMode ? styles.darkPicker : styles.picker}
                    dropdownIconColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                    <Picker.Item label="Month" value="All" style={isDarkMode ? {backgroundColor: Colors.CHARCOAL, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.ALMOND_TAN, color: Colors.ALMOST_BLACK}} />
                    {[...Array(12)].map((_, i) => (
                        <Picker.Item style={isDarkMode ? {backgroundColor: Colors.CHARCOAL, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.ALMOND_TAN, color: Colors.ALMOST_BLACK}} key={i} label={`${i + 1}`.padStart(2, '0')} value={`${i + 1}`.padStart(2, '0')} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedYear}
                    style={isDarkMode ? styles.darkPicker : styles.picker}
                    dropdownIconColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                    <Picker.Item style={isDarkMode ? {backgroundColor: Colors.CHARCOAL, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.ALMOND_TAN, color: Colors.ALMOST_BLACK}} label="Year" value="All" />
                    {[2023, 2024, 2025, 2026].map(year => (
                        <Picker.Item style={isDarkMode ? {backgroundColor: Colors.CHARCOAL, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.ALMOND_TAN, color: Colors.ALMOST_BLACK}} key={year} label={year.toString()} value={year.toString()} />
                    ))}
                </Picker>
            </View>

            <FlatList
                style={styles.scrollContainer}
                data={filteredEntries()}
                renderItem={renderItem}
                keyExtractor={(item) => item[0].toString()}
            />

            <SpeedDial
                isOpen={open}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                onOpen={() => setOpen(!open)}
                onClose={() => { setOpen(false); clearSelectedEntry(); }}
                buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                style={styles.speedDial}
            >
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
                    title="Add"
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                    onPress={() => {
                        setEditingEntry(null); // Reset editingEntry for new entry
                        setModalVisible(true); // Open modal to add new entry
                    }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="export" size={24} color="white" />}
                    title="Export"
                    //onPress={handleExport}
                    onPress={() => {
                        if (selectedEntry) {
                            handleExport(selectedEntry);
                        }
                        else {
                            Alert.alert("Select an Entry to export.");
                        }
                    } }
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="pencil" size={24} color="white" />}
                    title="Edit"
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                    onPress={() => {
                        if (selectedEntry) {
                            setEditPressed(true)
                            openModalForEdit(selectedEntry);
                        } else {
                            Alert.alert("Select an entry to edit.");
                        }
                    }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="delete" size={24} color="white" />}
                    title="Delete"
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                    onPress={() => {
                        if (selectedEntry) {
                            handleDelete(); // Delete the selected entry
                        } else {
                            Alert.alert("Select an entry to delete."); // Alert if no entry selected
                        }
                    }}
                />
            </SpeedDial>

            <JournalEntryModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditingEntry(null); // Reset editingEntry when closing the modal
                }}
                onSave={handleSaveEntry}
                journalEntry={editingEntry} // Pass entry to edit
            />
            <NavBar notebookSelected darkMode={isDarkMode} />
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
        backgroundColor: Colors.ALMOND_TAN,
        padding: 5,
        marginBottom: 27,
        marginTop: 20,
        border: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',

    },
    darkEntryContainer: {
        width: '90%',
        // height: '80%',
        backgroundColor: Colors.PERIWINKLE_GRAY,
        padding: 5,
        marginBottom: 27,
        marginTop: 20,
        border: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',

    },
    entryInsideContainer: {
        width: '90%',
        // height: '80%',
        backgroundColor:'white',
        padding: 5,
        marginBottom: 27,
        marginTop: 20,
        border: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',

    },
    darkEntryInsideContainer: {
        width: '90%',
        // height: '80%',
        backgroundColor: Colors.LICHEN,
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
        height: '9%', 
        marginTop: 5,
        marginBotton: 3,
        alignSelf: 'center'
      

    },
    darkFilterContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignContent: 'flex-start',
        width: '100%',
        height: '9%',
        marginTop: 2,
        marginBotton: 3,
        alignSelf: 'center',
       // backgroundColor: 'white',
       // height: '10%'
    },
    picker: { // two drop down elements overall contained in filterContainer
        height: '80%',
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.ALMOND_TAN,
        //marginBottom: 20,
       // marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    darkPicker: {
         height: '80%',
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.CHARCOAL,
        color: Colors.WHITE_SMOKE,
        //marginBottom: 20,
        // marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center'

    },
   
    entryText: {
        fontSize: 16,
        backgroundColor: 'white',
        marginBottom: 5,

    },
    darkText: {
        fontSize: 16,
        backgroundColor: Colors.LICHEN,
        marginBottom: 5,
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
    darkBtnGridContainer: {
        marginHorizontal: "auto",
        width: '100%',
        backgroundColor: Colors.CHARCOAL,
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
    pickerItemStyle: {
        backgroundColor: Colors.SCOTCH_MIST_TAN, 
        color: Colors.ALMOST_BLACK
    },
    pickerItemStyleDark: {
        backgroundColor: Colors.CHARCOAL, 
        color: Colors.WHITE_SMOKE
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
        backgroundColor: Colors.SANTA_GRAY,
        //backgroundColor:'pink',
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		//zIndex: -1,
		height:'90%',
    },
    darkContainer: { // dark mode version of topContainer
        backgroundColor: Colors.BALTIC_SEA,
        //backgroundColor:'pink',
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        //zIndex: -1,
        height: '90%',
    },

	
	oval: {
		backgroundColor: Colors.MALACHITE,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',		
    },
    darkOval: {
        backgroundColor: Colors.MALACHITE,
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
    darkOvals: {
        backgroundColor: Colors.CHARCOAL,
        color: Colors.WHITE_SMOKE,
        //backgroundColor: Colors.ALMOND_TAN,
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
