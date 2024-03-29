{/*created to establish HTML and DOM like tags for specific pages that only contain text which needs to be formatted in a consistent manner*/}

import { React } from 'react';
import { 
	StyleSheet, 
	Text, 
} from 'react-native'
import { useFonts } from 'expo-font'

let customFonts = {
	'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
	'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
	'Domine-Bold': require('../assets/fonts/Domine-Bold.ttf'),
	'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
};
{/*dummy code to load fonts for later use without running into hook issues*/}
const App = () => {
	const [isLoaded] = useFonts(customFonts);
	if (!isLoaded) {
	  return (<Text></Text>);
	}
	return (<Text></Text>);
}

{/*export HTML-like styles*/}
export const DOMStyles = StyleSheet.create({
    H1: {
        fontSize: 48,
        fontFamily: 'Domine-Medium',
		color: 'black',
		textAlign: 'center',
		textAlignVertical: 'center',
    },
	H2: {
        fontSize: 36,
        fontFamily: 'Domine-Medium',
		color: 'black',
		textAlign: 'center',
		textAlignVertical: 'center',
    },
	H3: {
        fontSize: 24,
        fontFamily: 'Domine-Medium',
		color: 'black',
		marginTop: 10,
    },
	H4: {
        fontSize: 20,
        fontFamily: 'Domine-Medium',
		color: 'black',
		marginTop: 10,
    },
	H5: {
        fontSize: 18,
        fontFamily: 'Domine-Medium',
		color: 'black',
		marginTop: 10,
    },
	H6: {
        fontSize: 12,
        fontFamily: 'Domine-Medium',
		color: 'black',
		marginTop: 12,
    },
	P1: {
		fontSize: 16,
        fontFamily: 'WorkSans-Regular',
		color: 'black',
		marginTop: 4,
	},
	P2: {
		fontSize: 12,
        fontFamily: 'WorkSans-Regular',
		color: 'black',
		marginTop: 4,
	},
	P1List: {
		fontSize: 16,
        fontFamily: 'WorkSans-Regular',
		color: 'black',
		paddingLeft: 10,
	},
	Caption: {
		fontSize: 10,
        fontFamily: 'WorkSans-Regular',
		color: 'black',
		marginTop: 4,
	},
	Footnote: {
		fontSize: 8,
        fontFamily: 'WorkSans-Regular',
		color: 'black',
		marginTop: 4,
	}
});
{/*export HTML-like strong tag to create bold text in line with standard text*/}
export const Strong = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>