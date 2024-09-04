import { useCallBack, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Scrollable, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { Link } from 'expo-router'
import Colors from '../assets/Color.js'
import HomeCarousel from '../src/components/carousel.jsx'
import CropCarousel from '../src/components/cropCarousel.jsx'
import SearchInput from '../assets/SearchFeature.jsx'
import NavBar from '../assets/NavBar.jsx'
import ZipLookup from '../assets/zip_codes.js';
import { getWeatherIcon } from '../assets/WeatherTypes.tsx';
import icons from '../assets/icons/Icons.js';

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

//
const WeatherIcon = ({ forecastVal="clear", day="Mon" }) => {
	//get the proper weather icon based on the forecast value
	weatherIconDetails = getWeatherIcon(forecastVal)
	image_url = weatherIconDetails[0]
	prob_val = weatherIconDetails[1]

	currentStyle = null
	onlyPossible = false
	if (prob_val == "None") {
		currentStyle = styles.noneProb
		onlyPossible = false
	}
	else if (prob_val == "Slight") {
		currentStyle = styles.slightProb
		onlyPossible = true
	}
	else if (prob_val == "Chance") {
		currentStyle = styles.chanceProb
		onlyPossible = true
	}
	else if (prob_val == "Likely") {
		currentStyle = styles.likelyProb
		onlyPossible = true
	}

	return (
		<View style={styles.weatherIconContainer}>
			<Image 
				style={[styles.weatherIcon, currentStyle]}
				source={image_url}
			/>
			{onlyPossible && <Image 
				source={icons.percent_black}
				style={styles.percentImg}
			/> }
			<Text style={styles.weatherDayLabel}>{day}</Text>
		</View>
	)
}

const todayDayLookup = {
	"Monday": "Sunday",
	"Tuesday": "Monday",
	"Wednesday": "Tuesday",
	"Thursday": "Wednesday",
	"Friday": "Thursday",
	"Saturday": "Friday",
	"Sunday": "Saturday",
}

const Home = () =>{ 
	const [forecastDataDay1, setforecastDataDay1] = useState(null);
	const [dayName1, setDayName1] = useState(null);
	const [forecastDataDay2, setforecastDataDay2] = useState(null);
	const [dayName2, setDayName2] = useState(null);
	const [forecastDataDay3, setforecastDataDay3] = useState(null);
	const [dayName3, setDayName3] = useState(null);
	const [forecastDataDay4, setforecastDataDay4] = useState(null);
	const [dayName4, setDayName4] = useState(null);
	const [forecastDataDay5, setforecastDataDay5] = useState(null);
	const [dayName5, setDayName5] = useState(null);
	const [forecastDataDay6, setforecastDataDay6] = useState(null);
	const [dayName6, setDayName6] = useState(null);
	const [forecastDataDay7, setforecastDataDay7] = useState(null);
	const [dayName7, setDayName7] = useState(null);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
		  // get the data from the api
		  const data = await getGridpoints('76131');
		  // convert the data to json
		  if (data.status == 200) {
			const response = await fetch(
				`https://api.weather.gov/gridpoints/${data.gridpoint}/forecast`
			).then((res) => res.json());
			forecast = response.properties.periods
			//get the short weather forecast for today unless it is already night and then the next few days
			//ignore the night-time forecast
			if (forecast[0].name === "Tonight") {
				//Based on tomorrow's name, figure out today's name
				todayName = todayDayLookup[forecast[3].name]
				setDayName1(todayName.substring(0,3))
				setDayName2(forecast[3].name.substring(0,3))
				setDayName3(forecast[5].name.substring(0,3))
				setDayName4(forecast[7].name.substring(0,3))
				setDayName5(forecast[9].name.substring(0,3))
				setDayName6(forecast[11].name.substring(0,3))
				setDayName7(forecast[13].name.substring(0,3))

				setforecastDataDay1(forecast[1].shortForecast)
				setforecastDataDay2(forecast[3].shortForecast)
				setforecastDataDay3(forecast[5].shortForecast)
				setforecastDataDay4(forecast[7].shortForecast)
				setforecastDataDay5(forecast[9].shortForecast)
				setforecastDataDay6(forecast[11].shortForecast)
				setforecastDataDay7(forecast[13].shortForecast)
			}
			else {
				//Based on tomorrow's name, figure out today's name
				todayName = todayDayLookup[forecast[2].name]
				setDayName1(todayName.substring(0,3))
				setDayName2(forecast[2].name.substring(0,3))
				setDayName3(forecast[4].name.substring(0,3))
				setDayName4(forecast[6].name.substring(0,3))
				setDayName5(forecast[8].name.substring(0,3))
				setDayName6(forecast[10].name.substring(0,3))
				setDayName7(forecast[12].name.substring(0,3))

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
			<WeatherIcon forecastVal={forecastDataDay1} day={dayName1}/>
			<WeatherIcon forecastVal={forecastDataDay2} day={dayName2}/>
			<WeatherIcon forecastVal={forecastDataDay3} day={dayName3}/>
			<WeatherIcon forecastVal={forecastDataDay4} day={dayName4}/>
			<WeatherIcon forecastVal={forecastDataDay5} day={dayName5}/>
			<WeatherIcon forecastVal={forecastDataDay6} day={dayName6}/>
			<WeatherIcon forecastVal={forecastDataDay7} day={dayName7}/>
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
		height: 60,
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
		alignSelf: 'flex-start'
	},
	weatherIconContainer:{
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		height: 50,
		flexDirection: 'column',
		marginLeft: 11,
		marginRight: 11,
		marginTop: 8,
		alignContent: 'flex-start',
		justifyContent: 'center'
	},
	weatherIcon:{
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 25,
		marginBottom: -20,
	},
	weatherDayLabel:{
		fontFamily: 'Domine-Regular',
		fontSize: 15,
		alignSelf: 'center',
		justifyContent: 'center',
		marginTop: 25,
	},
	noneProb: {
		opacity: 1,
	},
	slightProb: {
		opacity: 0.4,
	},
	chanceProb: {
		opacity: 0.7,
	},
	likelyProb: {
		opacity: 1,
	},
	percentImg: {
		marginBottom:-22,
		marginTop: 10,
		marginLeft: 18,
		height: 13,
		width: 13,
	},
	Search:{
		flex:1,
		marginBottom: 10,
		zIndex: 9999
	},
	cropCarousel:{
		flex:1,
		marginVertical: 5,
	},
})

export default Home;
