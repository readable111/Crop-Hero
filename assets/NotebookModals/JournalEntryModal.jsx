// Journal Entry Modal
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import Colors from '../Color'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const JournalEntryModal = ({ visible, onClose, onSave, journalEntry }) => {
    const [entryID, setEntryID] = useState(journalEntry ? journalEntry.EntryID : null);
    const [contents, setContents] = useState(journalEntry ? journalEntry.Contents : '');
    const [day, setDay] = useState(journalEntry ? journalEntry.EntryDate.slice(2, 4) : '01'); // Get day from EntryDate
    const [month, setMonth] = useState(journalEntry ? journalEntry.EntryDate.slice(0, 2) : '01'); // Get month from EntryDate
    //const [year, setYear] = useState(journalEntry ? journalEntry.EntryDate.slice(4) : new Date().getFullYear().toString()); // Get year from EntryDate

    const handleSave = () => {
        const entryDate = `${month}${day}${year}`; // Combine to MMDDYYYY
        const entryData = {
            EntryID: entryID,
            Contents: contents,
            EntryDate: entryDate,
        };

        // Convert entryData to JSON format
        const jsonData = JSON.stringify(entryData);

        // You can now send jsonData to your database or use it as needed
        onSave(entryID, jsonData); // Pass EntryID and JSON string for saving or editing
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
                            {/* Populate months */}
                            {[...Array(12).keys()].map((i) => (
                                <Picker.Item key={i} label={(i + 1).toString().padStart(2, '0')} value={(i + 1).toString().padStart(2, '0')} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={day}
                            style={styles.picker}
                            onValueChange={(itemValue) => setDay(itemValue)}
                        >
                            {/* Populate days */}
                            {[...Array(31).keys()].map((i) => (
                                <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={year}
                            style={styles.picker}
                            onValueChange={(itemValue) => setYear(itemValue)}
                        >
                            {/* Populate years */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <Picker.Item key={i} label={(new Date().getFullYear() + i).toString()} value={(new Date().getFullYear() + i).toString()} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <Text>Contents:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={contents}
                    onChangeText={setContents}
                    multiline
                    textAlignVertical="top" // Align text to top
                />

                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 20,
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    dateContainer: {
        alignSelf: 'flex-start', // Align to the left
        marginBottom: 15,
    },
    datePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    picker: {
        width: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        width: '100%',
        borderRadius: 10,
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
});

export default JournalEntryModal;
