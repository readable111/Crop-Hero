import { useCallBack } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList, Image, Button } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router'
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx'
import CropCarousel from '../src/components/cropCarousel.jsx'
import SearchInput from '../assets/SearchFeature.jsx'
import NavBar from '../assets/NavBar.jsx'
import LoginButton from './login.jsx';




const Home = () =>{

	//ignore for now, was messing around with weather apis
//		const getWeather = async () =>{	
//		const params = {
//			"latitude": 33.20,
//			"longitude": -97.15,
//			"daily": ["temperature_2m_max", "temperature_2m_min", "uv_index_clear_sky_max", "precipitation_sum", "showers_sum", "snowfall_sum"],
//			"temperature_unit": "fahrenheit",
//			"wind_speed_unit": "mph",
//			"precipitation_unit": "inch"
//		};
//		const url = "https://api.open-meteo.com/v1/forecast";
//		const forecast = await fetch(url, params)
//		const response = forecast[0];
//		const daily = response.daily();
//		
//		const weatherData = {
//	
//			daily: {
//				time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
//					(t) => new Date((t + utcOffsetSeconds) * 1000)
//				),
//				temperature2mMax: daily.variables(0).valuesArray(),
//				temperature2mMin: daily.variables(1).valuesArray(),
//				uvIndexClearSkyMax: daily.variables(2).valuesArray(),
//				precipitationSum: daily.variables(3).valuesArray(),
//				showersSum: daily.variables(4).valuesArray(),
//				snowfallSum: daily.variables(5).valuesArray(),
//			},
//	
//		};
//
//	for (let i = 0; i < weatherData.daily.time.length; i++) {
//		console.log(
//			weatherData.daily.time[i].toISOString(),
//			weatherData.daily.temperature2mMax[i],
//			weatherData.daily.temperature2mMin[i],
//			weatherData.daily.uvIndexClearSkyMax[i],
//			weatherData.daily.precipitationSum[i],
//			weatherData.daily.showersSum[i],
//			weatherData.daily.snowfallSum[i]
//		);
//	}
//		return weatherData;
//	}
	async function fetchData() {
		const response = await fetch('localhost:3000/sub');
  const data = await response.json();
  return data;
}

	data =fetchData()


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
		<View style = {styles.weatherCarousel}>
			<HomeCarousel data={temp}/>
		</View>
		<View style = {styles.Search}>
			<SearchInput/>
		</View>
		<CropCarousel crops = {crops} style = {styles.cropCarousel}/>
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
	weatherCarousel:{
		marginVertical:10,
		flex:1,
	},
	Search:{
		flex:1,
		marginBottom: 10,
		zIndex: 9999
	},
	cropCarousel:{
		flex:1,
		marginVertical: 5,
	}

})

export default Home;
