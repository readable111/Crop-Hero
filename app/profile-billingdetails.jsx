import { useState } from 'react';
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
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'


const EditProfile = () =>{ 
	{/*TODO: retrieve data from local storage or database*/}
	{/*retrieve data and store it in these variables to be displayed as default values in input boxes*/}
	initialEmail = "test@example.com"
	initialPhoneNum = "+1 (012) 345-6789"

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


	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	{/*TODO: add dark mode*/}
	return(
	<View style = {styles.container}>
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
				<Col relativeColsCovered={8}></Col>
				<Col relativeColsCovered={2}>
					{/*TODO: link save button to get input field contents and save them to the database*/}
					{/*TODO: when picture is saved, it is compressed via react-native-compressor library & https://stackoverflow.com/questions/37639360/how-to-optimise-an-image-in-react-native before being put into proper field*/}
					<AppButton title="" icon={Icons.save_icon_white} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
			</Row>
		</View>
		{/*create container for the purple section*/}
        <View style = {styles.innerContainer}>
			{/*create the oval*/}
			<View style = {styles.oval}></View>
			{/*create container for the rectangular area*/}
			<View style = {styles.rect}>
				{/*avatar image and edit button*/}
				<Image
					style={styles.avatarImg}
					source = {require('../assets/ProfilePageImages/AvatarPlaceholder.png')}
				/>
				{/*email input box*/}
				<Text style={styles.inputLabel}>Email</Text>
				<Input
					leftIcon={<AntDesign name="mail" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='test@example.com'
					defaultValue={initialEmail}
					autoComplete='email'
					keyboardType='email-address'
					maxLength={384}
				/>
				{/*phone number input box*/}
				<Text style={styles.inputLabel}>Phone No.</Text>
				<Input
					leftIcon={<AntDesign name="phone" size={24} color={Colors.SOFT_GREEN} style={{transform: [{rotateY: '180deg'}]}}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='+1 (012) 345-6789'
					defaultValue={initialPhoneNum}
					autoComplete='tel'
					keyboardType='phone-pad'
					maxLength={32}
				/>
				{/*subscription model dropdown box*/}
				<Text style={styles.inputLabel}>Subscription Model</Text>
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					disableBorderRadius={true}
					listMode='FLATLIST'
					props={{
						activeOpacity: 1,
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
						zIndex: 1,
					}}
					dropDownContainerStyle={{
						borderWidth: 2,
						borderColor: 'black',
						borderRadius: 12,
					}}
					style={{
						borderColor: 'black',
						borderWidth: 2,
						borderRadius: 12,
						height: 52,
					}}
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
	avatarImg: {
		width: 130,
		height: 130,
		borderWidth: 2,
		borderRadius: 75,
		marginTop: -100,
		marginBottom: 20,
	},
	editBtn: {
		width: 50,
    	height: 50,
    	borderRadius: 50 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		backgroundColor: Colors.IRISH_GREEN,
		marginTop: -50,
		marginLeft: 130,
		marginBottom: 40,
	},
	inputBox: {
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 12,
		borderColor: 'black',
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
		color: 'black',
	},
	inputLabel: {
		marginBottom: 0,
		marginTop: -6,
		marginLeft: 47,
		alignSelf: 'flex-start',
		backgroundColor: "white",
		zIndex: 100,
		fontSize: 16,
		fontFamily: 'WorkSans-Regular',
		borderWidth: 3,
		borderRadius: 7,
		borderColor: 'white',
		textAlign: 'center',
		textAlignVertical: 'top',
		zIndex: 10,
	}, 
	btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100',
		marginTop: 7,
	}
})

export default EditProfile;
