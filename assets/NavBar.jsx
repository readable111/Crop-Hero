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

const NavBar = ({ homeSelected=false, cropsSelected=false, notebookSelected=false, dataHubSelected=false, profileSelected=false, darkMode=false}) => {

    const [fontsLoaded, fontError] = useFonts({
        'WorkSans-Semibold': require('./fonts/WorkSans-SemiBold.ttf'),
        'Domine-Medium': require('./fonts/Domine-Medium.ttf'),
        'Domine-Regular': require('./fonts/Domine-Regular.ttf'),
    });

    {/*return an error if the fonts fail to load*/}
    if (!fontsLoaded && !fontError) {
        return null;
    }

    //if darkMode is false, return it in light mode
    if (!darkMode) {
        return  (
            <View style={{height: 130, width: '100%', alignItems: 'center', marginTop: 'auto'}}>
                <View style={styles.btnGridContainerTop}>
                    <Row height={50}>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <View style={styles.navbarCircle}></View>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                    </Row>
                </View>
                <View style={styles.btnGridContainerBottom}>
                    <Row height={35}>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci="grass" mciSize={35} mciColor={cropsSelected ? Colors.MALACHITE : Colors.SPANISH_GREEN} onPress={() => router.replace('/crops')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={notebookSelected ? "notebook-edit" : "notebook-edit-outline"} mciSize={30} mciColor={notebookSelected ? Colors.MALACHITE : Colors.SPANISH_GREEN} onPress={() => router.replace('/todo')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" opacity={0.8} specifiedStyle={homeSelected ? styles.btnCircleSelected : styles.btnCircle} mci={homeSelected ? "home" : "home-outline"} mciSize={35} mciColor={homeSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/home')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={dataHubSelected ? "chart-box" : "chart-box-outline"} mciSize={35} mciColor={dataHubSelected ? Colors.MALACHITE : Colors.SPANISH_GREEN} onPress={() => router.replace('/datahub')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={profileSelected ? "account" : "account-outline"} mciSize={35} mciColor={profileSelected ? Colors.MALACHITE : Colors.SPANISH_GREEN} onPress={() => router.replace('/profile')}/>
                            </Col>
                    </Row>
                    <Row height={25}>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Crops" specifiedStyle={cropsSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/crops')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Notebook" specifiedStyle={notebookSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/todo')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Home" specifiedStyle={homeSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/home')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Data Hub" specifiedStyle={dataHubSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/datahub')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Profile" specifiedStyle={profileSelected ? styles.selectedText : styles.unselectedText} onPress={() => router.replace('/profile')}/>
                        </Col>
                    </Row>
                </View>
            </View>
        )
    } else {
        return  (
            <View style={{height: 130, width: '100%', alignItems: 'center', marginTop: 'auto'}}>
                <View style={styles.btnGridContainerTop}>
                    <Row height={50}>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <View style={styles.navbarCircleDark}></View>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                            <Col relativeColsCovered={4} alignItems='center'></Col>
                    </Row>
                </View>
                <View style={styles.btnGridContainerBottomDark}>
                    <Row height={35}>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci="grass" mciSize={35} mciColor={cropsSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/crops')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={notebookSelected ? "notebook-edit" : "notebook-edit-outline"} mciSize={30} mciColor={notebookSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/todo')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" opacity={0.8} specifiedStyle={homeSelected ? styles.btnCircleSelectedDark : styles.btnCircleDark} mci={homeSelected ? "home" : "home-outline"} mciSize={35} mciColor={homeSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/home')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={dataHubSelected ? "chart-box" : "chart-box-outline"} mciSize={35} mciColor={dataHubSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/datahub')}/>
                            </Col>
                            <Col relativeColsCovered={4} alignItems='center'>
                                <AppButton title="" mci={profileSelected ? "account" : "account-outline"} mciSize={35} mciColor={profileSelected ? Colors.MALACHITE : Colors.SOFT_GREEN} onPress={() => router.replace('/profile')}/>
                            </Col>
                    </Row>
                    <Row height={25}>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Crops" specifiedStyle={cropsSelected ? styles.selectedTextDark : styles.unselectedTextDark} onPress={() => router.replace('/crops')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Notebook" specifiedStyle={notebookSelected ? styles.selectedTextDark : styles.unselectedTextDark} onPress={() => router.replace('/todo')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Home" specifiedStyle={homeSelected ? styles.selectedTextDark : styles.unselectedTextDark} onPress={() => router.replace('/home')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Data Hub" specifiedStyle={dataHubSelected ? styles.selectedTextDark : styles.unselectedTextDark} onPress={() => router.replace('/datahub')}/>
                        </Col>
                        <Col relativeColsCovered={4} alignItems='center'>
                            <AppButton title="Profile" specifiedStyle={profileSelected ? styles.selectedTextDark : styles.unselectedTextDark} onPress={() => router.replace('/profile')}/>
                        </Col>
                    </Row>
                </View>
            </View>
        )
    }
}

{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	//style for the grid layout
	btnGridContainerBottom: {
		flex: 20, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
        backgroundColor: Colors.ALMOND_TAN,
        height: 100,
	},
    btnGridContainerTop: {
		flex: 20, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
        backgroundColor: 'clear',
        height: 'auto',
	},
    selectedText: {
        color: Colors.MALACHITE,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
        marginTop: 0,
    },
    unselectedText: {
        color: Colors.SPANISH_GREEN,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
        marginTop: 0,
    },
    navbarCircle: {
		width: 80,
    	height: 80,
    	borderRadius: 80 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.ALMOND_TAN,
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -83,
	},
    btnCircle: {
		width: 55,
    	height: 55,
    	borderRadius: 55 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.IRISH_GREEN,
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
	},
    btnCircleSelected: {
		width: 55,
    	height: 55,
    	borderRadius: 55 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.IRISH_GREEN,
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,

        shadowColor: Colors.HOT_GREEN,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
	},



    btnGridContainerBottomDark: {
		flex: 20, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
        backgroundColor: Colors.CHARCOAL,
        height: 100,
	},
    selectedTextDark: {
        color: Colors.MALACHITE,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
        marginTop: 0,
    },
    unselectedTextDark: {
        color: Colors.SOFT_GREEN,
        fontSize: 14,
        fontFamily: 'Domine-Regular',
        marginTop: 0,
    },
    navbarCircleDark: {
		width: 80,
    	height: 80,
    	borderRadius: 80 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.CHARCOAL,
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -83,
	},
    btnCircleDark: {
		width: 55,
    	height: 55,
    	borderRadius: 55 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.IRISH_GREEN,
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
	},
    btnCircleSelectedDark: {
		width: 55,
    	height: 55,
    	borderRadius: 55 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it weird
		backgroundColor: Colors.IRISH_GREEN,
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,

        shadowColor: Colors.HOT_GREEN,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
	},
})

export default NavBar;