/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester Isaac Boodt
 ***/

import React, { useState, useEffect } from 'react';
import { StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        KeyboardAvoidingView, 
        Platform,
        Keyboard,
        StatusBar,
        TouchableWithoutFeedback, 
        Alert,
        Appearance,
        Button,
        Modal,
        TouchableOpacity
} from 'react-native';
        
import Colors from '../assets/Color';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import Icons from '../assets/icons/Icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cleanNumbers} from '../assets/sanitizer'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker'



const AddCrops = () => {
        {/* */}
        //Dummy object that will be filled in later
        const [cropData, setCropData] = useState({
                name:'',
                medium:'',
                location:'',
                type:'',
                hrfNum:'',
                variety:'',
                source:'',
                datePlanted:'',
                comments:'',
                yield:'',
                indoors:'',
                active:'',
                visible:'',

        });
        const [open, setOpen] = useState(null);
        const [selectedIndoors, setSelectedIndoors] = useState(cropData.indoors)
        const [selectedLocation, setSelectedLocation] = useState(cropData.location)
        const [selectedActive, setSelectedActive] = useState(cropData.active)
        const [selectedVisible, setSelectedVisible] = useState(cropData.visible)
        const [selectedMedium, setSelectedMedium] = useState(cropData.medium)
        
        const [modalVisible, setModalVisible] = useState(false);
        const [typeModalVisible, setTypeModalVisible] = useState(false);
        const [selectedImage, setSelectedImage] = useState(null);
        const [newOption, setNewOption] = useState('');
        const [items, setItems] = useState([
                {label: 'Yes', value: 'Yes' },
                {label: 'No', value: 'No'}
        ]);
        const [types, setType] = useState([
                {label: 'Standard', value: 'Standard'},
                {label: 'Nocturnal', value: 'Nocturnal'},
        ])
        const [locations, setLocation] = useState([
                {label: 'Mound 1', value: 'Mound 1' },
                {label: 'Greenhouse 2', value: 'Greenhouse 2'}
        ])

        const handleOpenDropdown = (id) => {
                setOpen(open === id ? null : id)
        }

        const handleNewLocation = () => {
                if(newOption.trim() !== '')
                {
                        setLocation([...locations, {label: newOption, value: newOption.toLowerCase().replace(/\s+/g, '') }]);
                        setModalVisible(false);
                        setNewOption('');
                }
        }
        
        const handleNewType = () => {
                if(newOption.trim() !== '')
                {
                        setType([...types, {label: newOption, value: newOption.toLowerCase().replace(/\+/g, '')}])
                        setTypeModalVisible(false);
                        setNewOption('');
                }
        }

        const handleLocationChange = (value) =>
        {
                setCropData({
                        ...cropData,
                        location: value
                })
        }
        const handleIndoorsChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        indoors: value,
                })
        }
        const handleActiveChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        active: value,
                })
        }

        const handleVisibleChange = (value) =>
        {
                setCropData({
                        ...cropData,
                        visible: value,
                })
        }

        //Change data as given, didn't want to worry about specifics, so search dummy object and change accordingly
        const handleChange = (fieldName, input) => {
                
                setCropData({
                        ...cropData,
                        //[fieldName]:  (input, noStopwords = false, noSQL = true, textOnly = true, hexCode = true)
                        [fieldName]: input
                })
        }

        //on save, alert for save push to view crops and add to list
        const handleSave = () =>{
                const emptyFields = Object.values(cropData).some(value=> value ==='');
                if(emptyFields)
                {
                        console.log(cropData)
                        Alert.alert("Unable to save, some fields are still empty");
                }
                else
                {
                        Alert.alert(cropData.name + " saved");
                        router.push({pathname: '/viewcrops', params: {newCrop: JSON.stringify(cropData)}});
                }
        };
        //Handle old unused print checker
        const printStatement = () =>
        {
                Alert.alert('Save pressed');
                console.log(cropData);
        }
        const [isDark, setIsDarkMode] = useState(false)
        useEffect(() => {
                (async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !== 'granted') {
                          Alert.alert('Permission Required', 'Permission to access media library is required!');
                        }
                })();
                const fetchDarkModeSetting = async () => {
                        const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
                        let result = null
                        if(JSON_VALUE && JSON_VALUE !== "")
                        {
                                result = JSON.parse(JSON_VALUE)
                                console.log("Async: " + result)
                        }
                        else
                        {
                                colorScheme = Appearance.getColorScheme()
                                if(colorScheme == 'dark')
                                {
                                        result = true;
                                }
                                else
                                {
                                        result = false;
                                }
                                console.log("colorScheme: " + result)
                        }
                        setIsDarkMode(result)
                }
                fetchDarkModeSetting()
                .catch(console.error);
                const min = 100000;
                const max = 999999;
                const setHRFnum = Math.floor(Math.random() * (max - min - 1)) + min;
                cropData.hrfNum = setHRFnum;
                console.log(setHRFnum);
                console.log(cropData.hrfNum)
                
        }, [])

        const handleAddMedia = async () => {
                try{
                        const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 1,
                        })
                        
                        if(!result.canceled)
                        {
                                setSelectedImage(result.assets[0].uri);
                        }

                }
                catch(error)
                {
                        console.error("Error picking image: ", error);
                }
        }

        //load fonts
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../assets/fonts/Domine-Regular.ttf'),
        });

        if(!fontsLoaded && !fontError)
        {
                return null;
        }

        return (
                /* Behavior subject to change, mostly making keyboard disappear after tapping elsewhere*/
                <KeyboardAvoidingView
                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                 keyboardVerticalOffset={Platform.OS ==='ios' ? 0 : 20}
                 style={styles.containment}
                 >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style={[styles.container, isDark && styles.containerDark]}>
                        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={ isDark ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
                        {/* Header */}
                        <View style={[styles.titleCard, isDark && styles.titleCarddark]}>
                                <View style={styles.titleContainer}>
                                        <Text style={[styles.title, isDark && {color: Colors.WHITE_SMOKE}]}>Add Crop</Text>
                                        <View style={styles.semicircle}>
                                                <Text style={styles.AddMedia} onPress = {handleAddMedia}>Add media</Text>
                                        </View>
                                </View>
                        </View>
                        {/* Body (Scrollable inputs)*/}
                        <View style={[styles.topContainer, styles.spaceBetween]}>
                                <View style={styles.back}>
                                        <AppButton title="" icon={isDark ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: '20%', marginLeft: '2%'}}>
                                        <TouchableOpacity style={[styles.locationContainer, isDark && styles.locationContainerDark]} onPress = {() => setModalVisible(true)}>
                                                <Text style={styles.locationText}>Location</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.typeContainer, isDark && styles.typeContainerDark]} onPress = {() => setTypeModalVisible(true)}>
                                                <Text style={styles.typeText}>Type</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.medContainer, isDark && styles.medContainerDark]} onPress = {() => setModalVisible(true)}>
                                                <Text style={styles.medText}>Medium</Text>
                                        </TouchableOpacity>
                                </View>
                                
                                
                                
                                <View style={styles.save}>
                                        <AppButton title="" mci="content-save" mciSize={30} mciColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL} onPress={handleSave}/>
                                </View>
                                
                        </View>
                        <Modal
                                visible = {modalVisible}
                                animationType = 'slide'
                                transparent = {true}
                                onRequestClose={() => setModalVisible(false)}
                        >  
                                <View style={styles.modalContainer}>
                                        <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                                                <Text style={styles.modalTitle}>Enter a New Location</Text>
                                                <Input
                                                        style={styles.input}
                                                        placeholder="Type new option"
                                                        value={newOption}
                                                        onChangeText={setNewOption}
                                                />
                                                <View style={{borderWidth: 2, borderColor: 'Black', borderRadius: 12}}>
                                                        <View style={{ paddingHorizontal: 60, paddingVertical: 10 }}>
                                                                <Button buttonStyle={{borderColor: 'Black', borderWidth: 2}}title="Add Option" onPress={handleNewLocation} />
                                                        </View>
                                                        <View style={{borderTopWidth: 2, borderColor: 'Black', paddingVertical:10 }}>
                                                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                                                        
                                                        </View>
                                                </View>
                                        </View>
                                </View>

                        </Modal>
                        <Modal
                                visible = {typeModalVisible}
                                animationType = 'slide'
                                transparent = {true}
                                onRequestClose={() => setTypeModalVisible(false)}
                        >  
                                <View style={styles.modalContainer}>
                                        <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                                                <Text style={styles.modalTitle}>Enter a New Type</Text>
                                                <Input
                                                        style={styles.input}
                                                        placeholder="Type new option"
                                                        value={newOption}
                                                        onChangeText={setNewOption}
                                                />
                                                <View style={{borderWidth: 2, borderColor: 'Black', borderRadius: 12}}>
                                                        <View style={{ paddingHorizontal: 60, paddingVertical: 10 }}>
                                                                <Button buttonStyle={{borderColor: 'Black', borderWidth: 2}}title="Add Option" onPress={handleNewType} />
                                                        </View>
                                                        <View style={{borderTopWidth: 2, borderColor: 'Black', paddingVertical:10 }}>
                                                                <Button title="Cancel" onPress={() => setTypeModalVisible(false)} />
                                                        
                                                        </View>
                                                </View>
                                        </View>
                                </View>

                        </Modal>
                        <ScrollView> 
                                <View style={styles.spacer}/>
                                <StatusBar style={{backgroundColor: 'white'}}/>
                                <Text style = {[styles.label, isDark && styles.labelDark]}>Crop Name</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = "Name"
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength = {128}
                                        onChangeText={(text) => handleChange('name', text)}
                                        testID="name-input"
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Variety</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Variety'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('variety', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Source</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Source'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('source', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Date Planted'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={10}
                                        onChangeText={(text) => handleChange('datePlanted', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Location</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'location'}
                                        setOpen={() => handleOpenDropdown('location')}
                                        value={selectedLocation}
                                        setValue={setSelectedLocation}
                                        items={locations}
                                        onChangeValue = {(selectedLocation) => handleChange('location', selectedLocation)}
                                        placeholder="Location?"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 70,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                {/*}
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Location'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('location', text)}
                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Comments</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Comments'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={1024}
                                        onChangeText={(text) => handleChange('comments', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark, styles.dropdownLabel]}>Started Indoors?</Text>
                                
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'indoors'}
                                        setOpen={() => handleOpenDropdown('indoors')}
                                        value={selectedIndoors}
                                        setValue={setSelectedIndoors}
                                        items={items}
                                        onChangeValue={handleIndoorsChange}
                                        placeholder="Started Indoors?"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 60,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                
                                {/*}
                               <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Indoors'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('indoors', text)}

                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Active</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'active'}
                                        setOpen={() => handleOpenDropdown('active')}
                                        value={selectedActive}
                                        setValue={setSelectedActive}
                                        items={items}
                                        onChangeValue={handleActiveChange}
                                        placeholder="Active?"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 50,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                {/*}
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Active'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('active', text)}

                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Type'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('type', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Medium</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'medium'}
                                        setOpen={() => handleOpenDropdown('medium')}
                                        value={selectedMedium}
                                        setValue={setSelectedMedium}
                                        items={items}
                                        onChangeValue={(selectedMedium) => handleChange('medium', selectedMedium)}
                                        placeholder="Insert Medium"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 40,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={cropData.hrfNum.toString()}
                                        editable={false}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Yield</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Yield'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('yield', text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Visible</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'visible'}
                                        setOpen={() => handleOpenDropdown('visible')}
                                        value={selectedVisible}
                                        setValue={setSelectedVisible}
                                        items={items}
                                        onChangeValue={handleVisibleChange}
                                        placeholder="Crop Visible?"
                                        listMode='SCROLLVIEW'
					dropDownDirection='TOP'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 60,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownBottomContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                {/*}
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Visibility'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('visible', text)}

                                />
                                */}
                        </ScrollView>
                        
                        
                </View>
                
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        )
}


const styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: Colors.SANTA_GRAY,
        },
        containerDark:{
                backgroundColor: Colors.BALTIC_SEA
        },
        containment:{
                flex:1
        },
        spacer:{
                marginTop: 20,
        },
        semicircle:{
                position: 'absolute',
                top: -19,
                left: 0,
                width: 140,
                height: 70,
                backgroundColor: Colors.MALACHITE,
                borderBottomLeftRadius: 140,
                borderBottomRightRadius: 140,
                overflow: 'hidden',
        },
        titleContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative', 
        },
        titleCard:{
                backgroundColor: Colors.ALMOND_TAN,
                borderColor: Colors.CHARCOAL,
                borderWidth: 1,
                padding: 18,
        },
        titleCarddark:{
                backgroundColor: Colors.CHARCOAL
        },
        title:{
                textAlign: 'right',
                fontSize: 42,
                fontFamily: 'Domine-Medium',
                alignContent: 'center',
                flex: 1
        },
        save:{
                position: 'absolute',
                marginTop: 10,
                marginLeft: '85%',
                width: 40,
                height: 40,
                borderRadius: 40/2,
                backgroundColor: Colors.MALACHITE,
                justifyContent: "center",
                alignItems: "center",
                marginRight: '5%'
        },
        back:{
                marginLeft: '2%',
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
        },
        locationContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 11,
                paddingHorizontal: 10,
                backgroundColor: Colors.SCOTCH_MIST_TAN, // Light background color around the toggle
                borderRadius: 20,
                borderColor: '#20232a',
                borderWidth: 1,
                marginRight: '1%'
        },
        locationContainerDark:{
                backgroundColor: Colors.LICHEN
        },
        locationText:{
                fontFamily: 'Domine-Medium',
                fontSize: 20
        },
        typeContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 11,
                paddingHorizontal: 10,
                backgroundColor: Colors.SCOTCH_MIST_TAN, // Light background color around the toggle
                borderRadius: 20,
                borderColor: '#20232a',
                borderWidth: 1,
                marginRight: '1%'
        },
        typeText:{
                fontFamily: 'Domine-Medium',
                fontSize: 20
        },
        typeContainerDark:{
                backgroundColor: Colors.LICHEN
        },
        medContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 11,
                paddingHorizontal: 10,
                backgroundColor: Colors.SCOTCH_MIST_TAN, // Light background color around the toggle
                borderRadius: 20,
                borderColor: '#20232a',
                borderWidth: 1,
                marginRight: '1%'
        },
        medContainerDark:{
                backgroundColor: Colors.LICHEN
        },
        medText:{
                fontFamily: 'Domine-Medium',
                fontSize: 20
        },
        textBox:{
                marginTop: -5,
                backgroundColor: "white",
                borderColor: Colors.CHARCOAL,
                overflow: 'hidden',
                borderWidth: 2,
                borderBottomWidth: 2,
                width:'90%',
                marginLeft: '5%',
                marginRight: '5%',
                height: 40,
                borderRadius: 12,
                zIndex: 1,
        },
        textBoxDark:{
                backgroundColor: Colors.IRIDIUM,
                borderColor: Colors.WHITE_SMOKE,
                borderWidth: 2,
                borderBottomWidth: 2,
                width:'90%',
                marginLeft: '5%',
                marginRight: '5%',
                height: 40,
                borderRadius: 12,
        },
        label:{
                marginTop: -15,
		marginLeft: '15%',
		alignSelf: 'flex-start',
		backgroundColor: 'white',
		zIndex: 10,
		fontSize: 16,
                fontFamily: 'Domine-Regular',
		borderColor: 'white',
                paddingLeft: 5,
                paddingRight: 5,
        },
        dropdownLabel:{
		zIndex: 30,
                elevation: (Platform.OS === 'android') ? 9999 : 0,
        },
        labelDark:{
                backgroundColor: Colors.IRIDIUM,
                marginTop: -17,
		marginLeft: '15%',
		alignSelf: 'flex-start',
		zIndex: 10,
		fontSize: 16,
                color: Colors.WHITE_SMOKE,
                fontFamily: 'Domine-Regular',
                
        },
        inputText:{
                fontSize: 16,
                marginLeft: "2%",
                zIndex: 0
        },
        inputTextDark:{
                  color: Colors.WHITE_SMOKE
        },
        AddMedia:{
                textAlign: 'center',
                fontSize: 21,
                fontFamily: 'Domine-Medium',
                marginTop: '10%'
        },
        topContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'flex-end',
                marginTop: '1%',
                marginBottom: '1%',
                marginLeft: '1%'
        },
        spaceBetween:
        {
                justifyContent: "space-between"
        },
        modalContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
                width: 300,
                backgroundColor: Colors.SCOTCH_MIST_TAN,
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
        },
        modalContentDark:{
                backgroundColor: Colors.LICHEN
        },
        modalTitle: {
                fontSize: 18,
                fontFamily: 'Domine-Medium',
                marginBottom: 10,
        },
        input: {
                width: '100%',
                height: 40,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 12,
                marginBottom: 20,
                paddingLeft: 10,
        },
        dropDownContainer: {
                borderWidth: 2,
		borderColor: Colors.CHARCOAL,
		backgroundColor: Colors.WHITE_SMOKE,
		borderRadius: 12,
		zIndex: 80,
                marginTop: -10,
                width: '90%',
                marginLeft: '8%',
                marginRight: '5%',
        },
        dropDownContainerDark: {
                borderColor: Colors.WHITE_SMOKE, 
                backgroundColor: Colors.IRIDIUM
        },
        dropDownBottomContainer: {
                borderWidth: 2,
		borderColor: Colors.CHARCOAL,
		backgroundColor: Colors.WHITE_SMOKE,
		borderRadius: 12,
		zIndex: 50,
                marginBottom: -10,
                width: '90%',
                marginLeft: '8%',
                marginRight: '5%',
        },
        dropDownBottomContainerDark: {
                borderColor: Colors.WHITE_SMOKE, 
                backgroundColor: Colors.IRIDIUM
        },
        dropDownStyle: {
                borderColor: Colors.CHARCOAL,
                borderWidth: 2,
                borderRadius: 12,
                height: 52,
                backgroundColor: Colors.WHITE_SMOKE,
                width: '90%',
                marginLeft: '8%',
                marginRight: '5%',
                height: 40,
                zIndex: 1,
        },
        dropDownStyleDark: {
                borderColor: Colors.WHITE_SMOKE, 
                backgroundColor: Colors.IRIDIUM
        }



      });
      export default AddCrops;