//modal for journal entries
import { React, Component, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	Platform,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
	Dimensions,
	Alert
} from 'react-native';
import { useFonts } from 'expo-font'
import { SearchBar } from '@rneui/themed';
import unidecode from 'unidecode';
import Colors from './Color.js'
import { useRouter, Link, useLocalSearchParams } from 'expo-router'
import { doubleMetaphone } from 'double-metaphone'
import { lemmatize } from 'wink-lemmatizer'
import CROPS from '../test_data/testCropData.json'




const notebookModal = ({
	modalVisible,
	onBackPress,
	isLoading = false,
	originalData
}) => {

	const [searchBarTxt, setSearchBarTxt] = useState(searchValue);

	const [fontsLoaded, fontError] = useFonts({
		'Domine-Regular': require('./fonts/Domine-Regular.ttf'),
		'WorkSans-Regular': require('./fonts/WorkSans-Regular.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	

	return (
		<Modal animationType='slide' visible={modalVisible} transparent={true} onRequestClose={onBackPress}>
			{/*create the dark grey box around it and ability to close modal by clicking*/}
			<Pressable style={styles.modalContainer} onPress={onBackPress}>
				{isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

				{!isLoading && (
					<View style={[styles.modalView, { backgroundColor: Colors.SANTA_GRAY }]} >
						{/*Display the search bar which looks identical to the dropdown search bar but works slightly differents*/}
						<View style={styles.fstContainer}>
							<Input
								inputContainerStyle={styles.inputBox}
								inputStyle={styles.inputBoxStyle}
								selectionColor={Colors.SANTA_GRAY}
								placeholder='Things I did today...'
								defaultValue={entryTwo}
								maxLength={256}
								multiline={true}
								textAlign="flex-start"
							/>
							<AppButton specifiedStyle={{ marginTop: 0, zIndex: 5, alignItems: "flex-end" }} title="" ad="edit" adSize={24} adColor="black" onPress={() => Alert.alert('Icon Button pressed')} />
						</View>
					</View>	
				)}
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	fstContainer: {
		width: '90%',
		backgroundColor: Colors.SCOTCH_MIST_TAN,
		padding: 5,
		marginBottom: 27,
		marginTop: 20,
		border: 'black',
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center'
	},

})
