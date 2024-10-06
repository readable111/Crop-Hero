/****
 * @author McKenna Beard
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * UNT To-do Page as apart of the notebook tab on the nav bar
 * This page can only be accessed after clicking on the notebook page from the main nav bar
 ***/

{/*McKenna Beard for IT Capstone 2024  UNT To-do Page as apart of the notebook tab on the nav bar*/ }
{/*This page can only be accessed after clicking on the notebook page from the main nav bar*/ }
import { React, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Alert,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Button,
    Text
} from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Col, Row } from '../assets/Grid.jsx';
import Colors from '../assets/Color';
import AppButton from '../assets/AppButton.jsx';
import { SpeedDial } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar from '../assets/NavBar.jsx';
//import { fetchTasks, updateTaskInDatabase, insertTaskIntoDatabase } from './database'; // Import your database functions
import TodoModalEntry from '../assets/NotebookModals/TodoEntryModal';

const todo = () => {
    const [index, setIndex] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTaskID, setCurrentTaskID] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'notCompleted'

    // Load fonts
    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await fetchTasks(); // Fetch tasks from database
            setTasks(fetchedTasks);
            setFilteredTasks(fetchedTasks);
        };

        loadTasks();
    }, []);

    const handleAddTask = () => {
        // Find the maximum TaskID
        const maxTaskID = tasks.length > 0 ? Math.max(...tasks.map(task => task.TaskID)) : 0;

        // Create a new task object
        const newTaskID = maxTaskID + 1; // Increment TaskID
        const newTask = {
            TaskID: newTaskID,
            AssignedFarmerID: '', // Set these to default or user input
            TaskType: '',
            LocationID: '',
            CropID: '',
            Comments: '',
            DueDate: '',
            IsCompleted: false,
            DateCompleted: null,
        };

        // Open the modal with the new task data for editing
        setCurrentTaskID(newTaskID);
        setModalVisible(true);
    };

    const handleEditTask = (taskID) => {
        setCurrentTaskID(taskID); // Set task ID for editing
        setModalVisible(true);
    };

    const handleDeleteTask = async (taskID) => {
        const updatedTasks = tasks.filter(task => task.TaskID !== taskID);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);

        // Also delete from database
        // await deleteTaskFromDatabase(taskID);
    };

    const handleCheckboxChange = async (taskID) => {
        // Find the task to update
        const taskToUpdate = tasks.find(task => task.TaskID === taskID);

        // Toggle the IsCompleted status
        const updatedTask = {
            ...taskToUpdate,
            IsCompleted: !taskToUpdate.IsCompleted,
        };

        // Update the task in the database
        await updateTaskInDatabase(taskID, updatedTask);

        // Update local state
        const updatedTasks = tasks.map(task =>
            task.TaskID === taskID ? updatedTask : task
        );

        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    const updateTask = async (task) => {
        if (task.TaskID) {
            // Update existing task logic
            await updateTaskInDatabase(task.TaskID, task);
        } else {
            // Create new task
            await insertTaskIntoDatabase(task);
        }

        // Update local state
        const updatedTasks = [...tasks.filter(t => t.TaskID !== task.TaskID), task]; // Replace the task if it exists
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    return (
        <View style={styles.topContainer}>
            <StatusBar backgroundColor={Colors.WHITE_SMOKE} />
            <View style={styles.btnGridContainer}>
                <Row height={80}>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="To-Do" specifiedStyle={styles.oval} onPress={() => router.replace('/todo')} />
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="Notebook" specifiedStyle={styles.ovals} onPress={() => router.replace('/notebook')} />
                    </Col>
                </Row>
            </View>

            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Button title="All" onPress={() => setFilter('all')} />
                    <Button title="Completed" onPress={() => setFilter('completed')} />
                    <Button title="Not Completed" onPress={() => setFilter('notCompleted')} />
                </View>

                <ScrollView>
                    <FlatList
                        data={filteredTasks}
                        keyExtractor={item => item.TaskID.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.taskContainer}>
                                <Text>Assigned Farmer ID: {item.AssignedFarmerID}</Text>
                                <Text>Task Type: {item.TaskType}</Text>
                                <Text>Location ID: {item.LocationID}</Text>
                                <Text>Crop ID: {item.CropID}</Text>
                                <Text>Comments: {item.Comments}</Text>
                                <Text>Due Date: {item.DueDate}</Text>
                                <TouchableOpacity onPress={() => handleCheckboxChange(item.TaskID)}>
                                    <Text style={{ color: item.IsCompleted ? 'green' : 'red' }}>
                                        {item.IsCompleted ? 'Completed' : 'Not Completed'}
                                    </Text>
                                </TouchableOpacity>
                                <Button title="Edit" onPress={() => handleEditTask(item.TaskID)} />
                                <Button title="Delete" onPress={() => handleDeleteTask(item.TaskID)} />
                            </View>
                        )}
                    />
                </ScrollView>

                <SpeedDial
                    isOpen={modalVisible}
                    icon={{ name: 'edit', color: 'white' }}
                    openIcon={{ name: 'close', color: 'white' }}
                    onOpen={() => setModalVisible(true)}
                    onClose={() => setModalVisible(false)}
                    buttonStyle={styles.speedDial}
                >
                    <SpeedDial.Action
                        icon={{ name: 'add', color: 'white' }}
                        title="Add Task"
                        onPress={handleAddTask}
                    />
                    <SpeedDial.Action
                        icon={{ name: 'edit', color: 'white' }}
                        title="Edit Task"
                        onPress={handleEditTask} // Implement selection logic
                    />
                    <SpeedDial.Action
                        icon={{ name: 'delete', color: 'white' }}
                        title="Delete Task"
                        onPress={handleDeleteTask} // Implement selection logic
                    />
                </SpeedDial>

                {/* TaskModal component to be rendered here */}
                {modalVisible && 
                    <TodoModalEntry 
                        taskID={currentTaskID} 
                        onClose={() => setModalVisible(false)} 
                        onUpdate={updateTask} // Pass update function to modal
                    />
                }
            </View>
            <NavBar notebookSelected />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    taskContainer: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
    speedDial: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    topContainer: {
        backgroundColor: Colors.SANTA_GRAY,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        zIndex: -1,
        height: 20,
    },
    oval: {
        backgroundColor: Colors.IRISH_GREEN,
        width: 180,
        height: 180,
        borderRadius: 180 / 2,
        paddingTop: 120,
        marginTop: -90,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Domine-Regular',
    },
    ovals: {
        backgroundColor: Colors.LIGHT_GOLD,
        width: 180,
        height: 180,
        borderRadius: 180 / 2,
        paddingTop: 120,
        marginTop: -90,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Domine-Regular',
    },
});

export default todo;
