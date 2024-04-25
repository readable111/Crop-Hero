import { React, useState } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	Text,
	Image,
	Alert,
	ScrollView,
	TouchableOpacity,
	TextInput,

} from 'react-native'
import moment from 'moment'
import date from 'moment'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { Tab, TabView, ListItem, Card, Button, Icon } from '@rneui/themed';
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { Switch } from 'react-native-elements'


const todo = () => {
	const [index, setIndex] = useState(0); //constant for tabs
	const [checked, setChecked] = useState([false, false]); // constant for checked to-do list under ListItems from RNE
	{/*constants for date input*/ }
	//const mask = '[00]{-}[00]{-}[0000]'
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
	initialFirstName = ""
	givenDate = ''
	//givenDate=""
	{/*TODO: add dark mode*/ }
	{/*return the page view with all of its contents*/ }
	return (
		<View style={styles.topContainer}>
			{/*create the default phone status bar at the top of the screen*/}
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			{/*top row of buttons*/}
			<View style={styles.btnGridContainer}>
				{/*row for profile settings*/}
				<Row height={80}>

					<Col relativeColsCovered={2} alignItems='center'>
						{/* <Text style={styles.pageTitle}>Settings</Text>*/}
						<AppButton title="Todo" specifiedStyle={styles.oval} onPress={() =>  router.push('/todo') } />

					</Col>
					<Col relativeColsCovered={2} alignItems='center'>
						<AppButton title="Notebook" specifiedStyle={styles.ovals} onPress={() => router.push('/notebook')} />
					</Col>
				</Row>


			</View>
			<ScrollView style={styles.scroll}>
				<View style={styles.fstContainer}>
					{/**trying this*/}

					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"

					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='name'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
				<View style={styles.fstContainer}>
					<Input
						//rightIcon={<AntDesign name="edit" size={24} color="black" />}
						inputContainerStyle={styles.inputBox}
						inputStyle={styles.inputBoxStyle}
						selectionColor={Colors.SANTA_GRAY}
						placeholder='What happened today?'
						defaultValue={initialFirstName}
						autoComplete='Things I did today...'
						maxLength={256}
						multiline={true}
						textAlign="flex-start"
					/>
					<AppButton specifiedStyle={{ marginTop: -5, zIndex: 1, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
				</View>
			</ScrollView>
		</View>
	)
};

{/*define all of the custom styles for this page*/ }
const styles = StyleSheet.create({
	fstContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		//alignItems: "center",
		padding: 5,
		//paddingVertial: 50,
		marginBottom: 27,
		marginTop: 20,
		//paddingTop:40
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center'
	},
	scroll: {
		//flex: 1,
		//marginTop: 20,
		width: '100%'
	},

	topContainer: {
		backgroundColor: Colors.PERIWINKLE_GRAY,
		//height: '100%',
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
		//marginBottom: '145%',
		zIndex: -1,
		height: 20
	},
	inputBox: {
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'black',
		overflow: 'hidden',
		borderBottomWidth: 2,
		//marginTop: -18,
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		//paddingLeft: 10,
		//marginBottom: 0,
		zIndex: 5,
		flex: 3,
		marginTop: 35,
		marginBottom: -15
	},
	inputDateStyle: {
		paddingBottom: 20,

	},
	inputBoxStyle: {
		fontFamily: 'WorkSans-Regular',
		fontSize: 16,
		color: 'black',
		paddingLeft: 1,
		//height: 20
		padding: 2
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
		//marginBottom: 20

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
		//marginBottom: 20

	},



	profileName: {
		color: 'white',
		fontSize: 36,
		fontFamily: 'Domine-Medium',
		//marginTop: -130,
	},

	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
		fontFamily: 'Domine-Regular',
	},
	//style for the grid layout
	btnGridContainer: {
		//flex: -1, // # of columns
		marginHorizontal: "auto",
		width: '100%',
		//marginTop: 12,
		backgroundColor: Colors.ALMOND_TAN,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1,
		//marginBottom: -20,
		height: '13%'
		//height: 20,



	}
})

export default todo;





