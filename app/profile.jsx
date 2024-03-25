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


const Profile = () =>{ 
	const [fontsLoaded, fontError] = useFonts({
	'WorkSans-Semibold': require('../assets/fonts/WorkSans/WorkSans-SemiBold.ttf'),
	'Domine-Medium': require('../assets/fonts/Domine/Domine-Medium.ttf'),
	'Domine-Regular': require('../assets/fonts/Domine/Domine-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
		
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
		<AppButton title="Edit Profile" specifiedStyle={styles.editProfileBtn} backgroundColor={Colors.SCOTCH_MIST_TAN} onPress={() => Alert.alert('Simple Button pressed')}/>
		<View style={styles.btnGridContainer}>
			<Row height={40}>
				<Col relativeColsCovered={2} alignItems='flex-end'>
					<AppButton title="" specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
				<Col relativeColsCovered={8}>
					<Text>    Settings</Text>
				</Col>
				<Col relativeColsCovered={2}>
					<AppButton title="" specifiedStyle={styles.circle} onPress={() => Alert.alert('Icon Button pressed')}/>
				</Col>
			</Row>
			<Row height={33}>
				<Col relativeColsCovered={1}>
					<Text>First column</Text>
				</Col>
				<Col relativeColsCovered={3}>
					<Text>Second Column</Text>
				</Col>
				<Col relativeColsCovered={8}>
					<Text>Third Column</Text>
				</Col>
			</Row>
			<Row height={40}>
				<Col relativeColsCovered={4}>
				<Text>Whole Column</Text>
				</Col>
			</Row>
		</View>
	</View>
	)
};


{/*creates a custom button that changes opacity when touched, allows user to specify text style & background color*/}
const AppButton = ({ onPress, title, specifiedStyle, backgroundColor='' }) => {
	if (!backgroundColor) {
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
				  <Text style={specifiedStyle}>{title}</Text>
			</TouchableOpacity>
		)
	} else {
		return  (
			<TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.appButtonContainer, backgroundColor && {backgroundColor}]}>
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
		textAlign: 'center',
		textAlignVertical: 'center',
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
    	backgroundColor: "red",
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
