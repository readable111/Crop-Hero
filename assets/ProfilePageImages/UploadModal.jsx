/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import { 
	StyleSheet, 
	View, 
	Text, 
    Modal,
    Pressable,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { useFonts } from 'expo-font'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Col, Row } from '../Grid.jsx'
import { DOMStyles } from '../DOMStyles.jsx'
import Colors from '../Color.js'

const UploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
}) => {

    const [fontsLoaded, fontError] = useFonts({
        'Domine-Regular': require('../fonts/Domine-Regular.ttf'),
        'WorkSans-Regular': require('../fonts/WorkSans-Regular.ttf'),
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Modal animationType='fade' visible={modalVisible} transparent={true}>
            <Pressable style={styles.container} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

                { !isLoading && (
                    <View style={[styles.modalView, {backgroundColor: Colors.ALMOND_TAN}]}>
                        <Text style={DOMStyles.H3}>Profile Photo</Text>
                        <View style={styles.decisionRow}>
                            <Row height={70}>
                                <Col relativeColsCovered={4} alignItems='center'>
                                    <TouchableOpacity style={styles.optionBtn} onPress={onCameraPress} activeOpacity={0.65}>
                                        <MaterialCommunityIcons name="camera-outline" size={30} color={Colors.IRISH_GREEN} />
                                        <Text style={DOMStyles.Caption}>Camera</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col relativeColsCovered={4} alignItems='center'>
                                    <TouchableOpacity style={styles.optionBtn} onPress={onGalleryPress} activeOpacity={0.65}>
                                        <MaterialCommunityIcons name="image-outline" size={30} color={Colors.IRISH_GREEN} />
                                        <Text style={DOMStyles.Caption}>Gallery</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col relativeColsCovered={4} alignItems='center'>
                                    <TouchableOpacity style={styles.optionBtn} onPress={onRemovePress} activeOpacity={0.65}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={30} color={Colors.CHARCOAL} />
                                        <Text style={DOMStyles.Caption}>Remove</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </View>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
};


const styles = StyleSheet.create({
	container: {
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
    decisionRow: {
        flex: 12, // # of columns
    	marginHorizontal: "auto",
    	width: '100%',
		marginTop: 5,
    },
    optionBtn: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: Colors.SCOTCH_MIST_TAN,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionTxt: {
        fontSize: 10,
    },
})

export default UploadModal;