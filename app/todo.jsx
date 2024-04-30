import { React, useState } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	Alert,
	ScrollView,
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import AppButton from '../assets/AppButton.jsx'
import { Input } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import NavBar from '../assets/NavBar.jsx'

const todo = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState([false, false]); // constant for checked to-do list under ListItems from RNE
	//const [expanded, setExpanded] = useState(false); // for accordian expansion
	{/*constants for date input*/ }
	//const mask = '[00]{-}[00]{-}[0000]'
	{/*Constants for icon drop down menu*/ }
	const [items, setItems] = useState([ //potential subscription model stuff
		{ label: '', value: 'watering-can', icon: () => <MaterialCommunityIcons name="watering-can" size={40} color="blue" /> },  // watering task
		{ label: '', value: 'calender-clock', icon: () => <MaterialCommunityIcons name="calendar-clock" size={40} color="black" /> }, // planning task tag
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


	{/*load in all fonts used for this page*/ }
	const [fontsLoaded, fontError] = useFonts({
		'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
		'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
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
	//givenDate=""
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }

		//const listItemProps = {};
		//const renderRow = ({ item }: { item }) => {
	return (
		<View style={styles.topContainer}>
			{/*create the default phone status bar at the top of the screen*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*top row of buttons*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>

					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="To-Do" specifiedStyle={styles.oval} onPress={() =>  router.push('/todo') } />

					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.ovals} onPress={() => router.push('/notebook')} />
					</Col>
				</Row>


			</View>
			<ScrollView style={styles.scroll}>
				<View style={styles.fstContainer}>
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
							nestedScrollEnabled: false,
							borderColor: 'clear'
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
							width: '23%',
							//marginTop: 58,
							zIndex: 900,
							marginBottom: 50,
							//marginLeft: 260,
							//marginTop: 120
							alignSelf: 'flex-end',
							marginHorizontal: 7,
							//marginBottom: -75,
							//outerHeight: 25
							backgroundColor: 'clear',
							borderColor: 'clear'
						}}
						dropDownContainerStyle={{
							borderWidth: 0,
							//borderColor: 'black',
							//borderRadius: 5,
							zIndex: 900,
							backgroundColor: 'clear',
							borderColor: 'clear'
							
						}}
						style={{
							//borderColor: 'black',
							borderWidth: 0,
							//borderRadius: 5,
							//height: 40,
							backgroundColor: 'clear',
							borderColor: 'clear'
						}}
					/>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things to schedule'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					{/* checkboxes for to-do list*/}
					<View style={styles.checkBoxFormat}>
						
					</View>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
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
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
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
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
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
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
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
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: -5, zIndex: 1, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
			</ScrollView>
			<NavBar notebookSelected/>
		</View>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
	fstContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		//alignItems: "center",
		padding: 5,
		//paddingVertial: 50,
		marginBottom: 27,
		marginTop: 20,
		//paddingTop:40
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center'
	},
	scroll: {
		//flex: 1,
		//marginTop: 20,
		width: '100%'
	},

	topContainer: {
		backgroundColor: Colors.PERIWINKLE_GRAY,
		//height: '100%',
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		//marginBottom: '145%',
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
		//marginTop: -18,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		//paddingLeft: 10,
		//marginBottom: 0,
		zIndex: 5,
		flex: 3,
		marginTop: 35,
		marginBottom: -15, 
		width: '70%'
	},
	inputDateStyle: {
		paddingBottom: 20,

	},
	inputBoxStyle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		//height: 20
		padding: 2
	},

	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		//transform: [{ scaleX: 2 }],
		//marginTop: -250,
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',
		//marginBottom: 20

	},
	ovals: {
		backgroundColor: Colors.ALMOND_TAN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		//transform: [{ scaleX: 2 }],
		//marginTop: -250,
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',
		//marginBottom: 20

	},



	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
		//marginTop: -130,
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
		//marginTop: 12,
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1,
		//marginBottom: -20,
		height: '13%'
		//height: 20,



	}
})

export default todo;




