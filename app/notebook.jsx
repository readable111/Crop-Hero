{/*McKenna Beard for IT Capstone 2024  UNT Notebook Page as apart of the notebook tab on the nav bar--last updated 10_2_2024*/ }
{/*This  page is meant to keep track of what was done that day for future reference if needed*/ }

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
import DropDownPicker from 'react-native-dropdown-picker'
import NavBar from '../assets/NavBar'
import taskModal from '.../assets/NotebookModals/JournalEntryModal'

const Notebook = () => {
	{/*constants for date input*/ }
	//const mask = '[00]{-}[00]{-}[0000]'
	// date constants --months
	const [items, setItems] = useState([ 
		{ label: 'Jan', value: 'january' },  
		{ label: 'Feb', value: 'feburary' }, 
		{ label: 'March', value: 'march' },  
		{ label: 'April', value: 'april' }, 
		{ label: 'May', value: 'may' },  
		{ label: 'June', value: 'june' }, 
		{ label: 'July', value: 'july' }, 
		{ label: 'Aug', value: 'august' }, 
		{ label: 'Sept', value: 'september' }, 
		{ label: 'Oct', value: 'october' }, 
		{ label: 'Nov', value: 'november' }, 
		{ label: 'Dec', value: 'december' }, 
	]);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('january'); {/*must initialize with string of value from items list to assign a default option*/ }
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
	//place holder variables for notebook entries
	entryTwo = "2. Had a delivery of fertilizer, it was placed to the right of the hugel mound. This will be great for spring refresh."
	entryThree = "3. Was able to complete list of todo items for the upcoming week. Will be looking into new crops to plant in the upcoming season."
	entryFour = "4. Updated storage on seed packets, will locate them in building next to the chicken coop. May need to build new organization options."
	entryFive = "5. Made plans for new storage space for upcoming plants. Will begin to assemble task list for upcoming weeks to complete tasks needed."
	entrySix = "6. Created an entire new building today with the C&C machine (test specials)"
	entrySeven = "7. Today was cold. The greenhouses remained at around 70 degrees upon checking. Went through upcoming crops that need planting."
	
	
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }
	return (
		<View style={styles.topContainer }>
			{/*create the default phone status bar at the top of the screen----------------------------------------------------------------------*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*two top circle buttons that swap between todo page and notebook page -------------------------------------------------------------*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>
					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="To-Do" specifiedStyle={styles.ovals} onPress={() => router.replace('/todo') } />
					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.oval} onPress={() => router.replace('/notebook')} />
					</Col>
				</Row>
			</View>
					{/*Month selector for notebook entries (to be connected to database)-----------------------------------------------------*/}
					<View style={styles.btnGridContainerDate}>
						{/*row for profile settings*/}
						<Row height={20}>
							<Col relativeColsCovered={2} alignItems='left'>
								{/* <Text style={styles.pageTitle}>Settings</Text>*/}
								<DropDownPicker
									open={open}
									value={value}
									items={items}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setItems}
									disableBorderRadius={true}
									listMode='SCROLLVIEW'
									backgroundColor={Colors.SCOTCH_MIST_TAN}
									dropDownDirection='BOTTOM'
									props={{
										activeOpacity: 1,
									}}
									scrollViewProps={{
										nestedScrollEnabled: false,
										borderColor: 'black',
										zIndex: 800
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
										zIndex: 900,
										marginBottom: 50, // height away from top of container
										marginTop: 10,
										alignSelf: 'flex-start',
										backgroundColor: Colors.SCOTCH_MIST_TAN,
										borderColor: 'black',
										border:1
										
									}}
									dropDownContainerStyle={{
										borderWidth: 1,
										zIndex: 1000,
										backgroundColor: 'white',
										borderColor: 'black',
										width: 150

									}}
									style={{
										borderWidth: 1,
										borderRadius: 5,
										height: 40,
										backgroundColor: Colors.SCOTCH_MIST_TAN,
										borderColor: 'clear',
										width: 150,
										marginTop: 20,
										zIndex: 900
									}}
								/>

							</Col>
							<Col relativeColsCovered={2} alignItems='left'>
								{/*Hold space for year selector for semester 2 --*/ }
							</Col>
						</Row>

			{/*Modal display*/ }
			<View>
					<JournalEntryModal
						modalVisible={true}
						//onBackPress={ }

					/>

					
			</View>

			</View>
			{/*start of scroll viewing portion to scroll between the entries made for the month-----------------------------------------------------*/ }
			<ScrollView style={styles.scroll}>
				
				<View style={styles.fstContainer}>
					<Input
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='Things I did today...'
						defaultValue={entrySix}
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
		padding: 5,
		marginBottom: 27,
		marginTop: 20,
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf:'center'
    },
	scroll: {
		width: '100%'
	},
	btnGridContainerDate: {
		zIndex: 1000,
		marginHorizontal: 20,
		marginBottom: 30,
    },
	topContainer: {
		backgroundColor: Colors.PERIWINKLE_GRAY,
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
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
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		paddingLeft: 5,
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
		padding:2
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
		marginHorizontal: "auto",
		width: '100%',
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1,
		height:'13%'
	}
})

export default Notebook;



				
				
