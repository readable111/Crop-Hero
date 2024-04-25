import { React} from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Image, 
	Alert
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import SearchInput from '../assets/SearchFeature.jsx'

const Profile = () =>{ 
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

	{/*TODO: add dark mode*/}
	{/*return the page view with all of its contents*/}
	return(
	<View style = {styles.topContainer}>
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
		{/*green oval at the top to denote profile picture and name*/}
		<Text style = {styles.oval}></Text>
		<Text style = {styles.profileName}>Daniel Moreno</Text>
		{/*TODO: set image to display profile picture*/}
		<Image
			style={styles.avatarImg}
			source = {require('../assets/ProfilePageImages/AvatarPlaceholder.png')}
		/>
		{/*add edit profile button*/}
		<AppButton title="Edit Profile" specifiedStyle={styles.editProfileBtn} backgroundColor={Colors.SCOTCH_MIST_TAN} onPress={() => router.push('/profile-editprofile')}/>
		{/*add grid of profile options*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton title="" icon={Icons.gear_big_empty_black} specifiedStyle={styles.circle} onPress={() => router.push('/profile-settings')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={{fontFamily: 'WorkSans-Semibold', fontSize: 16}}>    Settings</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => router.push('/profile-settings')}/>
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
					<AppButton title="" icon={Icons.credit_card_black} specifiedStyle={styles.circle} onPress={() => router.push('/profile-billingdetails')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={{fontFamily: 'WorkSans-Semibold', fontSize: 16}}>    Billing Details</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => router.push('/profile-billingdetails')}/>
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
					<AppButton title="" icon={Icons.logout_icon_black} specifiedStyle={styles.circle} onPress={() => Alert.alert('Disabled until Phase 2')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={{fontFamily: 'WorkSans-Semibold', fontSize: 16}}>    Log Out</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" icon={Icons.arrow_right_black} specifiedStyle={styles.circle} onPress={() => Alert.alert('Disabled until Phase 2')}/>
				</Col>
			</Row>
			<SearchInput resultDisplayMode="modal"/>
			<Text>test text Lorem Ipsum random stuff</Text>
		</View>
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
	},
	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
		marginTop: -130,
	},
	avatarImg: {
		width: 130,
		height: 130,
		borderWidth: 2,
		borderRadius: 75,
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
	}
})

export default Profile;
