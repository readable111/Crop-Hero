import { React, useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Alert,
    FlatList,
    Modal,
    TouchableOpacity,
    Text,
    Appearance
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
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const [editTask, setEditTask] = useState(false)
    const [saveTask, setSaveTask] = useState(false)
    const [newTask, setNewTask] = useState({})
    const [addNewTask, setAddNewTask] = useState(false)
    const [crops, setCrops] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    const [items, setItems] = useState([
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Not Completed', value: 'notCompleted' },
        { label: 'Last 3 Entries', value: 'last3Entries' }
    ]);
    const clearSelectedEntry = () => {
        setCurrentTask(null); // Reset the selected entry
        //taskData.Comments('');
    };

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
            // error catch
            .catch(console.error);
    }, [])
    const handleExport = (task) => {
        if (!task) {
            Alert.alert('No task selected for export');
            return;
        }
        // export function
        console.log("Exporting task:", task); // checking for task exit
    };

    const handleSaveTask = (taskData) => {

        // Format date fields in MMDDYYYY before saving, assuming taskData.date exists
     //   if (taskData["fld_t_DateDue"]) {
       //     const date = new Date(taskData.date);
         //   const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${date.getFullYear()}`;
           // taskData["fld_t_DateDue"] = formattedDate;
       // }
        console.log("TaskData to set New Task Data to: \n\n", taskData,"\n\n")
        if (currentTaskID!==null){
            if(!taskData["fld_t_IsCompleted"]){
                setNewTask({
                    ...taskData,
                    "fld_t_DateCompleted":"1990-01-01" 
                })
            }else{  
            setNewTask(taskData)
            }
            setEditTask(true)
            setSaveTask(true)
        } else {
            if(!taskData["fld_t_IsCompleted"]){
                setNewTask({
                    ...taskData,
                    "fld_t_DateCompleted":"1990-01-01" 
                })
            }else{  
            setNewTask(taskData)
            }
            setAddNewTask(true)
            setSaveTask(true)            
        }

        //onEditTask(updatedTask);
        setModalVisible(false);  // Close the modal
        setCurrentTaskID(null);  // Reset the task ID
        setIsSpeedDialOpen(false);
    };

    const handleTaskLongPress = (task) => {
        setCurrentTask(task);
        setCurrentTaskID(task[0]);
        
        setIsSpeedDialOpen(true);
    };

    const handleEditTask = () => {
        if (currentTask) {

            setModalVisible(true);
        }
        //setIsSpeedDialOpen(false);
    };

    useEffect(() => {
        switch (value) {
            case 'last3Entries':
                setFilteredTasks(tasks.slice(-3));
                break;
            case 'completed':
                 setFilteredTasks(tasks.filter(task => task[5] == 1));
                break;
            case 'notCompleted':
                setFilteredTasks(tasks.filter(task => task[5] == 0));
                break;
            default:
                setFilteredTasks(tasks);
                break;
        }
    }, [value, tasks]);

   // const handleTaskTap = (task) => {
     //   setCurrentTask(task);
       // setModalVisible(true);
    //};
    const iconData = [
        { label: 'Watering', value: 'watering-can-outline', icon: 'watering-can-outline' },
        { label: 'Planning', value: 'calendar', icon: 'calendar' },
        { label: 'Rake', value: 'rake', icon: 'rake' },
        { label: 'Shovel', value: 'shovel', icon: 'shovel' },
        { label: 'Tools', value: 'tools', icon: 'tools' },
        { label: 'Beehive', value: 'beehive-outline', icon: 'beehive-outline' },
        { label: 'Egg', value: 'egg-fried', icon: 'egg-fried' },
        { label: 'Cow', value: 'cow', icon: 'cow' },
        { label: 'Pig', value: 'pig-variant-outline', icon: 'pig-variant-outline' },
        { label: 'Turkey', value: 'turkey', icon: 'turkey' },
        { label: 'Fence', value: 'fence', icon: 'fence' },
        { label: 'Wrench', value: 'wrench-outline', icon: 'wrench-outline' },
        { label: 'Tractor', value: 'tractor-variant', icon: 'tractor-variant' },
        { label: 'Cowboy', value: 'account-cowboy-hat-outline', icon: 'account-cowboy-hat-outline' },
        { label: 'Scissors', value: 'scissors-cutting', icon: 'scissors-cutting' },
        { label: 'Wheelbarrow', value: 'wheel-barrow', icon: 'wheel-barrow' },
    ];
    const getIconByPath = (iconPath) => {
        const icon = iconData.find(item => item.value === iconPath);
        return icon ? icon.icon : 'alert-circle-outline'; // Default fallback icon
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
    const handleOpenModal = (task) => {
        setCurrentTask(task);  // Set the task to edit (pass all the task data)
        setModalVisible(true);  // Open the modal
    };


    const handleCheckboxChange = (taskData) => {
        const monthMap = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
            "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
            "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };

        // Split the current date parts or default to current year
        const date = new Date(taskData[6])
        const dateDue = date.toISOString().slice(0,10)

        const today = new Date();
        const dateDone = today.toISOString().slice(0,10);

        // Construct ISO format date (YYYY-MM-DD)


        setNewTask({
            "fld_t_TaskID_pk": taskData[0],
            "fld_t_Comments": taskData[8],
           "fld_t_DateDue": dateDue,
            "fld_fs_FarmerID_fk": taskData[2] ,
            "fld_l_LocationID_fk": taskData[3],
            CropID: '' || '',
           "fld_tt_TaskTypeID_fk": taskData[4],
            NewTaskType: '',
            "fld_t_TaskIconPath": taskData[9],
            "fld_t_IsCompleted": 0b1,
            "fld_t_DateCompleted": dateDone,
        });
        setEditTask(true)
        setSaveTask(true)
    };
    // Function to add a new task type
    const addNewTaskType = (uniqueID, newTaskType) => {
        setTaskTypes([...taskTypes, [uniqueID, 1, newTaskType, newTaskType]]);
    };
    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
    });

    const subID = "sub123"
    const farmerID = 2
    useEffect(()=>{
        const fetchTasks = async () =>{
            try{
                response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listTasksVerbose/${subID}`,{method: 'GET'})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                const data = await response.json()
                setTasks(data)
            }catch(error){
                console.error("Error:", error)
            }
        }
        fetchTasks()
    }, [modalVisible])

    useEffect(() =>{
        const editTasks = async () =>{
            if(editTask & saveTask){
              try{

                    console.log("Task to edit: \n\n", newTask)
                  response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/editTask`,{method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({subID:subID, taskUpdate: newTask, taskID: newTask["fld_t_TaskID_pk"]})})
                  if(!response.ok){
                      console.error("HTTP ERROR:")
                      throw new Error;
                  }

                setEditTask(false)
                setSaveTask(false)
                setCurrentTask({})
                setCurrentTaskID(null)
              }catch(error){
                  console.error("Error:", error)
              }
        }
    }
        editTasks()
    }, [editTask, saveTask])

    useEffect(() =>{
        const saveTasks = async () =>{
            if(saveTask & addNewTask){
                console.log("Task to Add: \n\n\n:". newTask) 
              try{
                  response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addTask`,{method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
                    subID:subID, 
                    newTask: newTask, 
                    taskTypeID:newTask["fld_tt_TaskTypeID_fk"], 
                    farmerID: newTask["fld_fs_FarmerID_fk"], 
                    locationID: newTask["fld_l_LocationID_fk"]
                })})
                  if(!response.ok){
                      console.error("HTTP ERROR:")
                      throw new Error;
                  }
                setAddNewTask(false)
                setSaveTask(false)
                setNewTask({})
                setCurrentTask({})
                setCurrentTaskID(null)
              }catch(error){
                  console.error("Error:", error)
              }
        }
    }
        saveTasks()
    }, [saveTask, newTask])



    useEffect(()=>{
        const fetchLocations = async () =>{
            try{
                response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listLocation/${subID}`,{method: 'GET'})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                const data = await response.json()
                setLocations(data)
            }catch(error){
                console.error("Error:", error)
            }
        }
        fetchLocations()
    }, [subID])

    useEffect(()=>{
        const fetchFarmers = async () =>{
            try{
                response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listFarmers/${subID}`,{method: 'GET'})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                const data = await response.json()
                setFarmers(data)
            }catch(error){
                console.error("Error:", error)
            }
        }
        fetchFarmers()
    }, [])

    useEffect(()=>{
        const fetchTaskTypes = async () =>{
            try{
                response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listTaskTypes/${subID}`,{method: 'GET'})
                if(!response.ok){
                    console.error("HTTP ERROR:")
                    throw new Error;
                }
                const data = await response.json()
                setTaskTypes(data)
            }catch(error){
                console.error("Error:", error)
            }
        }
        fetchTaskTypes()
    }, [])

    if (!fontsLoaded && !fontError) {
        return null;
    }
    //const iconName = getIconByPath(item.iconPath);

    return (
        <View style={[styles.topContainer, isDarkMode && styles.darkTopContainer]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE} />
            <View style={[styles.btnGridContainer, isDarkMode && styles.darkGridContainer]}>
                <Row height={80}>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="To-Do" specifiedStyle={styles.oval} onPress={() => router.replace('/todo')} />
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'>
                        <AppButton title="Notebook" specifiedStyle={[styles.ovals, isDarkMode && styles.ovalsDark]} onPress={() => router.replace('/notebook')} />
                    </Col>
                </Row>
            </View>
            <View style={[styles.container, isDarkMode && styles.darkContainer]}>
                <DropDownPicker
                    theme={isDarkMode ? 'DARK' : 'LIGHT'}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={styles.dropdownContainer}
                    dropDownContainerStyle={isDarkMode && {borderColor: Colors.WHITE_SMOKE, backgroundColor: Colors.IRIDIUM}}
                    style={isDarkMode && {borderColor: Colors.WHITE_SMOKE, backgroundColor: Colors.IRIDIUM}}
                />
            </View>
            <View style={styles.FlatListView}>

                <FlatList
                    data={filteredTasks}
                    //keyExtractor={item => item.TaskID.toString()} // Uncommented keyExtractor
                    renderItem={({ item }) => {
                        //const iconName = getIconByPath(item.iconPath); // Move the variable declaration outside of JSX
                        const iconName = getIconByPath(item.fld_t_TaskIconPath);
                        return (
                            <TouchableOpacity
                                style={[
                                    styles.taskContainer,
                                    isDarkMode && styles.darkTaskContainer,
                                    { opacity: item[5] === 1 ? 0.6 : 1 },
                                ]}
                                onLongPress={() => handleTaskLongPress(item)}
                            >
                                <Text style={[styles.taskItemText, isDarkMode && styles.taskItemTextDark]}>
                                    Assigned Farmer ID: {item[11]}
                                </Text>
                                <Text style={[styles.taskItemText, isDarkMode && styles.taskItemTextDark]}>
                                    Task Type: {item[10]}
                                </Text>
                                <Text style={[styles.taskItemText, isDarkMode && styles.taskItemTextDark]}>
                                    Location ID: {item[12]}
                                </Text>
                                <Text style={[styles.taskItemText, isDarkMode && styles.taskItemTextDark]}>
                                    Comments: {item[8]}
                                </Text>
                                <Text style={[styles.taskItemText, isDarkMode && styles.taskItemTextDark]}>
                                    Due Date: {new Date(item[6]).toISOString().slice(0, 10)}
                                </Text>

                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons
                                        name={iconName}
                                        size={24}
                                        color={isDarkMode ? Colors.WHITE_SMOKE : Colors.BLACK}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />

            </View>
            <SpeedDial
                isOpen={isSpeedDialOpen}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                onOpen={() => setIsSpeedDialOpen(true)}
                //onClose={() => setIsSpeedDialOpen(false)}
                transitionDuration= {0}
                onClose={() => { setIsSpeedDialOpen(false); clearSelectedEntry(); }}
                buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                style={styles.speedDial}
            >
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
                    title="Add Task"
                    onPress={() => {
                        setCurrentTask(null); // Reset current task
                        setCurrentTaskID(null); // Reset currentTaskID to signal new task creation
                        setNewTask(true)
                        setModalVisible(true);
                    }}
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                />
                <SpeedDial.Action
                    icon={{ name: 'edit', color: 'white' }}
                    title="Edit Task"
                    onPress={() => {
                        if (currentTask) {
                            handleOpenModal(currentTask);
                        } else {
                            Alert.alert("Select a task to edit.");
                        }
                    }}
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                />
                <SpeedDial.Action
                    icon={{ name: 'check', color: 'white' }}
                    title="Mark Complete"
                    //onPress={() => handleCheckboxChange(currentTask?.TaskID)}
                    onPress={() => {
                        if (currentTask) {
                            handleCheckboxChange(currentTask);
                        } else {
                            Alert.alert("Select a task to mark as complete.");
                        }
                    }}
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                />
                <SpeedDial.Action
                    icon={<MaterialCommunityIcons name="export" size={24} color="white" />}
                    title="Export"
                   // onPress={() => handleExport(currentTask)}
                    onPress={() => {
                        if (currentTask) {
                            handleExport(currentTask);
                        } else {
                            Alert.alert("Select a task to export.");
                        }
                    }}
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
                />
                <SpeedDial.Action
                    icon={{ name: 'delete', color: 'white' }}
                    title="Delete Task"
                    //onPress={() => handleDeleteTask(currentTask?.TaskID)}
                    onPress={() => {
                        if (currentTask) {
                            handleDeleteTask(currentTask.TaskID);
                        } else {
                            Alert.alert("Select a task to delete.");
                        }
                    }}
                    buttonStyle={{ backgroundColor: Colors.IRISH_GREEN }}
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
                onAddNewTaskType={addNewTaskType}
                initialTaskData={{
                    ...currentTask,
                    date: currentTask?.date ? `${String(currentTask.date).padStart(2, '0')}` : null
                }}
            />

            <NavBar notebookSelected darkMode={isDarkMode} />
        </View>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        backgroundColor: Colors.ALMOND_TAN, // set to a tan color
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',



    },
    darkEntryContainer: {
        backgroundColor: Colors.BALTIC_SEA,
    },
    darkGridContainer: {
        backgroundColor: Colors.CHARCOAL,
    },
    darkContainer: {
        backgroundColor: Colors.CHARCOAL,
    },
    darkTaskContainer: {
        backgroundColor: Colors.IRIDIUM,
    },
    taskItemText: {
        color: Colors.CHARCOAL,
    },
    taskItemTextDark: {
        color: Colors.WHITE_SMOKE,
    },
    darkTopContainer: {
        backgroundColor: Colors.BALTIC_SEA
    },
    FlatListView: {
        //backgroundColor: 'green', // set to transparent
        backgroundColor: 'transparent',
        zIndex: 500,
        width: '85%',
        //borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 5,
        height: '60%',
        marginTop: 2
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
    iconContainer: {
        position: 'absolute',
        top: 10,  // Adjust top and right values as needed
        right: 10,
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
    ovalsDark: {
        backgroundColor: Colors.CHARCOAL,
        color: Colors.WHITE_SMOKE,
    },
    topContainer: { // overall page container
        backgroundColor: Colors.SANTA_GRAY,
        //backgroundColor:'pink',
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        //zIndex: -1,
        height: '90%',
    },
});

export default todo;
