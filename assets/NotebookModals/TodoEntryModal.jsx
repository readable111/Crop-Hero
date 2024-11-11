import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TodoEntryModal = ({ visible, onClose, onSave, taskID, farmers = [], locations = [], crops = [], taskTypes = [], icons = [], onAddNewTaskType }) => {
    const [taskData, setTaskData] = useState({
        TaskID: taskID || null,
        Comments: '',
        DueDate: '',
        AssignedFarmerID: '',
        LocationID: '',
        CropID: '',
        TaskType: '',
        NewTaskType: '',
        TaskIconPath: '',
        IsCompleted: false,
        CompletedDate: '',
    });

    // Reset form fields when modal is closed or saved
    const resetForm = () => {
        setTaskData({
            TaskID: null,
            Comments: '',
            DueDate: '',
            AssignedFarmerID: '',
            LocationID: '',
            CropID: '',
            TaskType: '',
            NewTaskType: '',
            TaskIconPath: '',
            IsCompleted: false,
            CompletedDate: '',
        });
    };

    const handleDateChange = (type, value) => {
        const dateParts = taskData.DueDate.split(' ');
        let newDate = '';

        if (type === 'month') {
            newDate = `${value} ${dateParts[1] || ''} ${dateParts[2] || ''}`;
        } else if (type === 'day') {
            newDate = `${dateParts[0] || ''} ${value} ${dateParts[2] || ''}`;
        } else if (type === 'year') {
            newDate = `${dateParts[0] || ''} ${dateParts[1] || ''} ${value}`;
        }

        setTaskData(prevData => ({ ...prevData, DueDate: newDate.trim() }));
    };

    const handleChange = (name, value) => {
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleAddTaskType = () => {
        const newTaskType = taskData.NewTaskType.trim();
        if (newTaskType !== '') {
            const uniqueID = `${newTaskType}-${Math.random().toString(36).substr(2, 9)}`;
            taskTypes.push({ id: uniqueID, name: newTaskType });
            handleChange('TaskType', newTaskType);
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

    return (
        <Modal visible={visible} animationType="slide">
            <ScrollView style={styles.modalContainer} contentContainerStyle={styles.scrollContent}>

                {/* Assigned Farmer Picker */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Assigned Farmer</Text>
                    <Picker
                        selectedValue={taskData.AssignedFarmerID}
                        onValueChange={(itemValue) => handleChange('AssignedFarmerID', itemValue)}
                        style={styles.picker}
                    >
                        {farmers && farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <Picker.Item key={farmer.id} label={farmer.name} value={farmer.id} />
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
                        onValueChange={(itemValue) => handleChange('LocationID', itemValue)}
                        style={styles.picker}
                    >
                        {locations && locations.length > 0 ? (
                            locations.map((location) => (
                                <Picker.Item key={location.id} label={location.name} value={location.id} />
                            ))
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
                        {crops && crops.length > 0 ? (
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
                        onValueChange={(itemValue) => handleChange('TaskType', itemValue)}
                        style={styles.picker}
                    >
                        {taskTypes && taskTypes.length > 0 ? (
                            taskTypes.map((taskType) => (
                                <Picker.Item key={taskType.id} label={taskType.name} value={taskType.id} />
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
                            selectedValue={taskData.DueDate.split(' ')[0] || 'January'}
                            onValueChange={(itemValue) => handleDateChange('month', itemValue)}
                            style={styles.datePicker}
                        >
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                <Picker.Item key={month} label={month} value={month} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData.DueDate.split(' ')[1] || '1'}
                            onValueChange={(itemValue) => handleDateChange('day', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(31)].map((_, i) => (
                                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData.DueDate.split(' ')[2] || `${new Date().getFullYear()}`}
                            onValueChange={(itemValue) => handleDateChange('year', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(21)].map((_, i) => (
                                <Picker.Item key={i} label={`${new Date().getFullYear() + i}`} value={`${new Date().getFullYear() + i}`} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Task Icon Picker with Icons */}
                <View style={styles.iconPickerContainer}>
                    <Text style={styles.label}>Task Icon</Text>
                    <Picker
                        selectedValue={taskData.TaskIconPath}
                        onValueChange={(itemValue) => handleChange('TaskIconPath', itemValue)}
                        style={styles.picker}
                    >
                        {icons && icons.length > 0 ? (
                            icons.map((icon) => (
                                <Picker.Item
                                    key={icon.value}
                                    label={
                                        <View style={styles.iconItem}>
                                            {icon.icon}
                                        </View>
                                    }
                                    value={icon.value}
                                />
                            ))
                        ) : (
                            <Picker.Item label="No icons available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Comments Section */}
                <View style={styles.listContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Comments"
                        value={taskData.Comments}
                        onChangeText={text => handleChange('Comments', text)}
                    />
                </View>

                {/* Save and Cancel buttons */}
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={handleCancel} />
                    <Button title="Save" onPress={handleSave} />
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
        marginBottom: 15,
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


