import { React, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Image, 
	Alert
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { Tab, TabView,ListItem } from '@rneui/themed';

const Notebook = () => { 
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState([false, false]); // constant for checked to-do list under ListItems from RNE
	{/*load in all fonts used for this page*/}
	const [fontsLoaded, fontError] = useFonts({
	'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
	'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	});
	
	{/*return an error if the fonts fail to load*/}
	if (!fontsLoaded && !fontError) {
		return null;
	}

	{/*TODO: add dark mode*/}
	{/*return the page view with all of its contents*/}
	return(
	<View style = {styles.topContainer}>
			{ /*Create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
		{ /*green oval at the top to denote profile picture and name*/}
		<Text>text</Text>
	
			<Tab
				value={index}
				onChange={(e) => setIndex(e)}
				indicatorStyle={{
					backgroundColor: 'white',
					height: 3,
				}}
				variant="primary"
			>
				<Tab.Item
					title="To-Do"
					titleStyle={{ fontSize: 12 }}
					//icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
					//Start of To-Do code using ReactNativeElements List Item
				/>	

				<Tab.Item
					title="NoteBook"
					titleStyle={{ fontSize: 12 }}
					//icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
				/>

				
			</Tab>
			<TabView value={index} onChange={setIndex} animationType="spring" style={{ width: '100%',height: '100%'} }>
				<TabView.Item style={{ backgroundColor: 'red', width: '100%', height:'100%' }}>
					<Text>To-Do</Text>
					{/*
					<ListItem bottomDivider>
						<ListItem.CheckBox
							// Use ThemeProvider to change the defaults of the checkbox
							iconType="material-community"
							checkedIcon="checkbox-marked"
							uncheckedIcon="checkbox-blank-outline"
							checked={checked[1]}
							onPress={() => setChecked([checked[0], !checked[1]])}
						/>
						<ListItem.Content>
							<ListItem.Title>User 2</ListItem.Title>
							<ListItem.Subtitle>HR, India</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
					<ListItem bottomDivider>
						<ListItem.CheckBox
							// Use ThemeProvider to change the defaults of the checkbox
							iconType="material-community"
							checkedIcon="checkbox-marked"
							uncheckedIcon="checkbox-blank-outline"
							checked={checked[1]}
							onPress={() => setChecked([checked[0], !checked[1]])}
						/>
						<ListItem.Content>
							<ListItem.Title>User 2</ListItem.Title>
							<ListItem.Subtitle>HR, India</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
					{/*End of check box code*}
					*/}
				</TabView.Item>
				<TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
					<Text h1>Favorite</Text>
				</TabView.Item>
				
			</TabView>
			<Text>text</Text>
	</View>
	)
};

{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	topContainer: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		alignItems: 'center',
	},
	oval: {
		backgroundColor: Colors.IRISH_GREEN,
		width: 300,
		height: 420,
		borderRadius: 300 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		transform: [{ scaleX: 2 }],
		marginTop: -250,
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
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 12,
	}
})

export default Notebook;
