import { React, Component, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	FlatList,
	Modal,
	Platform,
	TouchableOpacity,
	Alert,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font'
import { SearchBar, ListItem } from '@rneui/themed';
import unidecode from 'unidecode';
import Colors from './Color.js'

const SearchModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
}) => {

    const [fontsLoaded, fontError] = useFonts({
        'Domine-Regular': require('./fonts/Domine-Regular.ttf'),
        'WorkSans-Regular': require('./fonts/WorkSans-Regular.ttf'),
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Modal animationType='fade' visible={modalVisible} transparent={true}>
            <Pressable style={styles.modalContainer} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

                { !isLoading && (
                    <View style={[styles.modalView, {backgroundColor: Colors.ALMOND_TAN}]}>
                        <Text>Search Modal</Text>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({ 
	container: { 
		padding: 2, 
		width: '100%',
		backgroundColor: 'none',
		alignContent: 'flex-start',
		verticalAlign: 'bottom',
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		zIndex: 9999,
		elevation: (Platform.OS === 'android') ? 9999 : 0,
	}, 
	item: { 
		backgroundColor: Colors.SCOTCH_MIST_TAN, 
		padding: 10, 
		marginVertical: 6, 
		marginHorizontal: 10, 
	}, 
	listStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
		position: 'absolute',
		top: 65,
		alignSelf: 'center',
		width: '86%',
	},
	modalContainer: {
		height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
	modalView: {
        height: 130,
        width: '80%',
        alignItems: 'center',
        borderRadius: 25,
    },
});

export default SearchModal;