import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable } from 'react-native'
import { useFonts } from 'expo-font'
import Colors from '../assets/Color.js'


const Home = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'WorkSans-Semibold': require('../assets/fonts/WorkSans/WorkSans-SemiBold.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	return(
	<View style = {styles.container}>
		<Text style = {{fontFamily: 'WorkSans-Semibold', fontSize: 30, color: Colors.CHARCOAL}}>This is where the profile page will go</Text>
	</View>)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.ALMOND_TAN,
		height: '100%',
	}
})

export default Home;
