/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

import { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Image, 
	Alert,
	Appearance
} from 'react-native'
import { useFonts } from 'expo-font'
import { router, useLocalSearchParams } from 'expo-router'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid'
import Colors from '../assets/Color'
import Icons from '../assets/icons/Icons'
import AppButton from '../assets/AppButton'
import UploadImage from '../assets/ProfilePageImages/UploadImage'
import {cleanText, cleanNumbers} from '../assets/sanitizer'
import ZipLookup from '../assets/zip_codes.js'; 

const sleep = ms => new Promise(r => setTimeout(r, ms));

const BillingDetailsProfile = () =>{ 
	{/*TODO: retrieve current model*/}
	{/*create the subscription model list*/}
	const subID = "sub123"
	let defaultZip = "76131"
	const [items, setItems] = useState([ //potential subscription model stuff
    	{label: 'Free', value: 'free', testID: 'free'},                   // 1 farmer,No Ambient Weather, No  Export,   10 Crops
    	{label: 'Individual', value: 'individual'},       // 1 farmer,   Ambient Weather, No  Export,   25 Crops
		{label: 'Couple', value: 'couple'},               // 2 farmers,  Ambient Weather, Can Export,   75 Crops
		{label: 'Family', value: 'family'},               // 5 farmers,  Ambient Weather, Can Export,  200 Crops
		{label: 'Professional', value: 'professional'},   // 20 farmers, Ambient Weather, Can Export, 1000 Crops
  	]);
	const [open, setOpen] = useState(false);
  	const [value, setValue] = useState('family'); {/*must initialize with string of value from items list to assign a default option; TODO: retrieve option from database*/}
	const [email, setEmail] = useState('test@example.com');
	const [phoneNum, setPhoneNum] = useState('+1 (012) 345-6789');
	const [zipCode, setZipCode] = useState(defaultZip);
	const [state, setState] = useState('Texas');
	const [savePressed, setSavePressed] = useState(false)
	const [userData, setUserData] = useState({})
	const [isDarkMode, setIsDarkMode] = useState(false)


	useEffect(() => {
		// declare the async data fetching function
	/*	const fetchUsername = async () => {
			firstName = await AsyncStorage.getItem('first_name');
			lastName = await AsyncStorage.getItem('last_name');

			if (!firstName) {
				firstName = "zina"
			}
			if (!lastName) {
				lastName = "townley"
			}

			capitalizedUsername = toTitleCase(firstName + " " + lastName)

			setUsername(capitalizedUsername)
		}*/
		const fetchSubInfo = async () =>{
			try{
				const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/subscriberInfo/${subID}`, {method:'GET'})
				if(!response.ok){
					throw new Error
				}
				const data = await response.json()
				setUserData({
					"fld_s_FirstName": data[1],
					"fld_s_LastName": data[2],
					"fld_s_EmailAddr": data[6],
					"fld_s_StreetAddr": data[7],
					"fld_s_City": data[8],
					"fld_s_PostalCode": data[9],
					"fld_s_PhoneNum": data[10],
					"fld_s_HasAmbientWeather": data[11],
					"fld_s_AmbientWeatherKey": data[12],
				})
				setEmail(data[6])
				setPhoneNum(data[10])
				setZipCode(data[9])
				setState("Texas")
			}catch(err){
      			console.error("Error fetching user data:", err);
			}
		}
	  
		// call the function
		fetchSubInfo()
		  	// make sure to catch any error
		  	.catch(console.warn);
	}, [])



	const handleSave = async () =>{
		//onChangeText={value => {setEmail(cleanText(email, noStopwords=false, noSQL=true));}}
		console.log("save called: ", zipCode)
		let cleanedZip = zipCode
		console.log(cleanedZip)
		if (cleanedZip in ZipLookup) {
			console.log("exists")
			//console.log("Saved. Subscription Model: " + value + "\t Email: " + cleanText(email, noStopwords=false, noSQL=true, textOnly=true) + "\t Phone: " + cleanNumbers(phoneNum, decimalsAllowed=false, negativesAllowed=false, phone=true) + "\t Zip: " + zipCode + "\t State: " + cleanText(state, noStopwords=false, noSQL=true, textOnly=true));
			setUserData({
				...userData,
				"fld_s_EmailAddr": email,
				"fld_s_PostalCode": cleanedZip,
				"fld_s_PhoneNum": phoneNum
			})
			//setSavePressed(true)
			//console.log("Save Pressed: ", savePressed)
			console.log(JSON.stringify(userData))
			const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/updateSubscriberInfo`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({subID:"sub123", subData: userData})})
			console.log("Response ", response)
			if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
			}
			//Necessary until Home page is hooked up
			await AsyncStorage.setItem('zip_code', cleanedZip)
		} else {
			Alert.alert("Zip Code doesn't exist. Default applied.")
			console.log("Saved. Subscription Model: " + value + "\t Email: " + cleanText(email, noStopwords=false, noSQL=true, textOnly=true) + "\t Phone: " + cleanNumbers(phoneNum, decimalsAllowed=false, negativesAllowed=false, phone=true) + "\t Default Zip: " + defaultZip + "\t State: " + cleanText(state, noStopwords=false, noSQL=true, textOnly=true));
			setUserData({
				...userData,
				"fld_s_EmailAddr": cleanText(email, noStopwords=false, noSQL=true, textOnly=true),
				"fld_s_PostalCode": defaultZip,
				"fld_s_PhoneNum": cleanNumbers(phoneNum, decimalsAllowed=false, negativesAllowed=false, phone=true)
			})
			const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/updateSubscriberInfo`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({subID:"sub123", subData: userData})})
			console.log("Response ", response)
			if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
			}
			await AsyncStorage.setItem('zip_code', defaultZip)
		}
	};

	useEffect(() => {
		// declare the async data fetching function
		const fetchZipCode = async () => {
			const val = await AsyncStorage.getItem('zip_code');
			let result = null
    		if (val && val !== "") {
				result = val
			} else {
				result = defaultZip
			}
			setZipCode(result)
		}
	  
		// call the function
		fetchZipCode()
		  	// make sure to catch any error
		  	.catch(console.error);
	}, [])


	/*useEffect(() =>{
		const updateSub = async () =>{
			console.log("updateSub called")
			if(savePressed){
				try{
					console.log("POST called with ", userData)
					const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/updateSubscriberInfo`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(userData)})
					if(!response.ok){
                             throw new Error(`HTTP error! Status: ${response.status}`);
					}
					setSavePressed(false)
				}catch(err){
                        console.error("Error: ", error)
				}
			}
		}
		updateSub()
	}, [savePressed])*/

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

	{/*TODO: retrieve data from local storage or database*/}
	{/*retrieve data and store it in these variables to be displayed as default values in input boxes*/}

	const [fontsLoaded, fontError] = useFonts({
		'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return(
	<View style = {styles.container}>
        {/*create the default phone status bar at the top of the screen*/}
		<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
        {/*top row of buttons*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					{/*create the arrow to unwind the stack and go back one page*/}
					<AppButton testID={"back-arrow"} title="" icon={isDarkMode ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
				</Col>
				<Col relativeColsCovered={8}></Col>
				<Col relativeColsCovered={2}>
					{/*TODO: link save button to get input field contents and save them to the database*/}
					<AppButton testID={"save"} title="" mci="content-save" mciSize={30} mciColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} onPress={handleSave}/>
				</Col>
			</Row>
		</View>
		{/*create container for the purple section*/}
        <View style = {styles.innerContainer}>
			{/*create the oval*/}
			<View style = {[styles.oval, isDarkMode && styles.ovalDark]}></View>
			{/*create container for the rectangular area*/}
			<View style = {[styles.rect, isDarkMode && styles.rectDark]}>
				{/*avatar image and edit button*/}
				<UploadImage style={styles.avatarImg} isEditable={false} />
				{/*subscription model dropdown box*/}
				<Text style={[styles.dropdownInputLabel, isDarkMode && styles.dropdownInputLabelDark]}>Subscription Model</Text>
				<DropDownPicker
					testID={"submodel-dropdown"}
					theme={isDarkMode ? 'DARK' : 'LIGHT'}
					open={open}
					value={value}
					items={items}
					onPress={setOpen}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					disableBorderRadius={true}
					listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
					props={{
						activeOpacity: 1,
					}}
					scrollViewProps={{
						nestedScrollEnabled: true
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
						width: '94%',
						marginTop: -18,
						zIndex: 500,
						marginBottom: 26,
					}}
					dropDownContainerStyle={[{
						borderWidth: 2,
						borderColor: Colors.CHARCOAL,
						backgroundColor: Colors.WHITE_SMOKE,
						borderRadius: 12,
						zIndex: 500,
					}, isDarkMode && {borderColor: Colors.WHITE_SMOKE, backgroundColor: Colors.IRIDIUM}]}
					style={[{
						borderColor: Colors.CHARCOAL,
						borderWidth: 2,
						borderRadius: 12,
						height: 52,
						backgroundColor: Colors.WHITE_SMOKE,
					}, isDarkMode && {borderColor: Colors.WHITE_SMOKE, backgroundColor: Colors.IRIDIUM}]}
				/>
				{/*email input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Email</Text>
				<Input
					testID={"email-input"}
					leftIcon={<AntDesign name="mail" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='test@example.com'
					defaultValue={userData["fld_s_EmailAddr"]}
					autoComplete='email'
					keyboardType='email-address'
					maxLength={384}
					onChangeText={value => {setEmail(value);}}
				/>
				{/*phone number input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Phone No.</Text>
				<Input
					testID={"phone-input"}
					leftIcon={<AntDesign name="phone" size={24} color={Colors.SOFT_GREEN} style={{transform: [{rotateY: '180deg'}]}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='+1 (012) 345-6789'
					defaultValue={userData["fld_s_PhoneNum"]}
					autoComplete='tel'
					keyboardType='phone-pad'
					maxLength={32}
					onChangeText={value => {setPhoneNum(value);}}
				/>
				{/*zip code input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Zip Code</Text>
				<Input
					testID={"zip-input"}
					leftIcon={<Image source={Icons.zip_mail_green} style={{width: 25, height: 25}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='01234'
					defaultValue={userData["fld_s_PostalCode"]}
					autoComplete='postal-code'
					keyboardType='numeric'
					maxLength={16}
					onChangeText={value => {setZipCode(value);}}
				/>
				{/*state input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>State</Text>
				<Input
					testID={"state-input"}
					leftIcon={<Image source={Icons.flag_country_green} style={{width: 25, height: 25}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='Texas'
					defaultValue={state}
					autoComplete='address-line1'
					keyboardType='default'
					maxLength={64}
					onChangeText={value => {setState(value);}}
				/>
			</View>
        </View>
	</View>
    )
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.IRISH_GREEN,
		height: '100%',
	},
    innerContainer: {
        alignItems: 'center',
		overflow: 'hidden',
    },
	oval: {
		backgroundColor: Colors.SANTA_GRAY,
		width: 300,
		height: 420,
		borderRadius: 300 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		transform: [{ scaleX: 2 }],
		marginTop: 60,
		alignItems: 'center',
	},
	rect: {
		backgroundColor: Colors.SANTA_GRAY,
		width: '100%',
		height: 540,
		marginTop: -300,
		alignItems: 'center',
	},
	ovalDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
	rectDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
	avatarImg: {
		marginTop: -100,
		marginBottom: 20,
	},
	inputBox: {
		backgroundColor: Colors.WHITE_SMOKE,
		borderWidth: 2,
		borderRadius: 12,
		borderColor: Colors.CHARCOAL,
		overflow: 'hidden',
		borderBottomWidth: 2,
		marginTop: -18,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		paddingLeft: 10,
		marginBottom: 0,
	},
	inputBoxStyle:{
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color:  Colors.CHARCOAL,
	},
	inputBoxDark: {
		backgroundColor: Colors.IRIDIUM,
		borderColor: Colors.WHITE_SMOKE,
	},
	inputBoxStyleDark:{
		color: Colors.WHITE_SMOKE,
	},
	inputLabel: {
		marginBottom: 0,
		marginTop: -6,
		marginLeft: 47,
		alignSelf: 'flex-start',
		backgroundColor: Colors.WHITE_SMOKE,
		fontSize: 16,
		fontFamily: 'WorkSans-Regular',
		borderWidth: 3,
		borderRadius: 7,
		borderColor: Colors.WHITE_SMOKE,
		color: Colors.CHARCOAL,
		textAlign: 'center',
		textAlignVertical: 'top',
		zIndex: 5,
	}, 
	inputLabelDark: {
		backgroundColor: Colors.IRIDIUM,
		borderColor: Colors.IRIDIUM,
		color: Colors.WHITE_SMOKE,
	}, 
	dropdownInputLabel: {
		marginBottom: 0,
		marginTop: -6,
		marginLeft: 47,
		alignSelf: 'flex-start',
		backgroundColor: Colors.WHITE_SMOKE,
		fontSize: 16,
		fontFamily: 'WorkSans-Regular',
		borderWidth: 3,
		borderRadius: 7,
		borderColor: Colors.WHITE_SMOKE,
		textAlign: 'center',
		textAlignVertical: 'top',
		zIndex: 501,
	}, 
	dropdownInputLabelDark: {
		backgroundColor: Colors.IRIDIUM,
		borderColor: Colors.IRIDIUM,
		color: Colors.WHITE_SMOKE,
	}, 
	btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 7,
		marginBottom: 10,
	}
})

export default BillingDetailsProfile;
