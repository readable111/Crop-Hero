// journal Entry Modal
// McKenna Beard
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../Color';

const JournalEntryModal = ({ visible, onClose, onSave, journalEntry }) => {
    const [entryID, setEntryID] = useState(null);
    const [contents, setContents] = useState('');
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2024');

    // Use useEffect to update state when journalEntry changes (for editing mode)
    useEffect(() => {
        if (journalEntry) {
            // If editing an existing entry, retain the EntryID
            if (!entryID) {  // Only set EntryID if it is null
                setEntryID(journalEntry.EntryID);
            }
            setContents(journalEntry.Contents);
            setDay(journalEntry.EntryDate.slice(2, 4));  // Extract day from EntryDate
            setMonth(journalEntry.EntryDate.slice(0, 2)); // Extract month from EntryDate
            setYear(journalEntry.EntryDate.slice(4));      // Extract year from EntryDate
        } else {
            // If adding a new entry, reset the form
            setEntryID(null); // Reset EntryID when adding a new entry
            setContents(null);
            setDay('01');
            setMonth('01');
            setYear(new Date().getFullYear().toString());
        }
    }, [journalEntry]);  // Trigger useEffect when journalEntry changes

    const handleSave = () => {
        const entryDate = `${month}${day}${year}`; // Combine to MMDDYYYY
        const entryData = {
            EntryID: entryID,
            Contents: contents,
            EntryDate: entryDate,
        };

        // Convert entryData to JSON format
        const jsonData = JSON.stringify(entryData);

        // Call onSave to save or edit the entry
        onSave(entryID, jsonData);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Journal Entry</Text>

                <View style={styles.dateContainer}>
                    <Text>Entry Date:</Text>
                    <View style={styles.datePicker}>
                        <Picker
                            selectedValue={month}
                            style={styles.picker}
                            onValueChange={(itemValue) => setMonth(itemValue)}
                        >
                            {[...Array(12).keys()].map((i) => (
                                <Picker.Item key={i} label={(i + 1).toString().padStart(2, '0')} value={(i + 1).toString().padStart(2, '0')} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={day}
                            style={styles.picker}
                            onValueChange={(itemValue) => setDay(itemValue)}
                        >
                            {[...Array(31).keys()].map((i) => (
                                <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={year}
                            style={styles.picker}
                            onValueChange={(itemValue) => setYear(itemValue)}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <Picker.Item key={i} label={(new Date().getFullYear() + i).toString()} value={(new Date().getFullYear() + i).toString()} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.entryContainer}>
                    <Text style={styles.entryLabel}>Entry:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={contents}
                        onChangeText={setContents}
                        multiline
                        textAlignVertical="top"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        width: '100%',          // Ensures full width container
        marginBottom: 15,       // Space below the input
    },
    entryLabel: {
        alignSelf: 'flex-start', // Aligns label to the left
        fontSize: 16,            // Adjust the font size as needed
        fontFamily: 'Domine-Regular',
        marginBottom: 5,         // Space between label and text input
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: Colors.ALMOND_TAN,
        margin: 20,
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: Colors.PERIWINKLE_GRAY
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Domine-Regular',
    },
    dateContainer: {
        alignSelf: 'flex-start', // Align to the left
        marginBottom: 15,
        fontFamily: 'Domine-Regular',
    },
    datePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.PERIWINKLE_GRAY,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        fontFamily: 'Domine-Regular',
    },
    picker: {
        width: 100,
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
        borderWidth: 1
    },
    cancelButton: {
        backgroundColor: Colors.PERIWINKLE_GRAY, // Customize cancel button color
    },
    saveButton: {
        backgroundColor: Colors.PERIWINKLE_GRAY, // Customize save button color
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Domine-Regular',
    },
});

export default JournalEntryModal;
