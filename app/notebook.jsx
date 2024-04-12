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
import { Tab, TabView, ListItem } from '@rneui/themed';
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'

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
		<>
			<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
			<Text>pre text</Text>
			<Tab
				value={index}
				onChange={(e) => setIndex(e)}
				indicatorStyle={{
					backgroundColor: 'green',
					height: 3
				}}
				containerStyle={{ backgroundColor: Colors.ALMOND_TAN }}
				variant="primary"
			>
				<Tab.Item
					title="todo"
					titleStyle={{ fontSize: 18, color:'black' }}
					//icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
				/>
				<Tab.Item
					title="notebook"
					titleStyle={{ fontSize: 18, color: 'black'}}
					//backgroundColor={Colors.ALMOND_TAN}
					//containerStyle={{ backgroundColor: Colors.ALMOND_TAN}}
					//icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
				/>
			</Tab>

			<TabView value={index} onChange={setIndex} animationType="spring">
				<TabView.Item style={{ backgroundColor: Colors.SANTA_GRAY, width: '100%' }}>
					<Text>
					
						<ListItem bottomDivider
							//style={{ backgroundColor :Colors.ALMOND_TAN }}
						>
							<ListItem.CheckBox
								// Use ThemeProvider to change the defaults of the checkbox
								iconType="material-community"
								checkedIcon="checkbox-marked"
								uncheckedIcon="checkbox-blank-outline"
								checked={checked[0]}
								onPress={() => setChecked([!checked[0], checked[1]])}
								//backgroundColor={Colors.MEDIUM_TAUPE}
							/>
							<ListItem.Content
								//backgroundColor={Colors.MEDIUM_TAUPE}
							>
								<ListItem.Title>
									<Input
										//change leftIcon to right icon for our use
										//leftIcon={<AntDesign name="user" size={24} color={Colors.SOFT_GREEN} />}
										inputContainerStyle={styles.inputBox}
										inputStyle={styles.inputBoxStyle}
										selectionColor={Colors.SANTA_GRAY}
										placeholder='Enter Task'
										//defaultValue={initialLastName}
										autoComplete='name'
										maxLength={256}
									/>

								</ListItem.Title>
								<ListItem.Subtitle>CA, US</ListItem.Subtitle>
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
					</Text>
					{/*End of check box code*/}
					
				</TabView.Item>
				<TabView.Item style={{ backgroundColor: Colors.SANTA_GRAY, width: '100%' }}>
					<Text>Notebook</Text>
				</TabView.Item>
			</TabView>

			<Text>post text</Text>
		</>
	)
};

{/*define all of the custom styles for this page*/ }
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



				
