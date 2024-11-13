/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

import { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	ScrollView,
    Appearance
} from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { DOMStyles, Strong } from '../assets/DOMStyles.jsx'

const PrivacyPolicy = () =>{ 
    const [isDarkMode, setIsDarkMode] = useState(false)
    useEffect(() => {
		// declare the async data fetching function
		const fetchDarkModeSetting = async () => {
			const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
			let result = null
    		if (JSON_VALUE && JSON_VALUE !== "") {
				result = JSON.parse(JSON_VALUE)
                console.log("Async: " + result)
			} else {
				colorScheme = Appearance.getColorScheme()
				if (colorScheme == 'dark') {
					result = true
				} else {
					result = false
				}
                console.log("colorScheme: " + result)
			}
			setIsDarkMode(result)
		}
	  
		// call the function
		fetchDarkModeSetting()
		  	// make sure to catch any error
		  	.catch(console.error);
	}, [])
	{/*return the page view with all of its contents*/}
	return(
        <ScrollView style = {[styles.container, isDarkMode && styles.containerDark]}>
            {/*create the default phone status bar at the top of the screen*/}
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
            {/*top row of buttons*/}
            <View style={[styles.btnGridContainer, isDarkMode && styles.btnGridContainerDark]}>
                {/*row for title and back arrow*/}
                <Row height={60}>
                    <Col relativeColsCovered={2} alignItems='flex-end'>
                        {/*create the arrow to unwind the stack and go back one page*/}
                        <AppButton title="" icon={isDarkMode ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                    </Col>
                    <Col relativeColsCovered={8} alignItems='center'>
                        <Text style={[DOMStyles.H2, isDarkMode && styles.textDark]}>Privacy Policy</Text>
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'></Col>
                </Row>
            </View>
            <View style={styles.textBlock}>
                <Text style={[DOMStyles.H3, isDarkMode && styles.textDark]}>Interpretation and Definitions</Text>
                <Text style={[DOMStyles.H5, isDarkMode && styles.textDark]}>Interpretation</Text>
                <Text style={[DOMStyles.P1, isDarkMode && styles.textDark]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Diam quam nulla porttitor massa id neque aliquam vestibulum. Tristique et egestas quis ipsum suspendisse. Et ultrices neque ornare aenean euismod elementum. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Laoreet non curabitur gravida arcu. Sed arcu non odio euismod lacinia. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit.</Text>
                <Text style={[DOMStyles.H5, isDarkMode && styles.textDark]}>Definitions</Text>
                <Text style={[DOMStyles.P1, isDarkMode && styles.textDark]}>For the purposes of this Privacy Policy:</Text>
                <Text style={[DOMStyles.P1List, isDarkMode && styles.textDark]}>• <Strong>Lorem ipsum:</Strong> euismod in</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
	},
    containerDark: {
		backgroundColor: Colors.BALTIC_SEA,
	},
    btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 0,
		marginBottom: 10,
        backgroundColor: Colors.ALMOND_TAN,
	},
    btnGridContainerDark: {
        backgroundColor: Colors.CHARCOAL,
        color: Colors.WHITE_SMOKE
	},
    textBlock: {
        marginLeft: 20,
        marginTop: 0,
        paddingRight: 15,
    },
    textDark: {
        color: Colors.WHITE_SMOKE,
    },
})

export default PrivacyPolicy;
