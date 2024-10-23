/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

import React, { useState, useEffect } from 'react';
import { 
	Alert,
    Image, 
    View, 
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Color'
import AppButton from '../AppButton.jsx'
import UploadModal from './UploadModal.jsx'
import imgPlaceholder from "./AvatarPlaceholder.png"


const UploadImage = ({ style, isEditable=true, cameraMode="selfie", darkMode=false }) => {
    //data storage for later, maybe: https://www.youtube.com/watch?v=B1dWuh3U4O8
	const [modalVisible, setModalVisible] = useState(false);
	const [imageURI, setImageURI] = useState('');

	useEffect(() => {
		// declare the async data fetching function
		const fetchImageURI = async () => {
			const JSON_VALUE = await AsyncStorage.getItem('profile_uri');
			let result = null
    		if (JSON_VALUE && JSON_VALUE !== "") {
				result = JSON_VALUE
			}
			setImageURI(result)
		}
	  
		// call the function
		fetchImageURI()
		  	// make sure to catch any error
		  	.catch(console.error);
	}, [])

	//lets user upload an image after they take a new picture with their camera
	const uploadImage = async (mode) => {
		try {
			let result = {};

			//check if the mode is media gallery
			if (mode === "gallery") {
				await ImagePicker.requestMediaLibraryPermissionsAsync();
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images, //only let user select images, not videos
					allowsEditing: true, //allows crop, rotate, flip depending on OS
					aspect: [1, 1], //set default aspect ratio, only affects Android OS
					quality: 1, //sets basic compression level by expo-image-picker
				});
			} 
			//check if the mode is selfie for front-facing camera
			else if (mode === "selfie" || mode === "front") {
				await ImagePicker.requestCameraPermissionsAsync(); //wait for permission to access camera
				result = await ImagePicker.launchCameraAsync({ //launch the camera
					cameraType: ImagePicker.CameraType.front, //default the camera to the front one since it is a selfie
					allowsEditing: true, //allows crop, rotate, flip depending on OS
					aspect: [1, 1], //set default aspect ratio, only affects Android OS
					quality: 1, //sets basic compression level by expo-image-picker
				});
			}
			//otherwise, assume that the mode was for the back camera
			else {
				await ImagePicker.requestCameraPermissionsAsync(); //wait for permission to access camera
				result = await ImagePicker.launchCameraAsync({ //launch the camera
					cameraType: ImagePicker.CameraType.back, //default the camera to the back one
					allowsEditing: true, //allows crop, rotate, flip depending on OS
					aspect: [1, 1], //set default aspect ratio, only affects Android OS
					quality: 1, //sets basic compression level by expo-image-picker
				});
			}
			

			//canceled is true if the system UI is closed without selecting an image
			//so save image if new image is selected
			if (!result.canceled) {
				await saveImage(result.assets[0].uri)
			}
		} catch (error) {
			Alert.alert("Error uploading image: " + error.message)
			setModalVisible(false)
		}
	};

	//overwrite the saved image with null
	const removeImage = async() => {
		try {
			saveImage('')
			await AsyncStorage.setItem('profile_uri', '')
		} catch (error) {
			alert(error)
			setModalVisible(false)
		}
	};

	//save the selected image's URI and close the modal
	const saveImage = async(image) => {
		//early return if image is an empty string, like when removeImage is triggered
		if (image == '') {
			setImageURI('')
			setModalVisible(false)
			return
		}

		try {
			setImageURI(image)
			setModalVisible(false)
			console.log(image.toString())
			await AsyncStorage.setItem('profile_uri', image.toString())
		} catch (error) {
			throw error;
		}
	};

    //if it is editable, render the edit button and modal with the avatar image
    if (isEditable) {
		return (
			<View style={[styles.container, style]}>
				{/*display either the avatar image placeholder or the specified image*/}
				<Image
					style={styles.avatarImg}
					source={imageURI ? {uri: imageURI} : imgPlaceholder} //if there is a selected image, display that; otherwise, display the placeholder
				/>
	
				{/*display the edit button; clicking it will display the modal*/}
				<AppButton testID={"open"} title="" mci="image-edit-outline" mciSize={30} mciColor={darkMode ? Colors.WHITE_SMOKE : Colors.ALMOST_BLACK} specifiedStyle={styles.editBtn} onPress={() => setModalVisible(true)}/>
	
				{/*render the modal which will appear once the button is pressed*/}
				<UploadModal modalVisible={modalVisible} 
					onBackPress={() => setModalVisible(false)} //disappear if it is clicked outside of the modal
					onCameraPress={() => uploadImage(cameraMode)} //trigger camera when that icon is pressed
					onGalleryPress={() => uploadImage("gallery")} //trigger gallery when that icon is pressed
					onRemovePress={() => removeImage()} //remove the image when that icon is passed
				/>
			</View>
		);        
    } 
    //otherwise, just render the avatar image
    else {
        return (
            <View style={[styles.container, style]}>
				{/*display either the avatar image placeholder or the specified image*/}
                <Image
                    style={styles.avatarImg}
                    source={imageURI ? {uri: imageURI} : imgPlaceholder} //if there is a selected image, display that; otherwise, display the placeholder
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
	container: {
		height: 130,
        width: 200,
        alignItems: 'center',
	},
	avatarImg: {
		width: 130,
		height: 130,
		borderWidth: 2,
		borderRadius: 75,
	},
	editBtn: {
		width: 50,
    	height: 50,
    	borderRadius: 50 / 2, //borderRadius cannot exceed 50% of width or React-Native makes it into a diamond
		backgroundColor: Colors.IRISH_GREEN,
		marginTop: -50,
		marginLeft: 130,
        alignItems: 'center',
        justifyContent: 'center',
	},
})

export default UploadImage;