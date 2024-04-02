import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router';
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx'
const Home = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine/Domine-Regular.ttf'),
	'Domine-Bold': require('../assets/fonts/Domine/Domine-Bold.ttf')
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	return(
	<View style = {styles.container}>	
		<View style ={styles.homeTitle}>
			<Text style = {{fontFamily: 'Domine-Bold', fontSize:50, textAlign:'center'}}>Home</Text>
		</View>
		<View style = {styles.weatherContainer}>
			<View style = {styles.weatherItem}>
				<Text style= {{fontFamily: 'Domine-Regular', fontSize:10, textAlign: 'center'}}>Mon</Text>
			</View>
		</View>			
		<View style= {styles.searchWrapper}>
			<View style={styles.searchContainer}>
				<Text style = {{display: 'flex', fontFamily: 'Domine-Regular', fontSize:20, alignSelf: 'center', marginRight: 5}}>Icon</Text>
				<TextInput style = {{display: 'flex', fontFamily: 'Domine-Regular', fontSize:20, alignSelf: 'center'}}>Tap to edit text</TextInput>
			</View>
		</View>
		<HomeCarousel/>
	
		<Link href="/profile">Link to Profile page</Link>
	</View>)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 0x97A5BF,
		height: '100%',
	},
	homeTitle: {
		backgroundColor: Colors.ALMOND_TAN,
		justifyContent: 'center',
		height: 70,
		width: '100%',
		borderRadius: 5
	},
	weatherContainer: {
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		flexDirection: 'row',
		alignContent:'flex-start',
		height: 55,
		width: '100%',
		borderRadius: 5,
		marginTop: 8,
		marginBottom: 20
	},
	weatherItem: {
		flexDirection: 'column',
		alignItems: 'flex-end',
		height: 'auto',
		width: '16.7%',
		paddingHorizontal: 10
		
	},
	searchWrapper: {
		alignItems:'center'
	},
	searchContainer:{
		backgroundColor: 0xFFFFFFFF,
		display: 'flex',
		height: 55,
		width: '80%',
		borderRadius: 50,
		flexDirection: 'row',	
		alignItems: 'flex-start'
	}



})

export default Home;
