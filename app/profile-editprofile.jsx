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
        <View style = {styles.innerContainer}>
		    <Text style = {{fontFamily: 'Domine-Regular', fontSize: 30}}>This is where the Edit Profile page will go</Text>
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
    },
    backArrow: {
        marginLeft: 12,
        marginTop: 7,
    },
})

export default EditProfile;
