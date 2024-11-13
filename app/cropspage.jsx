/****
 * @author Isaac Boodt
 * @reviewer Daniel Moreno
 * @tester Isaac Boodt
 ***/

import { StatusBar } from 'expo-status-bar';
import Colors from '../assets/Color'
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Alert, Appearance, TouchableOpacity, Button, Modal} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../assets/AppButton.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import Icons from '../assets/icons/Icons.js';
import { cleanText } from '../assets/sanitizer.jsx';

import DropDownPicker from 'react-native-dropdown-picker';


const CropsPage = () => {

        {/* Grabs variable form viewcrops page for use */}
        
        let [crop, setCropData] = useState(useLocalSearchParams());
        
        const [open, setOpen] = useState(null);
        const [selectedIndoors, setSelectedIndoors] = useState(crop.indoors)
        const [selectedLocation, setSelectedLocation] = useState(crop.location)
        const [selectedActive, setSelectedActive] = useState(crop.active)
        const [selectedVisible, setSelectedVisible] = useState(crop.visible)
        const [modalVisible, setModalVisible] = useState(false);
        const [typeModalVisible, setTypeModalVisible] = useState(false);
        const [items, setItems] = useState([
                {label: 'Yes', value: 'Yes' },
                {label: 'No', value: 'No'}
        ]);
        const [types, setType] = useState([
                {label: 'Standard', value: 'Standard'},
                {label: 'Nocturnal', value: 'Nocturnal'},
                {label: crop.type, value: crop.type}
        ])
        const [locations, setLocation] = useState([
                {label: 'Mound 1', value: 'Mound1' },
                {label: 'Greenhouse 2', value: 'Greenhouse 2'},
                {label: crop.location, value: crop.location }
        ])
        const [newOption, setNewOption] = useState('');
        

        const handleOpenDropdown = (id) => {
                setOpen(open === id ? null : id)
        }
        const [isVisible, setIsVisible] = useState(false);
        //If crop.name couldn't be retrieved, assume that ?param= was used
        /*
        if(!crop.name) {
                console.log("?param passed")
                console.log(crop.param)
                crop = JSON.parse(crop.param)
        }
        */
        //console.log("CROP: " + crop); //test
        //console.log("Crop name: " + crop.name); //test
        

        //Use state for switching if something is editable
        const [readOnly, setReadOnly] = useState(true)

        const handleChange = (fieldName, input) => {
                //console.log("Changing field:", fieldName, "to value:", input);
                
                setCropData((prevCrop) => ({
                         ...prevCrop,
                        [fieldName]: input
                }))
                               
                
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
                        ...crop,
                        location: value
                })
        }
        const handleIndoorsChange = (value) =>
        {
                setCropData({
                        ...crop, 
                        indoors: value,
                })
        }
        const handleActiveChange = (value) =>
        {
                setCropData({
                        ...crop, 
                        active: value,
                })
        }

        const handleVisibleChange = (value) =>
        {
                setCropData({
                        ...crop,
                        visible: value,
                })
        }

        const handleSave = () =>{
                const emptyFields = Object.values(crop).some(value=> value ==='');
                if(emptyFields)
                {
                        console.log(crop)
                        Alert.alert("Unable to save, some fields are still empty");
                }
                else
                {
                        Alert.alert(crop.name + " saved");
                }
        };

        const [isDark, setIsDarkMode] = useState(false)
        useEffect(() => {
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
        }, [])
        

        const toggleRead = () =>
        {
                setReadOnly(!readOnly);
                setIsVisible(!isVisible);
                console.log(readOnly);
                if(!readOnly)
                {
                        console.log("Editing Done");
                        
                }
                
        };

        return (
                <View style={[styles.container, isDark && styles.containerDark]}>
                        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={ isDark ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/>
                        {/* Header */}
                        <View style={[styles.titleCard, isDark && styles.titleCarddark]}>
                                <Text style={[styles.title, isDark && {color: Colors.WHITE_SMOKE}]}>{crop.name}</Text>
                        </View>
                        <View style={[styles.topContainer, styles.spaceBetween]}>
                                <View style={styles.back}>
                                        <AppButton title="" icon={isDark ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black} onPress={() => router.back()}/>
                                </View>
                                
                                
                                <View style={{flexDirection: 'row', marginRight: '20%', marginLeft: '2%'}}>
                                        <TouchableOpacity style={[isVisible && styles.locationContainer, isDark && styles.locationContainerDark]} onPress = {() => setModalVisible(true)}>
                                                {isVisible && <Text style={styles.locationText}>Location</Text>}
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[isVisible && styles.typeContainer, isDark && styles.typeContainerDark]} onPress = {() => setTypeModalVisible(true)}>
                                                {isVisible && <Text style={styles.typeText}>Type</Text>}
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[isVisible&&styles.medContainer, isDark && styles.medContainerDark]} onPress = {() => setModalVisible(true)}>
                                                        {isVisible&&<Text style={styles.medText}>Medium</Text>}
                                        </TouchableOpacity>        
                                </View>
                                
                                
                                
                                <View style={[isVisible && styles.save]}>
                                        {isVisible && <AppButton title="" mci="content-save" mciSize={30} mciColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL} onPress={handleSave}/>}
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
                                                <Text style={styles.modalTitle}>Enter a New Location</Text>
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
                                <Text style={[styles.label, isDark && styles.labelDark]}>Crop Name</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = "[Empty]"
                                        value={crop.name}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength = {128}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('name', text)}
                                        
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Variety</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.variety}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('variety', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Source</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.source}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('source', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.datePlanted}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={10}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('datePlanted', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Location</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'location'}
                                        setOpen={() => handleOpenDropdown('location')}
                                        value={selectedLocation}
                                        setValue={setSelectedLocation}
                                        items= {locations}
                                        disabled= {readOnly}
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
                                <Text style={[styles.label, isDark && styles.labelDark]}>Comments</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.comments}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={1024}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('comments', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Started Indoors?</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'indoors'}
                                        setOpen={() => handleOpenDropdown('indoors')}
                                        value={selectedIndoors}
                                        setValue={setSelectedIndoors}
                                        disabled= {readOnly}
                                        items={items}
                                        onChangeValue={handleIndoorsChange}
                                        placeholder= {crop.indoors}
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
                                <Text style={[styles.label, isDark && styles.labelDark]}>Active</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'active'}
                                        setOpen={() => handleOpenDropdown('active')}
                                        value={selectedActive}
                                        setValue={setSelectedActive}
                                        disabled= {readOnly}
                                        items={items}
                                        onChangeValue={handleActiveChange}
                                        placeholder={crop.active}
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
                                <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.type}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('type' , text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Medium</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'medium'}
                                        setOpen={() => handleOpenDropdown('medium')}
                                        value={selectedActive}
                                        setValue={setSelectedActive}
                                        disabled= {readOnly}
                                        items={items}
                                        onChangeValue={handleActiveChange}
                                        placeholder= {crop.medium}
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
                                <Text style={[styles.label, isDark && styles.labelDark]}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.hrfNum}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        readOnly = {true}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Yield</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        value={crop.yield}
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        readOnly = {readOnly}
                                        onChangeText={(text) => handleChange('yield' , text)}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Visible</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'visible'}
                                        setOpen={() => handleOpenDropdown('visible')}
                                        value={selectedVisible}
                                        setValue={setSelectedVisible}
                                        disabled= {readOnly}
                                        items={items}
                                        onChangeValue={handleVisibleChange}
                                        placeholder= {crop.visible}
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
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                
                        </ScrollView>
                        <View style={styles.spacer}/>
                        <View style={styles.spacer}/>
                        <Pressable style={styles.editButton} onPress={ toggleRead }>
                                <Text style={styles.buttonText}>{readOnly ? "Enable Edit" : "Disable Edit"}</Text>
                        </Pressable>
                </View>
                
        )
}

export default CropsPage;

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
                      alignContent: 'center'
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
                      marginLeft: "2%"
              },
              inputTextDark:{
                        color: Colors.WHITE_SMOKE
              },
              editButton: {
                position: 'absolute',
                bottom: 20,
                left: '30%',
                right: '30%',
                backgroundColor: Colors.MALACHITE,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',

              },
              buttonText: {
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              },
              topContainer: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: '1%',
                marginBottom: '1%',
                paddingVertical:3
        },
        spaceBetween:
        {
                justifyContent: "space-between"
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
        dropDownContainer: {
                borderWidth: 2,
		borderColor: Colors.CHARCOAL,
		backgroundColor: Colors.WHITE_SMOKE,
		borderRadius: 12,
		zIndex: 50,
                marginTop: -10,
                width: '90%',
                marginLeft: '8%',
                marginRight: '5%',
        },
        dropDownContainerDark: {
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




      });