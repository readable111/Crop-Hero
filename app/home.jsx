import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList, Image } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router'
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx'
import CropCarousel from '../src/components/cropCarousel.jsx'
import SearchInput from '../assets/SearchFeature.jsx'
import NavBar from '../assets/NavBar.jsx'



const Home = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'Domine-Bold': require('../assets/fonts/Domine-Bold.ttf')
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	const weather = [{id:1, day: "Mo", weather: "rainy"},{id:2,day: "Tu", weather: "pcloudy"},{id:3,day: "We", weather: "cloudy"},{id:4,day: "Th", weather: "sunny"},{id:5,day: "Fr", weather: "sunny"},{id:6,day: "Sat", weather: "rainy"},{id:7,day: "Sun", weather: "snow"}]
	

        const crops = [
                { label: 'Carrot', name: 'Carrot', active: 'Y', location: 'Greenhouse', variety: 'Standard', source: 'Home Depot', date: '05/06/2024', comments: 'None', indoors: 'No', type:'Standard'},
                { label: 'Cabbage', name: 'Cabbage', active: 'N', location: 'Outside', variety: 'Standard', source: 'Friend Recommendation', date: '01/24/2022', comments: 'None', indoors: 'Yes', type:'Standard' },
                { label: 'Potato', name: 'Potato', active: 'Y', location: 'Dump', variety: 'Standard', source: "Farmer's market", date: '11/13/2019', comments: 'None', indoors: 'Yes', type:'Standard' },
                { label: 'Tomato', name: "Tomato", active: "Y", location: "Greenhouse #2", variety: "Green", source: "Gathered", date: '08/30/2023', comments: 'None', indoors: 'No', type:'Standard' }
        ]

	const temp = [{temp: 70, perc: 80},{temp: 68, perc:68}, {temp: 70, perc: 72}]
	
	return(
	<View style = {styles.container}>	
		<View style = {styles.weatherContainer}>
			<FlatList
					data = {weather}
					horizontal
					renderItem = {({item}) =>{
						switch(item.weather){
							case "rainy":
							return(
								<View style ={styles.weatherItem}>
									<Image source = {require('../assets/icons/icon _rain_.png')} style = {styles.image}/>
									<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
								</View>
								)	
							case "sunny":
							return(
								<View style ={styles.weatherItem}>
									<Image source = {require('../assets/icons/icon _day sunny_.png')} style = {styles.image}/>
									<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
								</View>
								)
								
							case "cloudy":
							return(
								<View style ={styles.weatherItem}>
									<Image source = {require('../assets/icons/icon_cloudy.png')} style = {styles.image}/>
									<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
								</View>
								)
							case "pcloudy":
							return(
								<View style ={styles.weatherItem}>
									<Image source = {require('../assets/icons/icon _day sunny overcast_.png')} style = {styles.image}/>
									<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
								</View>
								)
							case "snow":
							return(
								<View style ={styles.weatherItem}>
									<Image source = {require('../assets/icons/interface-weather-snow-flake--winter-freeze-snow-freezing-ice-cold-weather-snowflake.png')} style = {styles.image}/>
									<Text style = {{fontFamily: 'Domine-Regular', fontSize: 15, alignSelf: 'center'}}>{item.day}</Text>
								</View>
								)
							}
						}
					}
					keyExtractor={(item) => item.id}/>
		</View>		
		<HomeCarousel data={temp} style = {styles.component}/>
		<SearchInput style = {styles.component}/>
		<CropCarousel crops = {crops} style = {styles.component}/>
		<NavBar homeSelected/>
	</View>)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
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
		flexDirection: 'row',
		marginTop: 8,
		marginBottom: 20,
		alignContent: 'flex-start',
		justifyContent: 'center'
	},
	weatherItem:{
		justifyContent:'center',
		alignContent: 'center',
		flex: 1,
		height: 'auto',
		marginHorizontal: 10
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
		alignItems: 'center',
		width: 35,
		height: 25,
		marginBottom: 3
	},
	searchImage:{
		marginHorizontal: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	component:{
		flex:1,
		alignSelf: 'flex-start'
	}

})

export default Home;
