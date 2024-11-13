import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Appearance
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoEntryModal = ({
    visible,
    onClose,
    onSave,
    taskID,
    initialTaskData,
    farmers,
    locations,
    crops,
    taskTypes,
    icons,
    onAddNewTaskType,
    
}) => {
    const [taskData, setTaskData] = useState({
        "fld_t_TaskID_pk": taskID || null,
        "fld_t_Comments": '',
        "fld_t_DateDue": '',
        "fld_fs_FarmerID_fk": '',
        "fld_l_LocationID_fk": '',
        CropID: '',
        "fld_tt_TaskTypeID_fk": '',
        NewTask: '',
        "fld_t_TaskIconPath": '',
        "fld_t_IsCompleted": false,
        "fld_t_DateCompleted": '',
    });
    
    useEffect(() => {
        if (!initialTaskData) return; // Guard clause for initialTaskData  
        // Set task data once when the modal opens
        setTaskData({
           "fld_t_TaskID_pk": initialTaskData[0] || taskID,
            "fld_t_Comments": initialTaskData[8] || '',
           "fld_t_DateDue": initialTaskData[6] || '',
            "fld_fs_FarmerID_fk": initialTaskData[2] || '',
            "fld_l_LocationID_fk": initialTaskData[3]|| '',
            CropID: '' || '',
           "fld_tt_TaskTypeID_fk": initialTaskData[4] || '',
            NewTaskType: '',
            "fld_t_TaskIconPath": initialTaskData[9] || '',
            "fld_t_IsCompleted": initialTaskData[5] || 0b0,
            "fld_t_DateCompleted": initialTaskData[7] || '',
        });
    }, [visible]); // Only run when `visible` changes
    console.log("Current Task Data: \n\n",taskData)
    console.log(initialTaskData)
    const handleDateChange = (type, value) => {
        // Splitting DueDate to allow month, day, and year selection
        const dateParts = taskData["fld_t_DateDue"].split(' ');
        let newDate = '';

        if (type === 'month') {
            newDate = `${value} ${dateParts[1] || ''} ${dateParts[2] || ''}`;
        } else if (type === 'day') {
            newDate = `${dateParts[0] || ''} ${value} ${dateParts[2] || ''}`;
        } else if (type === 'year') {
            newDate = `${dateParts[0] || ''} ${dateParts[1] || ''} ${value}`;
        }

        setTaskData(prevData => ({ ...prevData, "fld_t_DateDue": newDate.trim() }));
    };

    const handleChange = (name, value) => {
        console.log(name, value)
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleAddTaskType = () => {
        const newTaskType = taskData.NewTaskType.trim();
        console.log(taskData)
        console.log("New Task Type Trimmed: " + newTaskType)
        if (newTaskType !== '') {
            const uniqueID = `${Math.floor(Math.random()*1000000000).toString()}`;
            const updatedTaskTypes = [...taskTypes, [uniqueID, 1, newTaskType, newTaskType]];
            taskTypes = updatedTaskTypes
            console.log(taskTypes)
            onAddNewTaskType(uniqueID, newTaskType);
            handleChange('TaskType', uniqueID);
            handleChange('NewTaskType', '');
        }
    };

    const handleSave = () => {
        onSave(taskData);
        resetForm();  // Reset form after saving
        onClose();
    };

    const handleCancel = () => {
        resetForm();  // Reset form if the modal is cancelled
        onClose();
    };

    const resetForm = () => {
        setTaskData({
        "fld_t_TaskID_pk": null,
        "fld_t_Comments": '',
        "fld_t_DateDue": '',
        "fld_fs_FarmerID_fk": '',
        "fld_l_LocationID_fk": '',
        CropID: '',
        "fld_tt_TaskTypeID_fk": '',
        NewTask: '',
        "fld_t_TaskIconPath": '',
        "fld_t_IsCompleted": false,
        "fld_t_DateCompleted": 0b0,
        });
    };
       return (
        <Modal visible={visible} animationType="slide">
            <ScrollView style={styles.modalContainer} contentContainerStyle={styles.scrollContent}>

                {/* Assigned Farmer Picker */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Assigned Farmer</Text>
                    <Picker
                        selectedValue={taskData.AssignedFarmerID}
                        onValueChange={(itemValue) => handleChange("fld_fs_FarmerID_fk", itemValue)}
                        style={styles.picker}
                    >
                        {farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <Picker.Item key={farmer[0]} label={farmer[3]} value={farmer[0]} />
                            ))
                        ) : (
                            <Picker.Item label="No farmers available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Location Picker */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Location</Text>
                    <Picker
                        selectedValue={taskData.LocationID}
                        onValueChange={(itemValue) => handleChange("fld_l_LocationID_fk", itemValue)}
                        style={styles.picker}
                    >
                        {locations.length > 0 ? (
                            locations.map((location) => {(
                                <Picker.Item key={location[0]} label={location[4]} value={location[0]} />
                            )
                            console.log(location)
                        })
                        ) : (
                            <Picker.Item label="No locations available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Crop Picker */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Crop</Text>
                    <Picker
                        selectedValue={taskData.CropID}
                        onValueChange={(itemValue) => handleChange('CropID', itemValue)}
                        style={styles.picker}
                    >
                        {crops.length > 0 ? (
                            crops.map((crop) => (
                                <Picker.Item key={crop.id} label={crop.name} value={crop.id} />
                            ))
                        ) : (
                            <Picker.Item label="No crops available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Task Type Picker */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Task Type</Text>
                    <Picker
                        selectedValue={taskData.TaskType}
                        onValueChange={(itemValue) => handleChange("fld_tt_TaskTypeID_fk", itemValue)}
                        style={styles.picker}
                    >
                        {taskTypes.length > 0 ? (
                            taskTypes.map((taskType) => (
                                <Picker.Item key={taskType[0]} label={taskType[3]} value={taskType[0]} />
                            ))
                        ) : (
                            <Picker.Item label="No task types available" value="" />
                        )}
                    </Picker>
                    <TextInput
                        style={styles.input}
                        placeholder="Add New Task Type"
                        value={taskData.NewTaskType}
                        onChangeText={text => handleChange('NewTaskType', text)}
                    />
                    <Button title="Add Task Type" onPress={handleAddTaskType} />
                </View>

                {/* Due Date Section */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Due Date</Text> 
                    <View style={styles.dateRow}>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[0] || 'January'}
                            onValueChange={(itemValue) => handleDateChange('month', itemValue)}
                            style={styles.datePicker}
                            itemStyle={{backgroundColor: Colors.IRISH_GREEN}}
                        >
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                <Picker.Item key={month} label={month} value={month} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[1] || '1'}
                            onValueChange={(itemValue) => handleDateChange('day', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(31)].map((_, i) => (
                                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[2] || `${new Date().getFullYear()}`}
                            onValueChange={(itemValue) => handleDateChange('year', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(21)].map((_, i) => (
                                <Picker.Item key={i} label={`${new Date().getFullYear() + i}`} value={`${new Date().getFullYear() + i}`} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Comments */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Comments</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter comments"
                        value={taskData.Comments}
                        onChangeText={(text) => handleChange("fld_t_Comments", text)}
                        multiline
                    />
                </View>

                {/* Save/Cancel Buttons */}
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Cancel" onPress={handleCancel} color={Colors.cancelButton} />
                </View>

            </ScrollView>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        backgroundColor: Colors.PERIWINKLE_GRAY,
        flex: 1,
        fontFamily: 'Domine-Regular',
        height: '95%'


    },
    listContainer: {
        marginBottom: 20,
        backgroundColor: Colors.ALMOND_TAN,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#fff',
        height: 50,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        fontFamily: 'Domine-Regular',
    },
    iconPickerContainer: {
        marginBottom: 20,
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Domine-Regular',
    },
});

export default TodoEntryModal;
