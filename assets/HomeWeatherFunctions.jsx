/****
 * @author Tyler Bowen, Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 * 
 * Secondary Author (Daniel) added general weather forecast info, dark mode, and new carousel for ambient weather display
 ***/

import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar, Appearance } from 'react-native'
import Colors from './Color'
import ZipLookup from './zip_codes.js';
import { getWeatherIcon } from './WeatherTypes.tsx';
import icons from './icons/Icons.js';

//eventually transfer this to account creation pages so that it can be cached in the database
export async function getGridpoints(zipcode) {
	if (!(zipcode in ZipLookup)) {
		return {
			status: 406, //invalid zip code
			gridpoint: ''
		};
	}

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
export const WeatherIcon = ({ forecastVal="clear", day="Mon" , isDarkMode=false}) => {
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
		<TouchableOpacity activeOpacity={1} style={styles.weatherIconContainer}>
			<Image 
				style={[styles.weatherIcon, currentStyle]}
				source={image_url}
			/>
			{onlyPossible && <Image 
				source={isDarkMode ? icons.percent_white : icons.percent_black}
				style={styles.percentImg}
			/> }
			<Text style={[styles.weatherDayLabel, isDarkMode && styles.weatherDayLabelDark]}>{day}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	containerDark: {
		backgroundColor: Colors.BALTIC_SEA,
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
		borderRadius: 12,
		flexDirection: 'row',
		marginTop: 25,
		marginBottom: 20,
		alignContent: 'flex-start',
		justifyContent: 'center'
	},
	weatherContainerDark: {
		backgroundColor: Colors.IRIDIUM,
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
		alignSelf: 'center',
		marginBottom: 0,
		paddingBottom: 0,
		height: 100,
	},
	weatherIconContainer:{
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
		color: Colors.ALMOST_BLACK,
	},
	weatherDayLabelDark:{
		color: Colors.WHITE_SMOKE,
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
	},
	cropCarousel:{
		flex:1,
		marginVertical: 5,
	},
})
