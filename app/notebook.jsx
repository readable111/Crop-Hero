import { React} from 'react';
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
import { Tabs } from 'antd'

const Notebook = () =>{ 
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
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
		{/*green oval at the top to denote profile picture and name*/}
		{/* START of ANT Code*/}
		<Tabs
    			defaultActiveKey="1"
    			centered
    			items={new Array(3).fill(null).map((_, i) => {
      			const id = String(i + 1);
     			return {
        			label: `Tab ${id}`,
        			key: id,
        			children: `Content of Tab Pane ${id}`,
     			};
    			})}
  		/>
		
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
