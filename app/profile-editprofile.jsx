import { useCallBack } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Scrollable, 
	StatusBar, 
	Image, 
	Alert,
	ScrollView
} from 'react-native'
import { useFonts } from 'expo-font'
import { Link, router } from 'expo-router'
import { Input } from 'react-native-elements'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'


const EditProfile = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine/Domine-Regular.ttf'),
	'WorkSans-Regular': require('../assets/fonts/WorkSans/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	{/*retrieve data and store it in these variables to be displayed as default values in input boxes*/}
	initialFullName = "Daniel Moreno"
	initialEmail = "test@example.com"
	initialPhoneNum = "+1 (012) 345-6789"

	return(
	<ScrollView style = {styles.container}>
        {/*create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
        {/*create the arrow to unwind the stack and go back one page*/}
        <AppButton title="" icon={Icons.arrow_tail_left_black} specifiedStyle={styles.backArrow} onPress={() => router.back()}/>
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
				<AppButton title="" icon={Icons.pencil_edit} specifiedStyle={styles.editBtn} onPress={() => Alert.alert('Icon Button pressed')}/>
				{/*full name input box*/}
				<Text style={styles.inputLabel}>Full Name</Text>
				<Input
					leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					placeholder='John Doe'
					defaultValue={initialFullName}
				/>
				{/*email input box*/}
				<Text style={styles.inputLabel}>Email</Text>
				<Input
					leftIcon={<AntDesign name="mail" size={24} color={Colors.SOFT_GREEN}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					placeholder='test@example.com'
					defaultValue={initialEmail}
				/>
				{/*phone number input box*/}
				<Text style={styles.inputLabel}>Phone No.</Text>
				<Input
					leftIcon={<AntDesign name="phone" size={24} color={Colors.SOFT_GREEN} style={{transform: [{rotateY: '180deg'}]}}/>}
					inputContainerStyle={styles.inputBox}
					inputStyle={styles.inputBoxStyle}
					placeholder='+1 (012) 345-6789'
					defaultValue={initialPhoneNum}
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
    backArrow: {
        marginLeft: 12,
        marginTop: 7,
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
	}
})

export default EditProfile;
