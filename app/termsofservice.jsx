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
import { DOMStyles } from '../assets/DOMStyles.jsx'

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
                <Row height={120}>
                    <Col relativeColsCovered={2} alignItems='flex-end'>
                        {/*create the arrow to unwind the stack and go back one page*/}
                        <AppButton title="" icon={Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                    </Col>
                    <Col relativeColsCovered={8} alignItems='center'>
                        <Text style={DOMStyles.H2}>Terms & Conditions of Service</Text>
                    </Col>
                    <Col relativeColsCovered={2} alignItems='center'></Col>
                </Row>
            </View>
            <View style={styles.textBlock}>
                <Text style={DOMStyles.H3}>Your rights to use the CropAlly Service and App</Text>
                <Text style={DOMStyles.H5}>Access to the CropAlly Service and App</Text>
                <Text style={DOMStyles.P1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Diam quam nulla porttitor massa id neque aliquam vestibulum. Tristique et egestas quis ipsum suspendisse. Et ultrices neque ornare aenean euismod elementum. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Laoreet non curabitur gravida arcu. Sed arcu non odio euismod lacinia. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit.</Text>
                <Text style={DOMStyles.P1}>Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Orci phasellus egestas tellus rutrum tellus. Lorem ipsum dolor sit amet consectetur adipiscing. Facilisis volutpat est velit egestas dui id ornare arcu. Ut placerat orci nulla pellentesque dignissim enim sit. Id cursus metus aliquam eleifend. Varius sit amet mattis vulputate enim nulla aliquet. Commodo sed egestas egestas fringilla. Aliquam faucibus purus in massa tempor nec. Odio ut sem nulla pharetra diam sit. In hendrerit gravida rutrum quisque. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Aliquet enim tortor at auctor urna nunc. Hac habitasse platea dictumst quisque sagittis purus sit. Magna etiam tempor orci eu lobortis. Blandit turpis cursus in hac.</Text>
                <Text style={DOMStyles.P1}>Velit euismod in pellentesque massa placerat duis ultricies lacus. Mauris in aliquam sem fringilla ut morbi tincidunt. Aliquam ut porttitor leo a diam sollicitudin tempor. Viverra orci sagittis eu volutpat. Eget nunc lobortis mattis aliquam faucibus purus. Sed risus ultricies tristique nulla. Pretium fusce id velit ut tortor. Amet consectetur adipiscing elit pellentesque. Molestie ac feugiat sed lectus vestibulum mattis. Pulvinar elementum integer enim neque volutpat ac tincidunt. Vestibulum lectus mauris ultrices eros in cursus turpis. Purus semper eget duis at tellus at urna condimentum. Sem viverra aliquet eget sit amet tellus cras. Ultricies lacus sed turpis tincidunt. Sit amet massa vitae tortor condimentum lacinia.</Text>
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
        height: 140,
	},
    textBlock: {
        marginLeft: 20,
        marginTop: 0,
        paddingRight: 15,
    }
})

export default ToS;
