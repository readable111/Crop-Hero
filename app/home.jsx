import { useCallBack, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList, Image } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router'
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx'
import CropCarousel from '../src/components/cropCarousel.jsx'
import SearchInput from '../assets/SearchFeature.jsx'
import NavBar from '../assets/NavBar.jsx'
import ZipLookup from '../assets/zip_codes.js';

//eventually transfer this to account creation pages so that it can be cached in the database
async function getGridpoints(zipcode) {
	let coords = ZipLookup[zipcode]
	let lat = coords[0]
	let long = coords[1]
  
	try {
		const response = await fetch(
			`https://api.weather.gov/points/${lat},${long}`
		).then((res) => res.json());

		forecastURL = response.properties.forecast
		urlParts = forecastURL.split('/')
		gridpoint = urlParts[4] + '/' + urlParts[5]
	
		return {
			status: 200,
			gridpoint: gridpoint
		};
	} catch (error) {
		return {
			status: 500,
			gridpoint: ''
		};
	}
}

//list of possible forecast info and mapped values


const Home = () =>{ 
	const [forecastDataDay1, setforecastDataDay1] = useState(null);
	const [forecastDataDay2, setforecastDataDay2] = useState(null);
	const [forecastDataDay3, setforecastDataDay3] = useState(null);
	const [forecastDataDay4, setforecastDataDay4] = useState(null);
	const [forecastDataDay5, setforecastDataDay5] = useState(null);
	const [forecastDataDay6, setforecastDataDay6] = useState(null);
	const [forecastDataDay7, setforecastDataDay7] = useState(null);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
		  // get the data from the api
		  const data = await getGridpoints('76131');
		  // convert the data to json
		  if (data.status == 200) {
			console.log(data.gridpoint)
			const response = await fetch(
				`https://api.weather.gov/gridpoints/${data.gridpoint}/forecast`
			).then((res) => res.json());
			forecast = response.properties.periods
			//get the short weather forecast for today unless it is already night and then the next few days
			//ignore the night-time forecast
			if (forecast[0].name === "Tonight") {
				setforecastDataDay1(forecast[1].shortForecast)
				setforecastDataDay2(forecast[3].shortForecast)
				setforecastDataDay3(forecast[5].shortForecast)
				setforecastDataDay4(forecast[7].shortForecast)
				setforecastDataDay5(forecast[9].shortForecast)
				setforecastDataDay6(forecast[11].shortForecast)
				setforecastDataDay7(forecast[13].shortForecast)
			}
			else {
				setforecastDataDay1(forecast[0].shortForecast)
				setforecastDataDay2(forecast[2].shortForecast)
				setforecastDataDay3(forecast[4].shortForecast)
				setforecastDataDay4(forecast[6].shortForecast)
				setforecastDataDay5(forecast[8].shortForecast)
				setforecastDataDay6(forecast[10].shortForecast)
				setforecastDataDay7(forecast[12].shortForecast)
			}
			
		  }
		  else {
			console.log("bad")
		  }
		}
	  
		// call the function
		fetchData()
		  // make sure to catch any error
		  .catch(console.error);;
	}, [])

	const [fontsLoaded, fontError] = useFonts({
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'Domine-Bold': require('../assets/fonts/Domine-Bold.ttf')
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	const weather = [{id:1, day: "Mo", weather: "rainy"},{id:2,day: "Tu", weather: "pcloudy"},{id:3,day: "We", weather: "cloudy"},{id:4,day: "Th", weather: "sunny"},{id:5,day: "Fr", weather: "sunny"},{id:6,day: "Sat", weather: "rainy"},{id:7,day: "Sun", weather: "snow"}]
	
	const crops = [{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"},{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"},{cropName: "Carrots", medium: "Hugel Mound", location: "8", day: "7"}]


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
		<Text>
			<Text>{forecastDataDay1},</Text>
			<Text>{forecastDataDay2},</Text>
			<Text>{forecastDataDay3},</Text>
			<Text>{forecastDataDay4},</Text>
			<Text>{forecastDataDay5},</Text>
			<Text>{forecastDataDay6},</Text>
			<Text>{forecastDataDay7}</Text>
		</Text>
		<HomeCarousel data={temp} style = {styles.component}/>
		<SearchInput style = {styles.component}/>
		<CropCarousel crops = {crops} style = {styles.component}/>
		<NavBar homeSelected/>
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
