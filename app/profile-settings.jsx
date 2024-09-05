import { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Alert,
	ScrollView,
	Appearance
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Switch } from 'react-native-elements'
import { CheckBox } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'


const SettingsProfile = () =>{ 
	{/*retrieve software version from package.json*/}
	var pkg = require('../package.json')
	const softwareVersion = pkg.version

	{/*create the isDarkMode flag for later use*/}
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		// declare the async data fetching function
		const fetchDarkModeSetting = async () => {
			const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
			let result = null
    		if (JSON_VALUE) {
				result = JSON.parse(JSON_VALUE)
				console.log("Async: " + result)
			} else {
				colorScheme = Appearance.getColorScheme()
				if (colorScheme == 'dark') {
					result = true
				} else {
					result = false
				}
				console.log("Color Scheme: " + result)
				await AsyncStorage.setItem('dark_mode_setting', result.toString())
			}
			setIsDarkMode(result)
		}
	  
		// call the function
		fetchDarkModeSetting()
		  	// make sure to catch any error
		  	.catch(console.error);
	}, [])

	{/*create the private/public flag for later use*/}
	const [hasPublicDefaultVisibility, setHasPublicDefaultVisibility] = useState(false)

	{/*create the notification flags for later use*/}
	const [hasNotificationsEnabled, setHasNotificationsEnabled] = useState(false)
	const [hasTaskNotificationsEnabled, setHasTaskNotificationsEnabled] = useState(false)
	const [hasPaymentNotificationsEnabled, setHasPaymentNotificationsEnabled] = useState(false)

	{/*create the farmer list*/}
	{/*TODO: retrieve farmers from database*/}
	const [open, setOpen] = useState(false);
  	const [value, setValue] = useState(null);
  	const [items, setItems] = useState([
    	{label: 'Zina Townley', value: 'zina townley'},
    	{label: 'Farmer Benjamin Folger-Franklin', value: 'farmer benjamin folger-franklin'}
  	]);

	
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return(
	<ScrollView style = {[styles.container, isDarkMode && styles.containerDark]}>
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
        {/*top row of buttons*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					{/*create the arrow to unwind the stack and go back one page*/}
					<AppButton title="" icon={isDarkMode ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
				</Col>
				<Col relativeColsCovered={8} alignItems='center'>
					<Text style={[styles.pageTitle, isDarkMode && styles.pageTitleDark]}>Settings</Text>
				</Col>
				<Col relativeColsCovered={2} alignItems='center'>
				</Col>
			</Row>
		</View>
		{/*user preferences section*/}
		<Text style={[styles.categoryTitle, isDarkMode && styles.categoryTitleDark]}>User Preferences</Text>
		<View style={{alignItems:'center'}}>
			<View style={[styles.settingsCategory, isDarkMode && styles.settingsCategoryDark]}>
				{/*light/dark mode toggle*/}
				<Row height={80} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={[styles.settingsTitle]}>Light/Dark Mode</Text>
						<Text style={styles.settingsDesc}>Toggle between light mode (left) and dark mode (right)</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: set dark mode across multiple pages*/}
						<Switch 
							value={isDarkMode}
							onValueChange={async (previousState) => { 
								await AsyncStorage.setItem('dark_mode_setting', previousState.toString())
								setIsDarkMode((previousState) => !previousState)
							}}
							thumbColor={Colors.IRISH_GREEN}
							trackColor={{false: Colors.SOFT_GREEN, true: Colors.MALACHITE}}
						></Switch>
					</Col>
				</Row>
				{/*divider line*/}
				<View style={styles.dividerLine} />
				{/*toggle between default crop visibility */}
				<Row height={90} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Default Visibility</Text>
						<Text style={styles.settingsDesc}>Toggle between private (left) and public (right) for the default visibility</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: set default visibility for crops*/}
						<Switch 
							value={hasPublicDefaultVisibility} 
							onValueChange={() => setHasPublicDefaultVisibility((previousState) => !previousState)}
							thumbColor={Colors.IRISH_GREEN}
							trackColor={{false: Colors.SOFT_GREEN, true: Colors.MALACHITE}}
						></Switch>
					</Col>
				</Row>
				{/*divider line*/}
				<View style={styles.dividerLine} />
				{/*enable push notifications toggle*/}
				<Row height={90} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Push Notifications</Text>
						<Text style={styles.settingsDesc}>Toggle between disabled (left) and enabled (right) push notifications</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: set push notifications settings*/}
						<Switch 
							value={hasNotificationsEnabled} 
							onValueChange={() => setHasNotificationsEnabled(!hasNotificationsEnabled)}
							thumbColor={Colors.IRISH_GREEN}
							trackColor={{false: Colors.SOFT_GREEN, true: Colors.MALACHITE}}
						></Switch>
					</Col>
				</Row>
				<Row height={53} specifiedStyle={{marginTop: -20,}}>
					<Col relativeColsCovered={9} alignItems='center' >
						<Text style={[(hasNotificationsEnabled) ? {
							fontFamily: 'WorkSans-Regular',
							fontSize: 14,
							marginTop: 10,
							paddingTop: 0,
							color: Colors.IRISH_GREEN,
						} : {
							fontFamily: 'WorkSans-Regular',
							fontSize: 14,
							fontStyle: 'italic',
							marginTop: 0,
							paddingTop: 0,
							color: 'black',
						}, isDarkMode && (hasNotificationsEnabled ? {color: Colors.HOT_GREEN} : {color: Colors.ALMOST_BLACK})]}>
							Tasks
						</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center' >
						{/*TODO: set notifications for task reminders*/}
						<CheckBox
							center
							title=""
							disabled={!hasNotificationsEnabled} //If notifications is false or disabled, the disabled attribute is true
							disabledStyle={{backgroundColor: 'yellow', opacity: 0}}
							checked={hasTaskNotificationsEnabled}
							onIconPress={hasNotificationsEnabled ? () => setHasTaskNotificationsEnabled(!hasTaskNotificationsEnabled) : handleDisabledEvent}
							size={25}
							uncheckedColor={Colors.SANTA_GRAY}
							checkedColor={isDarkMode ? Colors.HOT_GREEN : Colors.IRISH_GREEN}
							containerStyle={isDarkMode ? {backgroundColor: Colors.LICHEN} : {backgroundColor: Colors.SCOTCH_MIST_TAN}}
						/>
					</Col>
				</Row>
				<Row height={53} specifiedStyle={{marginTop: -20,}}>
					<Col relativeColsCovered={9} alignItems='center' >
						<Text style={[(hasNotificationsEnabled) ? {
							fontFamily: 'WorkSans-Regular',
							fontSize: 14,
							marginTop: 10,
							paddingTop: 0,
							color: Colors.IRISH_GREEN,
						} : {
							fontFamily: 'WorkSans-Regular',
							fontSize: 14,
							fontStyle: 'italic',
							marginTop: 0,
							paddingTop: 0,
							color: 'black',
						}, isDarkMode && (hasNotificationsEnabled ? {color: Colors.HOT_GREEN} : {color: Colors.ALMOST_BLACK})]}>
							Payments
						</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center' >
						{/*TODO: set notifications for payment reminders*/}
						<CheckBox
							center
							title=""
							disabled={!hasNotificationsEnabled} //If notifications is false or disabled, the disabled attribute is true
							disabledStyle={{backgroundColor: 'yellow', opacity: 0}}
							checked={hasPaymentNotificationsEnabled}
							onIconPress={hasNotificationsEnabled ? () => setHasPaymentNotificationsEnabled(!hasPaymentNotificationsEnabled) : handleDisabledEvent}
							size={25}
							uncheckedColor={isDarkMode ? Colors.PERIWINKLE_GRAY : Colors.SANTA_GRAY}
							checkedColor={isDarkMode ? Colors.HOT_GREEN : Colors.IRISH_GREEN}
							containerStyle={isDarkMode ? {backgroundColor: Colors.LICHEN} : {backgroundColor: Colors.SCOTCH_MIST_TAN}}
						/>
					</Col>
				</Row>
			</View>
		</View>
		{/*user preferences section*/}
		<Text style={[styles.categoryTitle, isDarkMode && styles.categoryTitleDark]}>Account Details</Text>
		<View style={{alignItems:'center'}}>
			<View style={[styles.settingsCategory2, isDarkMode && styles.settingsCategoryDark]}>
				{/*select current former*/}
				<Row height={110} >
					<Col relativeColsCovered={7} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Current Farmer</Text>
						<Text style={styles.settingsDesc}>Select current farmer from the list or type in new name and select italic version</Text>
					</Col>
					<Col relativeColsCovered={5} alignItems='center'>
						{/*TODO: get selected result and store it if it was new*/}
						<DropDownPicker
							theme={isDarkMode ? 'DARK' : 'LIGHT'}
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							listMode='MODAL'
							modalAnimationType='fade'
							searchable={true}
							searchTextInputProps={{
								maxLength: 32
							}}
							labelProps={{
								numberOfLines: 3
							}}
							labelStyle={{
								fontFamily: 'WorkSans-Regular',
								fontSize: 10,
							}}
							listItemLabelStyle={{
								fontFamily: 'WorkSans-Regular',
								fontSize: 16,
							}}
							searchPlaceholder='Search/Add...'
							addCustomItem={true}
							modalContentContainerStyle={isDarkMode && {
								backgroundColor: Colors.BALTIC_SEA,
							}}
						/>
					</Col>
				</Row>
				{/*divider line*/}
				<View style={styles.dividerLine} />
				{/*allow account sync across multiple devices*/}
				<Row height={90} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Account Sync</Text>
						<Text style={styles.settingsDesc}>Generate a code that can be entered into another device to sync account</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: generate code to sync account via QR code, 60s code, etc.*/}
						<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => Alert.alert('Disabled until Phase 2')}/>
					</Col>
				</Row>
				{/*divider line*/}
				<View style={styles.dividerLine} />
				{/*display policies that user has agreed to*/}
				<Row height={60} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Terms of Service</Text>
						<Text style={styles.settingsDesc}>Read Terms of Service</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: generate code to sync account via QR code, 60s code, etc.*/}
						<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => router.push('/termsofservice')}/>
					</Col>
				</Row>
				<Row height={60} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Privacy Policy</Text>
						<Text style={styles.settingsDesc}>Read Privacy Policy</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: generate code to sync account via QR code, 60s code, etc.*/}
						<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => router.push('/privacypolicy')}/>
					</Col>
				</Row>
				{/*divider line*/}
				<View style={styles.dividerLine} />
				{/*display app version as specified in package.json*/}
				<Row height={40} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>App Version</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						<Text style={styles.settingsDesc}>{softwareVersion}</Text>
					</Col>
				</Row>
			</View>
		</View>
	</ScrollView>
    )
};

function handleDisabledEvent(event) {
    event.preventDefault();
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		color: Colors.ALMOST_BLACK,
	},
	containerDark: {
		backgroundColor: Colors.BALTIC_SEA,
		height: '100%',
		color: Colors.WHITE_SMOKE,
	},
    btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 7,
		marginBottom: 10,
	},
	pageTitle: {
		fontFamily: 'Domine-Regular',
		fontSize: 28,
		color: Colors.ALMOST_BLACK,
	},
	pageTitleDark: {
		color: Colors.WHITE_SMOKE,
	},
	categoryTitle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 22,
		marginTop: 10,
		marginLeft: 39,
		color: Colors.ALMOST_BLACK,
	},
	categoryTitleDark: {
		color: Colors.WHITE_SMOKE,
	},
	settingsCategory: {
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		color: Colors.ALMOST_BLACK,
		width: '90%',
		height: 380,
		borderRadius: 12,
		flex: 12, // # of columns
		paddingLeft: 15,
		paddingRight: 5,
		paddingTop: 10,
	},
	settingsCategoryDark: {
		backgroundColor: Colors.LICHEN,
		color: Colors.WHITE_SMOKE,
	},
	settingsCategory2: {
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		color: Colors.ALMOST_BLACK,
		width: '90%',
		height: 440,
		borderRadius: 12,
		flex: 12, // # of columns
		paddingLeft: 15,
		paddingRight: 5,
		paddingTop: 10,
	},
	settingsTitle: {
		color: Colors.ALMOST_BLACK,
		fontFamily: 'WorkSans-Regular',
		fontSize: 18,
		marginTop: 0,
		marginBottom: 0,
		paddingBottom: 0,
	},
	settingsDesc: {
		color: Colors.ALMOST_BLACK,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		marginTop: 0,
		marginBottom: 0,
		paddingTop: 0,
	},
	settingsTitleDark: {
		color: Colors.WHITE_SMOKE,
	},
	settingsDescDark: {
		color: Colors.WHITE_SMOKE,
	},
	settingsDescDisabled: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 12,
		marginTop: 0,
		paddingTop: 0,
		color: 'red',
	},
	dividerLine: {
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 0,
		marginTop: 10,
		marginBottom: 10,
	}
})

export default SettingsProfile;
