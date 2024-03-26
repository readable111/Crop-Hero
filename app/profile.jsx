import { useCallBack } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Scrollable, 
	StatusBar, 
	Image, 
	Alert,
	TouchableOpacity
} from 'react-native'
import { useFonts } from 'expo-font'
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js'


const Profile = () =>{ 
	{/*load in all fonts used for this page*/}
	const [fontsLoaded, fontError] = useFonts({
	'WorkSans-Semibold': require('../assets/fonts/WorkSans/WorkSans-SemiBold.ttf'),
	'Domine-Medium': require('../assets/fonts/Domine/Domine-Medium.ttf'),
	'Domine-Regular': require('../assets/fonts/Domine/Domine-Regular.ttf'),
	});
	{/*return an error if the fonts fail to load*/}
	if (!fontsLoaded && !fontError) {
		return null;
	}
		
	{/*return the page view with all of tits contents*/}
	return(
	<View style = {styles.topContainer}>
		{/*create the default phone status bar at the top of the screen*/}
		<StatusBar backgroundColor={Colors.WHITE_SMOKE} />
		{/*green oval at the top to denote profile picture and name*/}
		<Text style = {styles.oval}></Text>
		<Text style = {styles.profileName}>Daniel Moreno</Text>
		<Image
			style={styles.avatarImg}
			source = {require('../assets/ProfilePageImages/AvatarPlaceholder.png')}
		/>
		{/*add edit profule button*/}
		<AppButton title="Edit Profile" specifiedStyle={styles.editProfileBtn} backgroundColor={Colors.SCOTCH_MIST_TAN} onPress={() => Alert.alert('Simple Button pressed')}/>
		{/*add grid of profile options*/}
		<View style={styles.btnGridContainer}>
			{/*row for profile settings*/}
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton title="" icon={Icons.gear_big_empty} specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={{fontFamily: 'WorkSans-Semibold', fontSize: 16}}>    Settings</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" icon={Icons.arrow_right} specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
			</Row>
			<Row height={33}>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
				<Col relativeColsCovered={4}>
					<Text></Text>
				</Col>
			</Row>
			{/*row for billing details*/}
			<Row height={40}>
			<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton title="" icon={Icons.credit_card} specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text style={{fontFamily: 'WorkSans-Semibold', fontSize: 16}}>    Billing Details</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" icon={Icons.arrow_right} specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
			</Row>
		</View>
	</View>
	)
};


{/*creates a custom button that changes opacity when touched, allows user to specify text style & background color*/}
const AppButton = ({ onPress, title='Press me', icon, specifiedStyle, backgroundColor='' }) => {
	{/*containerless button with/without title and without icon*/}
	if (!backgroundColor && !icon) {
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
				  <Text style={specifiedStyle}>{title}</Text>
			</TouchableOpacity>
		)
	} 
	else if (backgroundColor && title && !icon) { {/*container button with title and without icon*/}
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.appButtonContainer, backgroundColor && {backgroundColor}]}>
				<Text style={specifiedStyle}>{title}</Text>
			</TouchableOpacity>
		)
	}
	else if (icon && !title) { {/*button without title and with icon*/}
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
					<Image 
						style={specifiedStyle}
						source={icon}
					/>
			</TouchableOpacity>
		)
	}
	else { {/*default to containerless, no icon*/}
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
				  <Text style={specifiedStyle}>{title}</Text>
			</TouchableOpacity>
		)
	}
}

{/*define special tags for my grid layout*/}
const Col = ({ relativeColsCovered, children, alignItems='flex-start'}) => {
	return  (
		<View style={[styles[`${relativeColsCovered}col`], styles.baseCol, alignItems && {alignItems}]}>{children}</View>
	)
}
const Row = ({ children, height }) => (
	<View style={[styles.row, height && {height}]}>{children}</View>
)

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
	appButtonContainer: {
		elevation: 8,
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 50,
		paddingHorizontal: 12,
		marginTop: 12,
		width: 172,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconAppButtonContainer: {
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	iconAppButton: {
		padding: 12,
	},
	editProfileBtn: {
		fontSize: 16,
		color: "black",
		alignSelf: "center",
		fontFamily: 'Domine-Regular',
	},
	//set of styles for the grid layout with the 1-12col styles being for specific widths
	btnGridContainer: {
		flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: 400,
		marginTop: 12,
	},
	row: {
		flexDirection: "row",
	},
	baseCol: {
		paddingLeft: 5,
		justifyContent: 'center',
	},
	"1col":  {
		flex:  1
	},
	"2col":  {
		flex:  2
	},
	"3col":  {
		flex:  3
	},
	"4col":  {
		flex:  4,
	},
	"5col":  {
		flex:  5,
	},
	"6col":  {
		flex:  6,
	},
	"7col":  {
		flex:  7,
	},
	"8col":  {
		flex:  8,
	},
	"9col":  {
		flex:  9,
	},
	"10col":  {
		flex:  10,
	},
	"11col":  {
		flex:  11,
	},
	"12col":  {
		flex:  12,
	},
})

export default Profile;
