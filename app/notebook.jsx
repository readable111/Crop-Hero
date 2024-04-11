import { React, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	StatusBar, 
	Text,
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
	<>
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
		<Text>pre text</Text>
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
			title="todo"
			titleStyle={{ fontSize: 12 }}
			icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
		/>
		<Tab.Item
			title="notebook"
			titleStyle={{ fontSize: 12 }}
			icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
		/>
		</Tab>

		<TabView value={index} onChange={setIndex} animationType="spring">
			<TabView.Item style={{ backgroundColor: Colors.SANTA_GRAY, width: '100%' }}>
				<Text>To-Do</Text>
			</TabView.Item>
			<TabView.Item style={{ backgroundColor: Colors.SANTA_GRAY, width: '100%' }}>
				<Text>Notebook</Text>
			</TabView.Item>
		</TabView>

		<Text>post text</Text>
	</>
	)
};

{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	topContainer: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
		flex: 1,
		alignItems: 'center',
		zIndex: 1,
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
