import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable, StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import Colors from '../assets/Color.js'


const Profile = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'WorkSans-Semibold': require('../assets/fonts/WorkSans/WorkSans-SemiBold.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	return(
	<View style = {styles.container}>
		<StatusBar backgroundColor={'#f5f5f5'} />
		<Text style = {styles.oval}>Oval</Text>
		<Text style = {{fontFamily: 'WorkSans-Semibold', fontSize: 30, color: 'black'}}>This is where the profile page will go</Text>
	</View>
	)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		alignItems: 'center',
	},
	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 300,
		height: 420,
		borderRadius: 300,
		transform: [{ scaleX: 2 }],
		marginTop: -280,
	},
})

export default Profile;
