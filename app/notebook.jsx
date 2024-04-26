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
	
} from 'react-native'
import moment from 'moment'
import date from 'moment'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { Tab, TabView, ListItem, Card,Button, Icon} from '@rneui/themed';
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { Switch } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'

const Notebook = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState([false, false]); // constant for checked to-do list under ListItems from RNE
	{/*constants for date input*/ }
	//const mask = '[00]{-}[00]{-}[0000]'
	// date constants --months
	const [month, setMonth] = useState([ 
		{ label: 'Jan', value: 'january' },  // watering task
		{ label: 'Feb', value: 'feburary' }, // planning task tag
		{ label: 'March', value: 'march' },  // rake task tag icon
		{ label: 'April', value: 'april' },  // shovel for digging task icon
		{ label: 'May', value: 'may' },   // tool icon tag for needed to build/fix something
		{ label: 'June', value: 'june' },  // watering task
		{ label: 'July', value: 'july' }, // planning task tag
		{ label: 'Aug', value: 'august' },  // rake task tag icon
		{ label: 'Sept', value: 'september' },  // shovel for digging task icon
		{ label: 'Oct', value: 'october' },   // tool icon tag for needed to build/fix something
		{ label: 'Nov', value: 'november' },  // watering task
		{ label: 'Dec', value: 'december' }, // planning task tag

	]);
	const [open, setOpen] = useState(false);
	month, setMonth = useState('january'); {/*must initialize with string of value from items list to assign a default option*/ }
	const [value, setValue] = useState('watering-can'); {/*must initialize with string of value from items list to assign a default option*/ }
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
	//givenDate=""
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }
	return (
		<View style={styles.topContainer }>
			{/*create the default phone status bar at the top of the screen*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*top row of buttons*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>
					
					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="To-Do" specifiedStyle={styles.ovals} onPress={() => router.push('/todo') } />
						
					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.oval} onPress={() => router.push('/notebook')} />
					</Col>
				</Row>
				
				
			</View>
			<ScrollView style={styles.scroll}>
				<View style={styles.fstContainer}>
					{/**trying this*/}
					<View style={styles.btnGridContainerDate}>
						{/*row for profile settings*/}
						<Row height={80}>

							<Col relativeColsCovered={2} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								<DropDownPicker
									open={open}
									value={value}
									items={month}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setMonth}
									disableBorderRadius={true}
									listMode='SCROLLVIEW'
									backgroundColor={Colors.SCOTCH_MIST_TAN}
									dropDownDirection='BOTTOM'
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
										alignSelf: 'flex-start',
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

							</Col>
							<Col relativeColsCovered={2} alignItems='left'>
								
							</Col>
						</Row>


					</View>
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
					<AppButton specifiedStyle={{marginTop: 0, zIndex:5, alignItems: "flex-end"}} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
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
		alignSelf:'center'
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
		height:20
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
		marginBottom: -15
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
		padding:2
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
		height:'13%'
		//height: 20,
		
		

	}
})

export default Notebook;



				
				
