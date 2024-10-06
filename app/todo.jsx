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
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color'
import AppButton from '../assets/AppButton.jsx'
import { Input,CheckBox,SpeedDial } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import NavBar from '../assets/NavBar.jsx'
import { fetchTasks, updateTaskInDatabase } from './database'; // Import your database functions
import TodoModalEntry from '../assets/NotebookModals/TodoEntryModal';

const todo = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	//const [expanded, setExpanded] = useState(false); // for accordian expansion
// blocks are as follows
//last completed
//due soon
//rest
//filters by: crop type, task type, farmer assigned, date, complete/not complete
// need to use bitmask stored in string, with check boxes, first digit is filter 1, 10000
	
	{/*Constants for icon drop down menu*/ }
	const [items, setItems] = useState([ //potential subscription model stuff
		{ label: '', value: 'watering-can', icon: () => <MaterialCommunityIcons name="watering-can" size={40} color="blue" /> },  // watering task
		{ label: '', value: 'calender', icon: () => <MaterialCommunityIcons name="calendar" size={40} color="black" /> }, // planning task tag
		{ label: '', value: 'rake', icon: () => <MaterialCommunityIcons name="rake" size={40} color={Colors.IRISH_GREEN} /> },  // rake task tag icon
		{ label: '', value: 'shovel', icon: () => <MaterialCommunityIcons name="shovel" size={40} color="black" /> },  // shovel for digging task icon
		{ label: '', value: 'tools', icon: () => <MaterialCommunityIcons name="tools" size={40} color="black" /> },   // tool icon tag for needed to build/fix something
	]);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('watering-can'); {/*must initialize with string of value from items list to assign a default option*/ }
	{/*constants for checkboxes*/ }
	const [check1, setCheck1] = useState(false);
	const [check2, setCheck2] = useState(false);
	const [check3, setCheck3] = useState(false);
	const [check4, setCheck4] = useState(false);
	const [checked, setChecked] = useState(true);
	const toggleCheckbox = () => setChecked(!checked);

	{/*load in all fonts used for this page*/ }
	const [fontsLoaded, fontError] = useFonts({
		'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
		'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
		'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});

	{/*return an error if the fonts fail to load*/ }
	if (!fontsLoaded && !fontError) {
		return null;
	}
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentTaskID, setCurrentTaskID] = useState(null);
	const [filter, setFilter] = useState('all'); // 'all', 'completed', 'notCompleted'

	useEffect(() => {
		const loadTasks = async () => {
			const fetchedTasks = await fetchTasks(); // Fetch tasks from database
			setTasks(fetchedTasks);
			setFilteredTasks(fetchedTasks);
		};

		loadTasks();
	}, []);

	const handleCheckboxChange = async (taskID) => {
		const updatedTasks = tasks.map(task => {
			if (task.TaskID === taskID) {
				const now = new Date();
				const month = String(now.getMonth() + 1).padStart(2, '0');
				const day = String(now.getDate()).padStart(2, '0');
				const year = now.getFullYear();
				const currentDate = `${month}/${day}/${year}`;

				return {
					...task,
					IsCompleted: true,
					DateCompleted: currentDate
				};
			}
			return task;
		});

		setTasks(updatedTasks);
		setFilteredTasks(updatedTasks.filter(task => filter === 'completed' ? task.IsCompleted : !task.IsCompleted));

		// Update database
		await updateTaskInDatabase(taskID, { IsCompleted: true, DateCompleted: currentDate });
	};

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter);
		if (newFilter === 'completed') {
			setFilteredTasks(tasks.filter(task => task.IsCompleted));
		} else if (newFilter === 'notCompleted') {
			setFilteredTasks(tasks.filter(task => !task.IsCompleted));
		} else {
			setFilteredTasks(tasks);
		}
	};

	const handleAddTask = () => {
		setCurrentTaskID(null); // Set to null for creating new task
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
	return (
		<View style={styles.topContainer}>
			{/*create the default phone status bar at the top of the screen-------------------------------------*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*Button Grid for switching between Notebook and todo pages---------------------------------------*/ }
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>

					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						{/*Button to switch to To-do page*/ }
						<AppButton title="To-Do" specifiedStyle={styles.oval} onPress={() =>  router.replace('/todo') } /> 

					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						{/*Button to switch to notebook page*/ }
						<AppButton title="Notebook" specifiedStyle={styles.ovals} onPress={() => router.replace('/notebook')} />
					</Col>
				</Row>


			</View>
			{/*start of scrolling section of the page---------------------------------------------------------------------------------*/ }
			<View style={styles.container}>
				<View style={styles.filterContainer}>
					<Button title="All" onPress={() => handleFilterChange('all')} />
					<Button title="Completed" onPress={() => handleFilterChange('completed')} />
					<Button title="Not Completed" onPress={() => handleFilterChange('notCompleted')} />
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
					{/* Additional actions can be added here */}
				</SpeedDial>

				{/* TaskModal component to be rendered here */}
				{modalVisible && <TaskModal taskID={currentTaskID} onClose={() => setModalVisible(false)} />}
			</View>
			<NavBar notebookSelected/>
		</View>
	)
};

{/*define all of the custom styles for this page*/ }
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
	
	scroll: {
		width: '100%',
		height: '100%'
	},
	topContainer: {
		backgroundColor: Colors.SANTA_GRAY,
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		zIndex: -1,
		height: 20
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
	
	//style for the grid layout
	btnGridContainer: {
		//flex: -1, // # of columns
		marginHorizontal: "auto",
		width: '100%',
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1,
		height: '13%'
	}
})

export default todo;








