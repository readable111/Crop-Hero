/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

import { React, useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Alert,
	Appearance
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color'
import AppButton from '../assets/AppButton.jsx'
import UploadImage from '../assets/ProfilePageImages/UploadImage.jsx'
import NavBar from '../assets/NavBar.jsx'
import { toTitleCase } from '../assets/sanitizer.jsx'

const Profile = () =>{ 
	const [userData, setUserData] = useState({})
	const [isDarkMode, setIsDarkMode] = useState(false)
	const subID = "sub123"

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
				setUserData(data)
			}catch(err){
      			console.error("Error fetching user data:", err);
			}
		}
	  
		// call the function
		fetchSubInfo()
		  	// make sure to catch any error
		  	.catch(console.warn);
	}, [])

	{/*load in all fonts used for this page*/}
	const [fontsLoaded, fontError] = useFonts({
		'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
		'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});
	{/*return an error if the fonts fail to load*/}
	if (!fontsLoaded && !fontError) {
		return null;
	}
	console.log(userData)

	{/*return the page view with all of its contents*/}
	return(
	<View style = {[styles.topContainer, isDarkMode && styles.topContainerDark]}>
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
		{/*green oval at the top to denote profile picture and name*/}
		<Text style = {styles.oval}></Text>
		<Text style = {styles.profileName}>{userData[1]} {userData[2]}</Text>
		{/*TODO: set image to display profile picture after retrieving it*/}
		<UploadImage style={styles.avatarImg} isEditable={false} />
		{/*add edit profile button*/}
		<AppButton testID={"edit-profile"} title="Edit Profile" specifiedStyle={styles.editProfileBtn} backgroundColor={isDarkMode ? Colors.MALACHITE : Colors.SCOTCH_MIST_TAN} onPress={() => router.push({pathname:'/profile-editprofile', params:{ userData:JSON.stringify(userData)}})}/>
		{/*add grid of profile options*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton testID={"settings-icon"} title="" ad="setting" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => router.push({pathname:'/profile-settings', params:{ userData:JSON.stringify(userData)}})}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={[styles.optionTxt, isDarkMode && {color: Colors.WHITE_SMOKE}]}>    Settings</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton testID={"settings-arrow"} title="" ad="right" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => router.push({pathname:'/profile-settings', params:{ userData:JSON.stringify(userData)}})}/>
				</Col>
			</Row>
			{/*spacer row*/}
			<Row height={33}>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
			</Row>
			{/*row for billing details*/}
			{/*info needed for billing: merchant stuff (email, business addr., company name, logo), customer name, customer email, invoice date, due date, payment terms like late fees, itemized list of goods/services, subtotal, taxes/fees/discounts, total due*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton testID={"billing-icon"} title="" ad="creditcard" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => router.push('/profile-billingdetails', {params: userData})}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={[styles.optionTxt, isDarkMode && {color: Colors.WHITE_SMOKE}]}>    Billing Details</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton testID={"billing-arrow"} title="" ad="right" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => router.push('/profile-billingdetails')}/>
				</Col>
			</Row>
			{/*spacer row*/}
			<Row height={33}>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
			</Row>
			{/*row for log out*/}
			{/*TODO: add logout functionality once accounts are added*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton testID={"logout-icon"} title="" ad="logout" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => {Alert.alert('Disabled until Phase 2'); console.log("logout pressed")}}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={[styles.optionTxt, isDarkMode && {color: Colors.WHITE_SMOKE}]}>    Log Out</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton testID={"logout-arrow"} title="" ad="right" adSize={30} adColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL} specifiedStyle={[styles.circle, isDarkMode && styles.circleDark]} onPress={() => {Alert.alert('Disabled until Phase 2'); console.log("logout pressed")}}/>
				</Col>
			</Row>
		</View>
		<NavBar profileSelected darkMode={isDarkMode}/>
	</View>
	)
};

{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	topContainer: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		alignItems: 'center',
	},
	topContainerDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 300,
		height: 420,
		borderRadius: 300 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		transform: [{ scaleX: 2 }],
		marginTop: -250,
	},
	circle: {
		width: 40,
    	height: 40,
    	borderRadius: 40 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		backgroundColor: Colors.PERIWINKLE_GRAY,
		alignItems: 'center',
        justifyContent: 'center',
	},
	circleDark: {
		backgroundColor: Colors.RIVER_BED,
	},
	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
		marginTop: -130,
	},
	avatarImg: {
		marginTop: 25,
	},
	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
		fontFamily: 'Domine-Regular',
	},
	//style for the grid layout
	btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 12,
	},
	optionTxt: {
		fontFamily: 'WorkSans-Semibold',
		fontSize: 16,
		color: Colors.ALMOST_BLACK
	}
})

export default Profile;
