//modal pop for task entry
import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CROPS from '../../test_data/testCropData.json'
import Colors from '../Color'
import { useFonts } from 'expo-font'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TodoEntryModal = ({ visible, onClose, onSave, taskID, farmers, locations, crops, taskTypes }) => {
    const [taskData, setTaskData] = useState({
        TaskID: taskID || null,
        Comments: '',
        DueDate: '',
        AssignedFarmerID: '',
        LocationID: '',
        CropID: '',
        TaskType: '',
        NewTaskType: '', // New field for additional TaskType
        TaskIconPath: '',
        IsCompleted: false, // Added IsCompleted field
        CompletedDate: '',   // Added CompletedDate field
    });

    // Fetch existing task data if taskID is provideud
    //  useEffect(() => {
    /*if (taskID) {
        const existingTask = {}; // Fetch the task from the database using the taskID
        setTaskData(existingTask);
    }
//    }, [taskID]);},[])*/

    // Function to handle input changes
    const handleChange = (name, value) => {
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };

    // Function to handle save
    const handleSave = () => {
        console.log("Modal Save Pressed:", taskData);
        onSave(taskData);
        onClose();
    };

    // Function to handle adding new TaskType
    const handleAddTaskType = () => {
        if (taskData.NewTaskType.trim() !== '') {
            // Here you would typically also send the new task type to the database.
            // For this example, we just reset the input field.
            taskTypes.push({ id: Date.now(), name: taskData.NewTaskType }); // Simulating addition
            handleChange('TaskType', taskData.NewTaskType); // Set the selected task type to the new one
            handleChange('NewTaskType', ''); // Clear the new task type input
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <View style={styles.optionsContainer}>
                    <View style={styles.attributesContainer }>
                <Text style={styles.title}>Task Details</Text>

                <View style={styles.totalTaskContainer }>    
                    <Text>Task ID</Text>
                    <TextInput
                        value={taskData.TaskID ? taskData.TaskID.toString() : ''}
                        editable={false} // Make TaskID non-editable
                        style={styles.taskIDStyle}
                    />
                </View>
                <View style={styles.totalTaskContainer}>
                    <Text style={styles.PickerTitles }>Assigned Farmer</Text>
                    <Picker
                        selectedValue={taskData.AssignedFarmerID}
                        onValueChange={value => handleChange('AssignedFarmerID', value)}
                        style={styles.picker}
                    >
                                <Picker.Item label="Select Farmer" value="" style={styles.pickerItemStyle } />
                        {farmers.map(farmer => (
                            <Picker.Item key={farmer.id} label={farmer.name} value={farmer.id} />
                        ))}
                    </Picker>
                        </View>
                <View style={styles.totalTaskContainer}>
                    <Text style={styles.PickerTitles}>Location</Text>
                    <Picker
                        selectedValue={taskData.LocationID}
                        onValueChange={value => handleChange('LocationID', value)}
                        style={styles.picker}
                    >
                                <Picker.Item label="Select Location" value="" style={styles.pickerItemStyle} />
                        {locations.map(location => (
                            <Picker.Item key={location.id} label={location.name} value={location.id} />
                        ))}
                    </Picker>
                        </View>
                <View style={styles.totalTaskContainer}>
                    <Text style={styles.PickerTitles}>Crop</Text>
                    <Picker
                        selectedValue={taskData.CropID}
                        onValueChange={value => handleChange('CropID', value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Crop" value="" />
                        {crops.map(crop => (
                            <Picker.Item key={crop.id} label={crop.name} value={crop.id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.totalTaskContainer}>
                <Text style={styles.PickerTitles}>Task Type</Text>
                <Picker
                    selectedValue={taskData.TaskType}
                    onValueChange={value => handleChange('TaskType', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Task Type" value="" />
                    {taskTypes.map(type => (
                        <Picker.Item key={type.id} label={type.name} value={type.id} />
                    ))}
                    <Picker.Item label="Add New Task Type" value="new" />
                </Picker>

                {taskData.TaskType === 'new' && (
                    <View>
                        <TextInput
                            placeholder="Enter new task type"
                            value={taskData.NewTaskType}
                            onChangeText={text => handleChange('NewTaskType', text)}
                            style={styles.input}
                        />
                        <Button title="Add Task Type" onPress={handleAddTaskType} />
                    </View>
                )}
                </View>
                <Text >Comments</Text>
                <TextInput
                    value={taskData.Comments}
                    onChangeText={text => handleChange('Comments', text)}
                    style={styles.input}
                />
                    </View>
                <Text>Due Date</Text>
                <View style={styles.dateContainer}>
                    <Picker
                        selectedValue={taskData.DueDate.split(' ')[0] || 'Month'}
                        onValueChange={itemValue => handleChange('DueDate', `${itemValue} ${taskData.DueDate.split(' ')[1] || ''} ${taskData.DueDate.split(' ')[2] || ''}`)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Month" value="Month" />
                        {/* Add other month options */}
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                            <Picker.Item key={index} label={month} value={month} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={taskData.DueDate.split(' ')[1] || 'Day'}
                        onValueChange={itemValue => handleChange('DueDate', `${taskData.DueDate.split(' ')[0] || ''} ${itemValue} ${taskData.DueDate.split(' ')[2] || ''}`)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Day" value="Day" />
                        {/* Add day options */}
                        {[...Array(31)].map((_, i) => (
                            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={taskData.DueDate.split(' ')[2] || 'Year'}
                        onValueChange={itemValue => handleChange('DueDate', `${taskData.DueDate.split(' ')[0] || ''} ${taskData.DueDate.split(' ')[1] || ''} ${itemValue}`)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Year" value="Year" />
                        {/* Add year options */}
                        {[...Array(21)].map((_, i) => {
                            const year = new Date().getFullYear() + i; // Next 20 years
                            return <Picker.Item key={year} label={`${year}`} value={`${year}`} />;
                        })}
                    </Picker>
                </View>

                <View style={styles.iconPickerContainer}>
                    <Text>Task Icon</Text>
                    <Picker
                        selectedValue={taskData.TaskIconPath}
                        onValueChange={value => handleChange('TaskIconPath', value)}
                        style={styles.iconPicker}
                    >
                        <Picker.Item label="Select Icon" value="" />
                        <Picker.Item label="Watering Can" value="watering-can"/>
                        <Picker.Item label="Calendar" value="calendar" />
                        <Picker.Item label="Rake" value="rake" />
                        <Picker.Item label="Shovel" value="shovel" />
                        <Picker.Item label="Tools" value="tools" />
                    </Picker>
                </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            buttonStyle={{ backgroundColor: 'green' }}
                            title="Cancel" onPress={onClose} />
                        <Button
                            buttonStyle={{ backgroundColor: 'green' }}
                            title="Save" onPress={handleSave} />
                    
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    //pickerItemStyle: {
   //     borderWidth: 1,
      //  borderColor: 'black',
    //    borderRadius: 5,
    //    backgroundColor: Colors.PERIWINKLE_GRAY,
    //    fontFamily: 'Domine-Regular',

   // },
    totalTaskContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        alignSelf: 'center',
        width: '90%',
        height: '12%',
        marginHorizontal: '10%',
        backgroundColor: Colors.PERIWINKLE_GRAY,
        marginBottom: 10,
        paddingHorizontal: 10

    },
    taskIDStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontFamily: 'Domine-Regular',
        backgroundColor: 'white',
        width: 'auto',
        //alignSelf: 'center'
    },
    pickerTitles: {
        fontFamily: 'Domine-Regular',
        fontSize: 20,
        alignSelf: 'center'

    },
    optionsContainer: {
        //flexDirection: 'row'
        backgroundColor: 'pink',
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5

    },
    attributesContainer: {
       //r flexDirection: 'row'
        backgroundColor: Colors.SCOTCH_MIST_TAN,
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        //paddingBottom:20,
        height: '80%'
    },

    modalContainer: {
        flex: 1,
        padding: 20,
       // flexDirection: 'row'
        fontFamily: 'Domine-Regular',
        align: 'center',
        backgroundColor: Colors.RIVER_BED
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Domine-Regular',
        alignSelf:'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        //padding: 10,
        //marginBottom: 15,
        fontFamily: 'Domine-Regular',
        backgroundColor: 'white'
    },
    dateContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        fontFamily: 'Domine-Regular',
        //width: '90%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    picker: { // actuall picker part
        height: 10,
        width: '80%',
        marginBottom: 15,
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5, 
        backgroundColor: 'white',
        zIndex: 500, 
        alignSelf: 'center',
        paddingTop: 5
    },
    iconPickerContainer: {
        alignItems: 'flex-start', // Aligns the icon picker to the right
        flexDirection: 'row',
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    iconPicker: {
        height: 50,
        width: 500,
        //marginBottom: 15,
        fontFamily: 'Domine-Regular',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        display: 'inline'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        fontFamily: 'Domine-Regular',
        backgroundColor: Colors.ALMOND_TAN,
    },
});

export default TodoEntryModal;
