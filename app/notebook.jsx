import { React, useState } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	Text,
	Image,
	Alert,
	ScrollView
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { Tab, TabView, ListItem, Card,Button, Icon } from '@rneui/themed';
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { Switch } from 'react-native-elements'
import NavBar from '../assets/NavBar.jsx'

const Notebook = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState([false, false]); // constant for checked to-do list under ListItems from RNE
	{/*load in all fonts used for this page*/ }
	const [fontsLoaded, fontError] = useFonts({
		'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
		'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
		'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});

	{/*return an error if the fonts fail to load*/ }
	if (!fontsLoaded && !fontError) {
		return null;
	}
	//place holder variables for todo tasks when testing
	initialFirstName = "Daniel"
	initialLastName = "Moreno"
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }
	return (
		<ScrollView style={styles.container}>
			{/*create the default phone status bar at the top of the screen*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*top row of buttons*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>
					
					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="To-Do" specifiedStyle={styles.ovals} onPress={() => { router.push('/privacypolicy') }} />
						
					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.oval} onPress={() => router.push('/privacypolicy')} />
					</Col>
				</Row>
				
			
			</View>
			<View style={styles.cardView}>
			<Card>
				<Card.Title>CARD WITH DIVIDER</Card.Title>
				<Card.Divider />
				
				</Card>
			</View>
			<View style={{justifyContent: 'flex-end', flex: 1}}>
				<NavBar notebookSelected/>
			</View>
		</ScrollView>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY
    },
	topContainer: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		alignItems: 'center',
		zIndex: 1,
	},
	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		//transform: [{ scaleX: 2 }],
		//marginTop: -250,
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',
		marginBottom: 20
		
	},
	ovals: {
		backgroundColor: Colors.ALMOND_TAN,
		width: 180,
		height: 180,
		borderRadius: 180 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		//transform: [{ scaleX: 2 }],
		//marginTop: -250,
		paddingTop: 120,
		marginTop: -90,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Domine-Regular',
		marginBottom: 20

	},
	cardView: {
		backgroundColor: Colors.ALMOND_TAN,
		justifyContent: 'center',
		marginTop: 10,
		border: 1,
		borderColor: 'black',
		borderRadius: 5
    },

	circle: {
		width: 40,
		height: 40,
		borderRadius: 40 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		backgroundColor: Colors.PERIWINKLE_GRAY,
	},
	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
		marginTop: -130,
	},
	avatarImg: {
		width: 130,
		height: 130,
		borderWidth: 2,
		borderRadius: 75,
		marginTop: 25,
	},
	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
		fontFamily: 'Domine-Regular',
	},
	//style for the grid layout
	btnGridContainer: {
		flex: 4, // # of columns
		marginHorizontal: "auto",
		width: '100%',
		//marginTop: 12,
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	}
})

export default Notebook;



				
				
