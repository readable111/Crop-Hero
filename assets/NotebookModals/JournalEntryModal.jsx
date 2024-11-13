// Journal Entry Modal
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalEntryModal = ({ visible, onClose, onSave, journalEntry }) => {
    const [entryID, setEntryID] = useState(null);
    const [contents, setContents] = useState('');
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2024');
    const [isNewEntry, setIsNewEntry] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

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
   /* useEffect(() => {
        
        if (journalEntry) {
            //const EntryDate = journalEntry.EntryDate || '';
            //const dateString = entry.EntryDate; // e.g., "01301995"
            if (!entryID) {
                setEntryID(journalEntry.EntryID);
            }
            setIsNewEntry(false); 
            setContents(journalEntry.Contents);
            setDay(journalEntry.EntryDate.parseInt(substring(8, 10), 10));
            setMonth(journalEntry.EntryDate.parseInt(substring(5, 7), 10));
            setYear(journalEntry.EntryDate.parseInt(substring(0, 5), 10));
        } else {
            setIsNewEntry(true);
            setEntryID(null);
            setContents('');
            setDay('01');
            setMonth('01');
            setYear(new Date().getFullYear().toString());
        }
    }, [journalEntry]);
   */
    useEffect(() => {
        if (journalEntry) {
            if (!entryID) {
                setEntryID(journalEntry.EntryID);
            }
            setIsNewEntry(false);
            setContents(journalEntry.Contents);

            // Assuming EntryDate is in "MM/DD/YYYY" format
            const dateString = journalEntry.EntryDate; // Example: "01/01/2024"

            if (dateString && dateString.length === 10) { // Ensure it's in "MM/DD/YYYY" format
                const [month, day, year] = dateString.split('/'); // Split by "/"
                setDay(day); // Set day
                setMonth(month); // Set month
                setYear(year); // Set year
            } else {
                // Handle cases where EntryDate might be in an invalid format or empty
                setDay('01');
                setMonth('01');
                setYear(new Date().getFullYear().toString()); // Set current year as default
            }
        } else {
            // Reset to defaults if no journal entry
            setEntryID(null);
            setContents('');
            setDay('01');
            setMonth('01');
            setYear(new Date().getFullYear().toString());
        }
    }, [journalEntry]);
    const handleSave = () => {
        // Create a new Date object // check this for date error
        const entryDate = new Date(year, month -1, day); // month is 0-indexed

        const entryData = {
            EntryID: entryID,
            Contents: contents,
            EntryDate: entryDate.toISOString(), // Convert to ISO string for consistent formatting; 
        };

        const jsonData = JSON.stringify(entryData);
        onSave(entryID, jsonData);
        console.log(entryDate);
        onClose();
    };
    //const screenWidth = Dimensions.get('window').width;
    return (
        <Modal visible={visible} animationType="slide">
            <View style={isDarkMode ? {backgroundColor: Colors.BALTIC_SEA, height: '100%'} : {backgroundColor: Colors.SANTA_GRAY, height: '100%'}}>
                <View style={[styles.modalContainer, isDarkMode && styles.darkModalContainer]}>
                    <Text style={[styles.title, isDarkMode && styles.darkText]}>Journal Entry</Text>

                    <View style={[styles.dateContainer, isDarkMode && styles.dateContainerDark]}>
                        <Text style={styles.dateLabel}>Entry Date:</Text>
                        <View style={[styles.datePicker, isDarkMode && styles.darkDatePicker]}>
                            <Picker
                                selectedValue={month}
                                style={styles.picker}
                                dropdownIconColor={Colors.CHARCOAL}
                                onValueChange={(itemValue) => setMonth(itemValue)}
                            >
                                {[...Array(12).keys()].map((i) => (
                                    <Picker.Item style={isDarkMode ? {backgroundColor: Colors.LICHEN, color: Colors.CHARCOAL} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={i} label={(i + 1).toString().padStart(2, '0')} value={(i + 1).toString().padStart(2, '0')} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={day}
                                style={styles.picker}
                                dropdownIconColor={Colors.CHARCOAL}
                                onValueChange={(itemValue) => setDay(itemValue)}
                            >
                                {[...Array(31).keys()].map((i) => (
                                    <Picker.Item style={isDarkMode ? {backgroundColor: Colors.LICHEN, color: Colors.CHARCOAL} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={year}
                                style={styles.picker}
                                dropdownIconColor={Colors.CHARCOAL}
                                onValueChange={(itemValue) => setYear(itemValue)}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <Picker.Item style={isDarkMode ? {backgroundColor: Colors.LICHEN, color: Colors.CHARCOAL} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={i} label={(new Date().getFullYear() + i).toString()} value={(new Date().getFullYear() + i).toString()} />
                                ))}
                            </Picker>
                            
                        </View>
                    </View>

                    <View style={styles.entryContainer}>
                        <Text style={[styles.entryLabel, isDarkMode && styles.darkText]}>Entry:</Text>
                        <TextInput
                            style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]}
                            value={contents}
                            onChangeText={setContents}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        width: '100%',
        marginBottom: 15,
    },
    entryLabel: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'Domine-Regular',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: Colors.ALMOND_TAN,
        margin: 20,
        elevation: 10,
    },
    darkModalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: Colors.RIVER_BED,
        margin: 20,
        elevation: 10,
        elevation: 10,
        color: 'white'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Domine-Regular',
    },
    dateLabel: {
        paddingLeft: 10,
    },
    dateContainer: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: Colors.PERIWINKLE_GRAY,
    },
    dateContainerDark: {
        backgroundColor: Colors.LICHEN,
    },
    datePicker: {
        flexDirection: 'row',
       // justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        //paddingHorizontal: 5, // Reduced padding
        backgroundColor: Colors.PERIWINKLE_GRAY,
        borderRadius: 5,
    },
    darkDatePicker: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        //paddingHorizontal: 5, // Reduced padding
        backgroundColor: Colors.LICHEN,
        borderRadius: 5,
    },
    picker: {
        //width: '30%', // Increased width for better visibility,
        //justifyContent: 'space-between',
        //paddingHorizontal: 0,
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end'
        
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 15,
        width: '100%',
        borderRadius: 5,
        backgroundColor: Colors.PERIWINKLE_GRAY,
        fontFamily: 'Domine-Regular',
    },
    inputDark: {
        backgroundColor: Colors.LICHEN,
    },
    textArea: {
        height: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.PERIWINKLE_GRAY,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Domine-Regular',
    },
});

export default JournalEntryModal;

