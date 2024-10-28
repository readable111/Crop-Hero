import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Colors from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const TodoEntryModal = ({ visible, onClose, onSave, taskID, farmers, locations, crops, taskTypes, icons, onAddNewTaskType }) => {
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
    const handleAddTaskType = () => {
        if (taskData.NewTaskType.trim() !== '') {
            
            taskTypes.push({ id: Date.now(), name: taskData.NewTaskType }); 
            handleChange('TaskType', taskData.NewTaskType); // Set the selected task type to the new one
            handleChange('NewTaskType', ''); // Clear the new task type input
        }
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
    { /*
    const handleAddTaskType = () => {
        if (taskData.NewTaskType.trim() !== '') {
            // Call the provided function to save the new task type in the database
            onAddNewTaskType(taskData.NewTaskType);
            taskTypes.push({ id: Date.now(), name: taskData.NewTaskType }); // Add new type to the list
            handleChange('TaskType', taskData.NewTaskType); // Set the selected task type to the new one
            handleChange('NewTaskType', ''); // Clear the input field
        }
    };
    */}
    const handleSave = () => {
        onSave(taskData);
        onClose();
    };

    const renderListItem = (item, name) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleChange(name, item.id)}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
    const [items, setItems] = useState([ //potential subscription model stuff
        { label: '', value: 'watering-can', icon: () => <MaterialCommunityIcons name="watering-can" size={40} color="blue" /> },  // watering task
        { label: '', value: 'calender', icon: () => <MaterialCommunityIcons name="calendar" size={40} color="black" /> }, // planning task tag
        { label: '', value: 'rake', icon: () => <MaterialCommunityIcons name="rake" size={40} color={Colors.IRISH_GREEN} /> },  // rake task tag icon
        { label: '', value: 'shovel', icon: () => <MaterialCommunityIcons name="shovel" size={40} color="black" /> },  // shovel for digging task icon
        { label: '', value: 'tools', icon: () => <MaterialCommunityIcons name="tools" size={40} color="black" /> },   // tool icon tag for needed to build/fix something
    ]);
    const [value, setValue] = useState('watering-can'); {/*must initialize with string of value from items list to assign a default option*/ }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                {/* Render FlatLists for Assigned Farmer, Location, Crop, etc. */}
                <View style={styles.listContainer}>
                    <Text>Assigned Farmer</Text>
                    <FlatList
                        data={farmers}
                        renderItem={({ item }) => renderListItem(item, 'AssignedFarmerID')}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                <View style={styles.listContainer}>
                    <Text>Location</Text>
                    <FlatList
                        data={locations}
                        scrollContainer={true }
                        renderItem={({ item }) => renderListItem(item, 'LocationID')}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                <View style={styles.listContainer}>
                    <Text>Crop</Text>
                    <FlatList
                        data={crops}
                        renderItem={({ item }) => renderListItem(item, 'CropID')}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                {/* Task Type Section */}
                <View style={styles.listContainer}>
                    <Text>Task Type</Text>
                    <FlatList
                        data={taskTypes}
                        renderItem={({ item }) => renderListItem(item, 'TaskType')}
                        keyExtractor={item => item.id.toString()}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add New Task Type"
                        value={taskData.NewTaskType}
                        onChangeText={text => handleChange('NewTaskType', text)}
                    />
                    <Button title="Add Task Type" onPress={handleAddTaskType} />
                </View>
                <View>
                    <TextInput
                        value={taskData.Comments}
                        onChangeText={text => handleChange('Comments', text)}
                        style={styles.input}
                    />
                </View>
                {/* Hardcoded date selector */}
                <View style={styles.dateContainer}>
                    <Text>Due Date</Text>
                    <View style={styles.row}>
                        <FlatList
                            data={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                            horizontal
                            scrollContainer={true }
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleDateChange('month', item)}>
                                    <Text style={styles.dateItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                        <FlatList
                            data={[...Array(31)].map((_, i) => `${i + 1}`)}
                            horizontal
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleDateChange('day', item)}>
                                    <Text style={styles.dateItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                        <FlatList
                            data={[...Array(21)].map((_, i) => `${new Date().getFullYear() + i}`)}
                            horizontal
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleDateChange('year', item)}>
                                    <Text style={styles.dateItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                    </View>
                </View>

                {/* Task Icon selector */}
                <View style={styles.iconPickerContainer}>
                    <Text>Task Icon</Text>
                    <FlatList
                        data={items }
                        //data={icons}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleChange('TaskIconPath', item.value)}>
                                <Text style={styles.iconItem}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.value}
                    />
                </View>

                {/* Save and Cancel buttons */}
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onClose} />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        backgroundColor: 'pink',
        flex: 1,
        fontFamily: 'Domine-Regular',
    },
    listContainer: {
        marginBottom: 20,
        backgroundColor: Colors.ALMOND_TAN,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    dateContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        fontFamily: 'Domine-Regular',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dateItem: {
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        flexDirection: 'column',
        fontFamily: 'Domine-Regular',
    },
    iconPickerContainer: {
        marginBottom: 20,
    },
    iconItem: {
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: '5%'
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        fontFamily: 'Domine-Regular',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Domine-Regular',
    },
});

export default TodoEntryModal;


