{/*McKenna Beard for IT Capstone 2024  UNT To-do Page as apart of the notebook tab on the nav bar*/ }
{/*This page can only be accessed after clicking on the notebook page from the main nav bar*/ }
import { React, useState } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	Text,
	Image,
	Alert,
	ScrollView,
	TouchableOpacity,
	TextInput,
	log

} from 'react-native'

import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { Tab, TabView, ListItem, Card, Button, Icon,ListItemProps,Avatar, CheckBox, Stack } from '@rneui/themed';
import { Input } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CheckBox } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker'

const todo = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState(true);
	const toggleCheckbox = () => setChecked(!checked);
	//const [expanded, setExpanded] = useState(false); // for accordian expansion
	
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
		'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
		'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});

	{/*return an error if the fonts fail to load*/ }
	if (!fontsLoaded && !fontError) {
		return null;
	}
	//place holder variables for todo tasks when testing
	initialFirstName = ""
	givenDate = ''
	taskOne = ""
	taskTwo = ""
	taskThree = ""
	taskTitle = ""
	//givenDate=""
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }

		//const listItemProps = {};
		//const renderRow = ({ item }: { item }) => {
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
						<AppButton title="To-do" specifiedStyle={styles.oval} onPress={() =>  router.push('/todo') } /> 

					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						{/*Button to switch to notebook page*/ }
						<AppButton title="Notebook" specifiedStyle={styles.ovals} onPress={() => router.push('/notebook')} />
					</Col>
				</Row>


			</View>
			{/*start of scrolling section of the page---------------------------------------------------------------------------------*/ }
			<ScrollView style={styles.scroll}>
				<View style={styles.fstTryContainer}>
						{/**trying this-dropdown picker for icon selection*/}
						<DropDownPicker
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							disableBorderRadius={true}
							listMode='SCROLLVIEW'
							backgroundColor={Colors.SCOTCH_MIST_TAN }
							dropDownDirection='BOTTOM'
							showTickIcon={false}
							
							props={{
								activeOpacity: 1,
							}}
							scrollViewProps={{
								nestedScrollEnabled: true,
								borderColor: 'clear',
								zIndex: 1000,
							}}
							labelStyle={{
								fontFamily: 'WorkSans-Regular',
								fontSize: 16,
							}}
							listItemLabelStyle={{
								fontFamily: 'WorkSans-Regular',
								fontSize: 16,
							}}
							containerStyle={{
								width: '20%',
								zIndex: 900,
								marginBottom: -80,
								alignSelf: 'flex-end',
								marginHorizontal: 20,
								backgroundColor: Colors.SCOTCH_MIST_TAN,
								borderColor: 'clear'
							}}
							dropDownContainerStyle={{
								borderWidth: 0,
								zIndex: 900,
								backgroundColor: Colors.SCOTCH_MIST_TAN,
								borderColor: 'clear',
								
							}}
							style={{
								borderWidth: 0,
								backgroundColor: Colors.SCOTCH_MIST_TAN,
								borderColor: 'clear',
							}}
						/>
						<Input
							inputContainerStyle={styles.inputBox}
							inputStyle={styles.inputBoxStyle}
							selectionColor={Colors.SANTA_GRAY}
							placeholder='Things to do'
							defaultValue={taskTitle}
							maxLength={256}
							multiline={true}
							textAlign="flex-start"
						/>
						
					{/* checkboxes for to-do list*/}
					<View style={styles.checkBoxFormat}>
						<Row height={100}>
							<Col relativeColsCovered={1} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								{/*Button to switch to To-do page*/}
								<CheckBox
									checked={check1}
									onPress={() => setCheck1(!check1)}
									iconType="material-community"
									checkedIcon="checkbox-outline"
									uncheckedIcon={'checkbox-blank-outline'}
									checkedColor={Colors.IRISH_GREEN}
									uncheckedColor='black'
									backgroundColor='clear'
									containerStyle={styles.checkBoxContainer }
								/>

							</Col>
							<Col relativeColsCovered={3} alignItems='center'>
								<Input
									inputContainerStyle={styles.inputBoxCheck}
									inputStyle={styles.inputBoxStyleTry}
									selectionColor={Colors.SANTA_GRAY}
									placeholder='Things to schedule'
									defaultValue={taskOne}
									autoComplete='name'
									maxLength={256}
									multiline={true}
									textAlign="flex-start"
								/>
							</Col>
						</Row>
						<Row height={100}>

							<Col relativeColsCovered={1} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								{/*Button to switch to To-do page*/}
								<CheckBox
									checked={check2}
									onPress={() => setCheck2(!check2)}
									iconType="material-community"
									checkedIcon="checkbox-outline"
									uncheckedIcon={'checkbox-blank-outline'}
									checkedColor={Colors.IRISH_GREEN}
									uncheckedColor='black'
									backgroundColor='clear'
									containerStyle={styles.checkBoxContainer}
								/>

							</Col>
							<Col relativeColsCovered={3} alignItems='center'>
								<Input
									inputContainerStyle={styles.inputBoxCheck}
									inputStyle={styles.inputBoxStyleTry}
									selectionColor={Colors.SANTA_GRAY}
									placeholder='Things to schedule'
									defaultValue={taskTwo}
									autoComplete='name'
									maxLength={256}
									multiline={true}
									textAlign="flex-start"
								/>
							</Col>
						</Row>
						<Row height={100}>
							<Col relativeColsCovered={1} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								{/*Button to switch to To-do page*/}
								<CheckBox
									checked={check3}
									onPress={() => setCheck3(!check3)}
									iconType="material-community"
									checkedIcon="checkbox-outline"
									uncheckedIcon={'checkbox-blank-outline'}
									checkedColor={Colors.IRISH_GREEN}
									uncheckedColor='black'
									backgroundColor='clear'
									containerStyle={styles.checkBoxContainer}
								/>

							</Col>
							<Col relativeColsCovered={3} alignItems='left'>
								<Input
									inputContainerStyle={styles.inputBoxCheck}
									inputStyle={styles.inputBoxStyleTry}
									selectionColor={Colors.SANTA_GRAY}
									placeholder='Things to schedule'
									defaultValue={taskThree}
									autoComplete='name'
									maxLength={256}
									multiline={true}
									textAlign="flex-start"
								/>
							</Col>
						</Row>
					</View>
					{/* Button below is the edit icon which will open up the text input features in semester 2*/ }
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				{/*Will be try to use rows and coloumns to organize box 2x2-----------------------------------------------------------------------------*/}
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to do'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to do'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to do'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to do'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to do'
						defaultValue={initialFirstName}
						autoComplete='Things I did today...'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: -5, zIndex: 1, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
			</ScrollView>
		</View>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
	checkBoxContainer: {
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		paddingBottom: 30,
    },
	fstContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		padding: 5,
		marginBottom: 27,
		marginTop: 20,
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center',
		//height: '90%'
	},
	fstTryContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		padding: 5,
		marginBottom: 5,
		marginTop: 10,
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center',
		height: 'auto'
    },
	gridContainerInput: {
		flex: 2,
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		border: 2,
		borderRadius: 5,
		borderColor: 'black',
		width: '90%',
		alignSelf: 'center'
    },
	checkBoxFormat: {
		width: '90%',
		border: 1,
		borderRadius: 5,
		backgroundColor: Colors.SCOTCH_MIST_TAN,
  },
	scroll: {
		width: '100%',
		height: '100%'
	},
	topContainer: {
		backgroundColor: Colors.PERIWINKLE_GRAY,
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		zIndex: -1,
		height: 20
	},
	inputBox: {
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'black',
		overflow: 'hidden',
		borderBottomWidth: 2,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		zIndex: 5,
		flex: 3,
		marginTop: 35,
		marginBottom: -15, 
		width: '70%',
		paddingLeft: 5,
	},
	inputDateStyle: {
		paddingBottom: 20,
	},
	inputBoxStyleTry: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		height: '80%',
		padding: 2,
	},
	inputBoxStyleCheck: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		height: '80%',
		width: '50%',
	},
	inputBoxStyleTry: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		height: '80%',
		padding: 2
	},
	inputBoxStyleCheck: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		//paddingLeft: 1,
		height: '80%',
		//padding: 2
		width: '50%',
		//lineHeight: 50
		borderColor: 'black'
	},
	inputBoxStyle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		padding: 2,
		height: '80%',
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
	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
	},
	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
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




