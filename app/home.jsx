import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable } from 'react-native'
import { useFonts } from 'expo-font'


const Home = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	return(
	<View style = {styles.container}>
		<Text style = {{fontFamily: 'Domine-Regular', fontSize: 30}}>This is where the home page will go</Text>
	</View>)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 0x97A5BF,
		height: '100%',
	}
})

export default Home;
