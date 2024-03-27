import { useCallBack } from 'react';
import { 
	StyleSheet, 
	Text, 
	Image, 
	TouchableOpacity
} from 'react-native'

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

const styles = StyleSheet.create({
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
	}
})

export default AppButton;