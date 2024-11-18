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
	Alert,
	ScrollView,
	Appearance
} from 'react-native'
import { useFonts } from 'expo-font'
import { router, useLocalSearchParams } from 'expo-router'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid'
import Colors from '../assets/Color'
import Icons from '../assets/icons/Icons'
import AppButton from '../assets/AppButton'
import UploadImage from '../assets/ProfilePageImages/UploadImage'
import {cleanText, cleanNumbers} from '../assets/sanitizer'


const EditProfile = () =>{ 
//	const [first, setFirst] = useState("")
//	const [last, setLast] = useState("")
	const userData = useLocalSearchParams()
	const [awAPIKey, setAWAPIKey] = useState("")
	const [awAppKey, setAWAppKey] = useState("")
	const [awMACAddrKey, setAWMACAddrKey] = useState("")
	const [savePressed, setSavePressed] = useState(false)


	const handleSave = async() =>{
		console.log("Saved. First: " + cleanText(first, noStopwords=false, noSQL=true, textOnly=true) + "\t Last: " + cleanText(last, noStopwords=false, noSQL=true, textOnly=true));
		console.log("'" + cleanText(awAPIKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true) + "'\t AppKey: '" + cleanText(awAppKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true) + "'\t MAC: '" + cleanText(awMACAddrKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true) + "'")
		await AsyncStorage.setItem('aw_api_key', cleanText(awAPIKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true))
		await AsyncStorage.setItem('aw_app_key', cleanText(awAppKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true))
		await AsyncStorage.setItem('aw_device_mac', cleanText(awMACAddrKey, noStopwords=false, noSQL=true, textOnly=false, hexCode=true))

		await AsyncStorage.setItem('first_name', cleanText(first, noStopwords=false, noSQL=true, textOnly=true))
		await AsyncStorage.setItem('last_name', cleanText(last, noStopwords=false, noSQL=true, textOnly=true))
	};

	useEffect(() => {
		// declare the async data fetching function
		const fetchInputFieldData = async () => {
			const api = await AsyncStorage.getItem('aw_api_key');
			const app = await AsyncStorage.getItem('aw_app_key');
			const mac = await AsyncStorage.getItem('aw_device_mac');
			const firstName = await AsyncStorage.getItem('first_name');
			const lastName = await AsyncStorage.getItem('last_name');

			if (!firstName) {
				await AsyncStorage.setItem('first_name', "Zina")
				setFirst("Zina")
			}
			if (!lastName) {
				await AsyncStorage.setItem('last_name', "Townley")
				setLast("Townley")
			}

			setAWAPIKey(api)
			setAWAppKey(app)
			setAWMACAddrKey(mac)
			setFirst(firstName)
			setLast(lastName)
		}
	  
		// call the function
		fetchInputFieldData()
		  	// make sure to catch any error
		  	.catch(console.warn);
	}, [])

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
		
	{/*TODO: retrieve data from local storage or database*/}
	{/*retrieve data and store it in these variables to be displayed as default values in input boxes*/}


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
					{/*TODO: when picture is saved, it is compressed via react-native-compressor library & https://stackoverflow.com/questions/37639360/how-to-optimise-an-image-in-react-native before being put into proper field*/}
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
				{/*display an editable version of the avatar image*/}
				<UploadImage style={styles.avatarImage} isEditable={true} cameraMode='selfie' darkMode={isDarkMode}/>

				{/*first name input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>First Name</Text>
				<Input
					testID={"first-name-input"}
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='John'
					defaultValue={first}
					autoComplete='name'
					maxLength={256}
					onChangeText={value => {setFirst(value);}}
				/>
				{/*last name input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Last Name</Text>
				<Input
					testID={"last-name-input"}
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='Doe'
					defaultValue={last}
					autoComplete='name'
					maxLength={256}
					onChangeText={value => {setLast(value);}}
				/>
				{/*Ambient Weather API key*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Ambient Weather API Key</Text>
				<Input
					testID={"api-key-input"}
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='API Key: ...ed875ac750daf92e...'
					defaultValue={awAPIKey}
					autoComplete='off'  //autoComplete is off because a hex string will just cause issues with any autocomplete algorithms
					maxLength={256}
					onChangeText={value => {setAWAPIKey(value);}}
				/>
				{/*Ambient Weather App key*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Ambient Weather App Key</Text>
				<Input
					testID={"app-key-input"}
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='App Key: ...59391b4f41d88b8a...'
					defaultValue={awAppKey}
					autoComplete='off'	//autoComplete is off because a hex string will just cause issues with any autocomplete algorithms
					maxLength={256}
					onChangeText={value => {setAWAppKey(value);}}
				/>
				{/*Ambient Weather MAC Addr*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Ambient Weather MAC Addr</Text>
				<Input
					testID={"mac-addr-input"}
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='MAC Address: ...3cff8cdbae849a83...'
					defaultValue={awMACAddrKey}
					autoComplete='off'	//autoComplete is off because a hex string will just cause issues with any autocomplete algorithms
					maxLength={256}
					onChangeText={value => {setAWMACAddrKey(value);}}
				/>
				{/*new password input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Change Password</Text>
				<Input
					leftIcon={<AntDesign name="lock" size={24} color={Colors.SOFT_GREEN} />}
					rightIcon={<AntDesign name="eyeo" size={24} color={Colors.SOFT_GREEN} />}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					secureTextEntry={true}
					placeholder='•••••••••••• - disabled'
					contextMenuHidden={true}
					editable={false}
					readOnly={true}
				/>
				{/*confirm password input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Confirm Password</Text>
				<Input
					leftIcon={<AntDesign name="lock" size={24} color={Colors.SOFT_GREEN} />}
					rightIcon={<AntDesign name="eyeo" size={24} color={Colors.SOFT_GREEN} />}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					secureTextEntry={true}
					placeholder='•••••••••••• - disabled'
					contextMenuHidden={true}
					editable={false}
					readOnly={true}
				/>
			</View>
        </View>
	</ScrollView>
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
	ovalDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
	rectDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
	rect: {
		backgroundColor: Colors.SANTA_GRAY,
		width: '100%',
		height: '90%',
		marginTop: -300,
		alignItems: 'center',
	},
	avatarImage: {
		marginTop: -100,
        marginBottom: 40,
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
		color: Colors.CHARCOAL,
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
		zIndex: 100,
		fontSize: 16,
		fontFamily: 'WorkSans-Regular',
		borderWidth: 3,
		borderRadius: 7,
		borderColor: Colors.WHITE_SMOKE,
		color: Colors.CHARCOAL,
		textAlign: 'center',
		textAlignVertical: 'top',
	}, 
	inputLabelDark: {
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

export default EditProfile;
