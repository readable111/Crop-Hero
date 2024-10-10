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
import { router } from 'expo-router'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import UploadImage from '../assets/ProfilePageImages/UploadImage.jsx'


const BillingDetailsProfile = () =>{ 
	{/*TODO: retrieve current model*/}
	{/*create the subscription model list*/}
	const [items, setItems] = useState([ //potential subscription model stuff
    	{label: 'Free', value: 'free'},                   // 1 farmer,No Ambient Weather, No  Export,   10 Crops
    	{label: 'Individual', value: 'individual'},       // 1 farmer,   Ambient Weather, No  Export,   25 Crops
		{label: 'Couple', value: 'couple'},               // 2 farmers,  Ambient Weather, Can Export,   75 Crops
		{label: 'Family', value: 'family'},               // 5 farmers,  Ambient Weather, Can Export,  200 Crops
		{label: 'Professional', value: 'professional'},   // 20 farmers, Ambient Weather, Can Export, 1000 Crops
  	]);
	const [open, setOpen] = useState(false);
  	const [value, setValue] = useState('family'); {/*must initialize with string of value from items list to assign a default option; TODO: retrieve option from database*/}

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
	initialEmail = "test@example.com"
	initialPhoneNum = "+1 (012) 345-6789"
	initialZipCode = "02914"
	initialState = "Rhode Island"

	const [fontsLoaded, fontError] = useFonts({
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
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
					<AppButton title="" icon={isDarkMode ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
				</Col>
				<Col relativeColsCovered={8}></Col>
				<Col relativeColsCovered={2}>
					{/*TODO: link save button to get input field contents and save them to the database*/}
					{/*TODO: when picture is saved, it is compressed via react-native-compressor library & https://stackoverflow.com/questions/37639360/how-to-optimise-an-image-in-react-native before being put into proper field*/}
					<AppButton title="" mci="content-save" mciSize={30} mciColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} onPress={() => Alert.alert('Save icon button pressed')}/>
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
					theme={isDarkMode ? 'DARK' : 'LIGHT'}
					open={open}
					value={value}
					items={items}
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
					leftIcon={<AntDesign name="mail" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='test@example.com'
					defaultValue={initialEmail}
					autoComplete='email'
					keyboardType='email-address'
					maxLength={384}
				/>
				{/*phone number input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Phone No.</Text>
				<Input
					leftIcon={<AntDesign name="phone" size={24} color={Colors.SOFT_GREEN} style={{transform: [{rotateY: '180deg'}]}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='+1 (012) 345-6789'
					defaultValue={initialPhoneNum}
					autoComplete='tel'
					keyboardType='phone-pad'
					maxLength={32}
				/>
				{/*zip code input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Zip Code</Text>
				<Input
					leftIcon={<Image source={Icons.zip_mail_green} style={{width: 25, height: 25}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='01234'
					defaultValue={initialZipCode}
					autoComplete='postal-code'
					keyboardType='numeric'
					maxLength={16}
				/>
				{/*state input box*/}
				<Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>State</Text>
				<Input
					leftIcon={<Image source={Icons.flag_country_green} style={{width: 25, height: 25}}/>}
					inputContainerStyle={[styles.inputBox, isDarkMode && styles.inputBoxDark]}
					inputStyle={[styles.inputBoxStyle, isDarkMode && styles.inputBoxStyleDark]}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='Texas'
					defaultValue={initialState}
					autoComplete='address-line1'
					keyboardType='default'
					maxLength={64}
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
    	width: '100',
		marginTop: 7,
	}
})

export default BillingDetailsProfile;
