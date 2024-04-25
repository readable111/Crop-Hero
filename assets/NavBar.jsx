import { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Image, 
	Alert,
    Dimensions
} from 'react-native'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Col, Row } from './Grid.jsx'
import Colors from './Color.js'
import AppButton from './AppButton.jsx'

const NavBar = ({ homeSelected=false, cropsSelected=false, notebookSelected=false, dataHubSelected=false, profileSelected=false}) => {

    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Semibold': require('./fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('./fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('./fonts/Domine-Regular.ttf'),
    });

    {/*return an error if the fonts fail to load*/}
    if (!fontsLoaded && !fontError) {
        return null;
    }

	return  (
        <View style={{height: 100, width: '100%', alignItems: 'center', marginTop: 'auto'}}>
            <View style={styles.navbarCircle}></View>
            <View style={styles.btnGridContainer}>
                <Row height={35}>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="" mci="grass" mciSize={35} mciColor={cropsSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/crops')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="" mci={notebookSelected ? "notebook-edit" : "notebook-edit-outline"} mciSize={30} mciColor={notebookSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/notebook')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="" mci={homeSelected ? "home" : "home-outline"} mciSize={35} mciColor={homeSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/home')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="" mci={dataHubSelected ? "chart-box" : "chart-box-outline"} mciSize={35} mciColor={dataHubSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => Alert.alert('Test')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="" mci={profileSelected ? "account" : "account-outline"} mciSize={35} mciColor={profileSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/profile')}/>
                        </Col>
                </Row>
                <Row height={25}>
                    <Col relativeColsCovered={4} alignItems='center'>
                        <AppButton title="Crops" specifiedStyle={cropsSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/crops')}/>
                    </Col>
                    <Col relativeColsCovered={4} alignItems='center'>
                        <AppButton title="Notebook" specifiedStyle={notebookSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/notebook')}/>
                    </Col>
                    <Col relativeColsCovered={4} alignItems='center'>
                        <AppButton title="Home" specifiedStyle={homeSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/home')}/>
                    </Col>
                    <Col relativeColsCovered={4} alignItems='center'>
                        <AppButton title="Data Hub" specifiedStyle={dataHubSelected ? styles.selectedText : styles.unselectedText} onPress={() => Alert.alert('Test')}/>
                    </Col>
                    <Col relativeColsCovered={4} alignItems='center'>
                        <AppButton title="Profile" specifiedStyle={profileSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/profile')}/>
                    </Col>
                </Row>
            </View>
        </View>
	)
}

{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	//style for the grid layout
	btnGridContainer: {
		flex: 20, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
        backgroundColor: Colors.ALMOND_TAN,
        height: 50,
	},
    selectedText: {
        color: Colors.MALACHITE,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
    },
    unselectedText: {
        color: Colors.SOFT_GREEN,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
    },
    navbarCircle: {
		width: 96,
    	height: 96,
    	borderRadius: 96 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.ALMOND_TAN,
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -64,
	},
})

export default NavBar;