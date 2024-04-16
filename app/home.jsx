import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList, Image } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router'
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx';
import CropCarousel from '../src/components/cropCarousel.jsx';
import SearchInput from '../assets/SearchFeature.jsx'



const Home = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'Domine-Bold': require('../assets/fonts/Domine-Bold.ttf')
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	const weather = [{id:1, day: "Mo", weather: "rainy"},{id:2,day: "Tu", weather: "rainy"},{id:3,day: "We", weather: "rainy"},{id:4,day: "Th", weather: "rainy"},{id:5,day: "Fr", weather: "rainy"},{id:6,day: "Sat", weather: "rainy"},{id:7,day: "Sun", weather: "rainy"}]
	
	const crops = [{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"},{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"},{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"}]


	return(
	<View style = {styles.container}>	
		<View style = {styles.weatherContainer}>
			<FlatList
					data = {weather}
					horizontal
					renderItem = {({item}) =>(	
						<View style ={styles.weatherItem}>
							<Image source = {require('../assets/icons/icon _day sunny_.png')} style = {styles.image}/>
							<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
						</View>
					)}
					keyExtractor={(item) => item.id}/>
		</View>			
		<SearchInput/>
		<HomeCarousel/>
		<CropCarousel crops = {crops}/>
		<Link href="/profile">Link to Profile page</Link>
	</View>)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 0x97A5BF,
		height: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
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
		height: 55,
		width: '100%',
		borderRadius: 5,
		marginTop: 8,
		marginBottom: 20,
		alignContent: 'center',
		justifyContent: 'center'
	},
	weatherItem:{
		alignContent: 'center',
		height: 'auto',
		marginHorizontal: 10
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
		alignItems: 'center',
	},
	image:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchImage:{
		marginHorizontal: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}



})

export default Home;
