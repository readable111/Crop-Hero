import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	ScrollView
} from 'react-native'
import { router } from 'expo-router'
import { Col, Row } from '../assets/Grid.jsx'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'
import AppButton from '../assets/AppButton.jsx'
import { DOMStyles, Strong } from '../assets/DOMStyles.jsx'

const ToS = () =>{ 
	{/*TODO: add dark mode*/}
	{/*return the page view with all of its contents*/}
	return(
        <ScrollView style = {styles.container}>
            {/*create the default phone status bar at the top of the screen*/}
            <StatusBar backgroundColor={Colors.WHITE_SMOKE} />
            {/*top row of buttons*/}
            <View style={styles.btnGridContainer}>
                {/*row for title and back arrow*/}
                <Row height={60}>
                    <Col relativeColsCovered={2} alignItems='flex-end'>
                        {/*create the arrow to unwind the stack and go back one page*/}
                        <AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                    </Col>
                    <Col relativeColsCovered={8} alignItems='center'>
                        <Text style={DOMStyles.H2}>Privacy Policy</Text>
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'></Col>
                </Row>
            </View>
            <View style={styles.textBlock}>
                <Text style={DOMStyles.H3}>Interpretation and Definitions</Text>
                <Text style={DOMStyles.H5}>Interpretation</Text>
                <Text style={DOMStyles.P1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Diam quam nulla porttitor massa id neque aliquam vestibulum. Tristique et egestas quis ipsum suspendisse. Et ultrices neque ornare aenean euismod elementum. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Laoreet non curabitur gravida arcu. Sed arcu non odio euismod lacinia. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit.</Text>
                <Text style={DOMStyles.H5}>Definitions</Text>
                <Text style={DOMStyles.P1}>For the purposes of this Privacy Policy:</Text>
                <Text style={DOMStyles.P1List}>• <Strong>Lorem ipsum:</Strong> euismod in</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.SANTA_GRAY,
		height: '100%',
	},
    btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 0,
		marginBottom: 10,
        backgroundColor: Colors.ALMOND_TAN,
	},
    textBlock: {
        marginLeft: 20,
        marginTop: 20,
    }
})

export default ToS;
