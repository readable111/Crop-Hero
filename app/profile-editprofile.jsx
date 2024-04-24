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
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import UploadImage from '../assets/ProfilePageImages/UploadImage.jsx'


const EditProfile = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	{/*TODO: retrieve data from local storage or database*/}
	{/*retrieve data and store it in these variables to be displayed as default values in input boxes*/}
	initialFirstName = "Daniel"
	initialLastName = "Moreno"

	{/*TODO: add dark mode*/}
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
				<Col relativeColsCovered={8}></Col>
				<Col relativeColsCovered={2}>
					{/*TODO: link save button to get input field contents and save them to the database*/}
					{/*TODO: when picture is saved, it is compressed via react-native-compressor library & https://stackoverflow.com/questions/37639360/how-to-optimise-an-image-in-react-native before being put into proper field*/}
					<AppButton title="" mci="content-save" mciSize={30} mciColor={'white'} onPress={() => Alert.alert('Save icon button pressed')}/>
				</Col>
			</Row>
		</View>
		{/*create container for the purple section*/}
        <View style = {styles.innerContainer}>
			{/*create the oval*/}
			<View style = {styles.oval}></View>
			{/*create container for the rectangular area*/}
			<View style = {styles.rect}>
				{/*display an editable version of the avatar image*/}
				<UploadImage style={styles.avatarImage} isEditable={true} cameraMode='selfie'/>

				{/*first name input box*/}
				<Text style={styles.inputLabel}>First Name</Text>
				<Input
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='John'
					defaultValue={initialFirstName}
					autoComplete='name'
					maxLength={256}
				/>
				{/*last name input box*/}
				<Text style={styles.inputLabel}>Last Name</Text>
				<Input
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					placeholder='Doe'
					defaultValue={initialLastName}
					autoComplete='name'
					maxLength={256}
				/>
				{/*new password input box*/}
				<Text style={styles.inputLabel}>Change Password</Text>
				<Input
					leftIcon={<AntDesign name="lock" size={24} color={Colors.SOFT_GREEN} />}
					rightIcon={<AntDesign name="eyeo" size={24} color={Colors.SOFT_GREEN} />}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					secureTextEntry={true}
					placeholder='•••••••••••• - disabled till Phase 2'
					contextMenuHidden={true}
					editable={false}
					readOnly={true}
				/>
				{/*confirm password input box*/}
				<Text style={styles.inputLabel}>Confirm Password</Text>
				<Input
					leftIcon={<AntDesign name="lock" size={24} color={Colors.SOFT_GREEN} />}
					rightIcon={<AntDesign name="eyeo" size={24} color={Colors.SOFT_GREEN} />}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					selectionColor={Colors.SANTA_GRAY}
					secureTextEntry={true}
					placeholder='•••••••••••• - disabled till Phase 2'
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
	rect: {
		backgroundColor: Colors.SANTA_GRAY,
		width: '100%',
		height: 540,
		marginTop: -300,
		alignItems: 'center',
	},
	avatarImage: {
		marginTop: -100,
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
	}, 
	btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100',
		marginTop: 7,
	},
})

export default EditProfile;
