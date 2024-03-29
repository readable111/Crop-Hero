import { useCallBack, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Alert,
	ScrollView
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Switch } from 'react-native-elements'
import { CheckBox } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'


const EditProfile = () =>{ 
	{/*retrieve software version from package.json*/}
	var pkg = require('../package.json')
	const softwareVersion = pkg.version

	{/*create the isDarkMode flag for later use*/}
	const [isDarkMode, setIsDarkMode] = useState(false)

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
    	{label: 'Farmer Joe', value: 'farmer joe'},
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
	<ScrollView style = {styles.container}>
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
        {/*top row of buttons*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					{/*create the arrow to unwind the stack and go back one page*/}
					<AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.back()}/>
				</Col>
				<Col relativeColsCovered={8} alignItems='center'>
					<Text style={styles.pageTitle}>Settings</Text>
				</Col>
				<Col relativeColsCovered={2} alignItems='center'>
				</Col>
			</Row>
		</View>
		{/*user preferences section*/}
		<Text style={styles.categoryTitle}>User Preferences</Text>
		<View style={{alignItems:'center'}}>
			<View style={styles.settingsCategory}>
				{/*light/dark mode toggle*/}
				<Row height={70} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Light/Dark Mode</Text>
						<Text style={styles.settingsDesc}>Toggle between light mode (left) and dark mode (right)</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: set dark mode across multiple pages*/}
						<Switch 
							value={isDarkMode} 
							onValueChange={() => setIsDarkMode((previousState) => !previousState)}
							thumbColor={Colors.IRISH_GREEN}
							trackColor={{false: Colors.SOFT_GREEN, true: Colors.MALACHITE}}
						></Switch>
					</Col>
				</Row>
				{/*divider line*/}
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				{/*toggle between default crop visibility */}
				<Row height={70} >
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
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				{/*enable push notifications toggle*/}
				<Row height={70} >
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
				<Row height={50} specifiedStyle={{marginTop: -20,}}>
					<Col relativeColsCovered={9} alignItems='center' >
					<Text style={(hasNotificationsEnabled) ? {
							fontFamily: 'WorkSans-Regular',
							fontSize: 12,
							marginTop: 0,
							paddingTop: 0,
							color: Colors.IRISH_GREEN,
						} : {
							fontFamily: 'WorkSans-Regular',
							fontSize: 12,
							fontStyle: 'italic',
							marginTop: 0,
							paddingTop: 0,
							color: 'black',
						}}>
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
							size={15}
							uncheckedColor={Colors.SANTA_GRAY}
							checkedColor={Colors.IRISH_GREEN}
							containerStyle={{backgroundColor: Colors.SCOTCH_MIST_TAN}}
						/>
					</Col>
				</Row>
				<Row height={50} specifiedStyle={{marginTop: -20,}}>
					<Col relativeColsCovered={9} alignItems='center' >
						<Text style={(hasNotificationsEnabled) ? {
							fontFamily: 'WorkSans-Regular',
							fontSize: 12,
							marginTop: 0,
							paddingTop: 0,
							color: Colors.IRISH_GREEN,
						} : {
							fontFamily: 'WorkSans-Regular',
							fontSize: 12,
							fontStyle: 'italic',
							marginTop: 0,
							paddingTop: 0,
							color: 'black',
						}}>
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
							size={15}
							uncheckedColor={Colors.SANTA_GRAY}
							checkedColor={Colors.IRISH_GREEN}
							containerStyle={{backgroundColor: Colors.SCOTCH_MIST_TAN}}
						/>
					</Col>
				</Row>
			</View>
		</View>
		{/*user preferences section*/}
		<Text style={styles.categoryTitle}>Account Details</Text>
		<View style={{alignItems:'center'}}>
			<View style={styles.settingsCategory}>
				{/*select current former*/}
				<Row height={70} >
					<Col relativeColsCovered={7} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Current Farmer</Text>
						<Text style={styles.settingsDesc}>Select current farmer from the list or type in new name and select italic version</Text>
					</Col>
					<Col relativeColsCovered={5} alignItems='center'>
						{/*TODO: get selected result and store it if it was new*/}
						<DropDownPicker
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
								fontSize: 10
							}}
							listItemLabelStyle={{
								fontFamily: 'WorkSans-Regular',
								fontSize: 16
							}}
							searchPlaceholder='Search/Add...'
							addCustomItem={true}
						/>
					</Col>
				</Row>
				{/*divider line*/}
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				{/*allow account sync across multiple devices*/}
				<Row height={65} >
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
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				{/*display policies that user has agreed to*/}
				<Row height={40} >
					<Col relativeColsCovered={9} alignItems='flex-start' >
						<Text style={styles.settingsTitle}>Terms of Service</Text>
						<Text style={styles.settingsDesc}>Read Terms of Service</Text>
					</Col>
					<Col relativeColsCovered={3} alignItems='center'>
						{/*TODO: generate code to sync account via QR code, 60s code, etc.*/}
						<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => router.push('/termsofservice')}/>
					</Col>
				</Row>
				<Row height={45} >
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
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				{/*display app version as specified in package.json*/}
				<Row height={30} >
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
	},
	categoryTitle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 20,
		marginTop: 10,
		marginLeft: 39,
	},
	settingsCategory: {
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		width: '90%',
		height: 270,
		borderRadius: 12,
		flex: 12, // # of columns
		paddingLeft: 15,
		paddingRight: 5,
	},
	settingsTitle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		marginBottom: 0,
		paddingBottom: 0,
	},
	settingsDesc: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 12,
		marginTop: 0,
		paddingTop: 0,
	},
	settingsDescDisabled: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 12,
		marginTop: 0,
		paddingTop: 0,
		color: 'red',
	},
})

export default EditProfile;
