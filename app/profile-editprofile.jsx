import { useCallBack } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Scrollable, 
	StatusBar, 
	Image, 
	Alert
} from 'react-native'
import { useFonts } from 'expo-font'
import { Link, router } from 'expo-router'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'


const EditProfile = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine/Domine-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	return(
	<View style = {styles.container}>
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
				<Image
					style={styles.avatarImg}
					source = {require('../assets/ProfilePageImages/AvatarPlaceholder.png')}
				/>
				<AppButton title="" icon={Icons.pencil_edit} specifiedStyle={styles.editBtn} onPress={() => Alert.alert('Icon Button pressed')}/>
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
		height: 300,
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
	},
})

export default EditProfile;
