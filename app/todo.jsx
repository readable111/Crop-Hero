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
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Col, Row } from '../assets/Grid.jsx';
import Colors from '../assets/Color';
import AppButton from '../assets/AppButton.jsx';
import { SpeedDial } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar from '../assets/NavBar.jsx';
import TodoEntryModal from '../assets/NotebookModals/TodoEntryModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const todo = () => {
    const [index, setIndex] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTaskID, setCurrentTaskID] = useState(null);
    const [filter, setFilter] = useState('all');
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [farmers, setFarmers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [crops, setCrops] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    const [items, setItems] = useState([
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Not Completed', value: 'notCompleted' },
        { label: 'Last 3 Entries', value: 'last3Entries' }
    ]);
    const [isDarkMode, setIsDarkMode] = useState(false)
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
    const handleExport = (task) => {
        if (!task) {
            Alert.alert('No task selected for export');
            return;
        }
        // Implement your export logic here, e.g., save to file, send to server, etc.
        console.log("Exporting task:", task);
    };
    const handleAddTask = () => {
        const maxTaskID = tasks.length > 0 ? Math.max(...tasks.map(task => task.TaskID)) : 0;
        const newTaskID = maxTaskID + 1;
        const newTask = {
            TaskID: newTaskID,
            AssignedFarmerID: '',
            TaskType: '',
            LocationID: '',
            CropID: '',
            Comments: '',
            DueDate: '',
            IsCompleted: false,
            DateCompleted: null,
        };

        setCurrentTaskID(newTaskID);
        setCurrentTask(newTask); // Initialize the new task
        setModalVisible(true);
    };

    const handleSaveTask = (taskData) => {
        if (currentTaskID) {
            const updatedTasks = tasks.map(task =>
                task.TaskID === currentTaskID ? { ...task, ...taskData } : task
            );
            setTasks(updatedTasks);
        } else {
            setTasks([...tasks, { ...taskData, TaskID: tasks.length + 1 }]);
        }
        setModalVisible(false);
    };

    const handleTaskLongPress = (task) => {
        setCurrentTask(task);
        setCurrentTaskID(task.TaskID);
        setIsSpeedDialOpen(true);
    };

    const handleEditTask = () => {
        if (currentTask) {
            setModalVisible(true);
        }
        setIsSpeedDialOpen(false);
    };

    useEffect(() => {
        switch (value) {
            case 'last3Entries':
                setFilteredTasks(tasks.slice(-3));
                break;
            case 'completed':
                setFilteredTasks(tasks.filter(task => task.IsCompleted));
                break;
            case 'notCompleted':
                setFilteredTasks(tasks.filter(task => !task.IsCompleted));
                break;
            default:
                setFilteredTasks(tasks);
                break;
        }
    }, [value, tasks]);

    const handleTaskTap = (task) => {
        setCurrentTask(task);
        setModalVisible(true);
    };

    const handleDeleteTask = (taskID) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', onPress: () => {
                        const updatedTasks = tasks.filter(task => task.TaskID !== taskID);
                        setTasks(updatedTasks);
                        setFilteredTasks(updatedTasks);
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleCheckboxChange = async (taskID) => {
        const taskToUpdate = tasks.find(task => task.TaskID === taskID);
        const updatedTask = {
            ...taskToUpdate,
            IsCompleted: !taskToUpdate.IsCompleted,
        };

        const updatedTasks = tasks.map(task =>
            task.TaskID === taskID ? updatedTask : task
        );

        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

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
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={styles.dropdownContainer}
                />
            </View>
            <View style={styles.FlatListView}>
                <FlatList
                    data={filteredTasks}
                    keyExtractor={item => item.TaskID.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.taskContainer, { opacity: item.IsCompleted ? 0.6 : 1 }]}
                            onPress={() => handleTaskTap(item)}
                            onLongPress={() => handleTaskLongPress(item)}
                        >
                            <Text>Assigned Farmer ID: {item.AssignedFarmerID}</Text>
                            <Text>Task Type: {item.TaskType}</Text>
                            <Text>Location ID: {item.LocationID}</Text>
                            <Text>Comments: {item.Comments}</Text>
                            <Text>Due Date: {item.DueDate}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <SpeedDial
                isOpen={isSpeedDialOpen}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                onOpen={() => setIsSpeedDialOpen(true)}
                onClose={() => setIsSpeedDialOpen(false)}
                buttonStyle={{ backgroundColor: 'green' }}
                style={styles.speedDial}
            >
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
                    title="Add Task"
                    onPress={handleAddTask}
                    buttonStyle={{ backgroundColor: 'green' }}
                />
                <SpeedDial.Action
                    icon={{ name: 'edit', color: 'white' }}
                    title="Edit Task"
                    onPress={handleEditTask}
                    buttonStyle={{ backgroundColor: 'green' }}
                />
                <SpeedDial.Action
                    icon={{ name: 'check', color: 'white' }}
                    title="Mark Complete"
                    onPress={() => handleCheckboxChange(currentTask?.TaskID)}
                    buttonStyle={{ backgroundColor: 'green' }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="export" size={24} color="white" />}
                    title="Export"
                    onPress={() => handleExport(currentTask)}
                    buttonStyle={{ backgroundColor: 'green' }}
                />
                <SpeedDial.Action
                    icon={{ name: 'delete', color: 'white' }}
                    title="Delete Task"
                    onPress={() => handleDeleteTask(currentTask?.TaskID)}
                    buttonStyle={{ backgroundColor: 'green' }}
                />
            </SpeedDial>

            <TodoEntryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveTask}
                taskID={currentTaskID}
                farmers={farmers}
                locations={locations}
                crops={crops}
                taskTypes={taskTypes}
                taskData={currentTask}
            />

            <NavBar notebookSelected />
        </View>
    );
};

const styles = StyleSheet.create({
    FlatListView: {
        backgroundColor: 'green',
        zIndex: 500,
        width: '100%'
    },
    belowFilter: {
        backgroundColor: 'pink',
        height: '90%',
    },
    btnGridContainer: {
        marginHorizontal: "auto",
        width: '100%',
        backgroundColor: Colors.ALMOND_TAN,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        height: '13%',
    },
    scroll: {
        width: '100%',
        backgroundColor: 'transparent',
        height: '80%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.ALMOND_TAN,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        zIndex: 1000,
        marginTop: 5,
        marginBottom: 3
    },
    dropdownContainer: {
        width: '70%',
        marginHorizontal: '15%',
    },
    taskContainer: {
        backgroundColor: Colors.WHITE_SMOKE,
        padding: 15,
        margin: 10,
        borderRadius: 8,
        elevation: 5,
    },
    speedDial: {
        position: 'absolute',
        bottom: 60,
        right: 5,
        //color: Colors.HOT_GREEN,
        //flex: 5,
        zIndex: 1000,
        flexDirection: 'vertical'
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
    topContainer: { // overall page container
        backgroundColor: Colors.PERIWINKLE_GRAY,
        //backgroundColor:'pink',
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        //zIndex: -1,
        height: '90%',
    },
});

export default todo;
