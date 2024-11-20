/****
 * @author Isaac Boodt, Tyler Bowen
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, 
        Text, 
        View, 
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
import { 
        GestureHandlerRootView,
        FlatList,
        ScrollView 
} from 'react-native-gesture-handler'
import Colors from '../../assets/Color.js';
import { useFonts, useLocalSeachParams } from 'expo-font';
import { router } from 'expo-router';
import { Input } from 'react-native-elements';
import AppButton from '../../assets/AppButton.jsx';
import Icons from '../../assets/icons/Icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker'
import UploadModal from '../../assets/ProfilePageImages/UploadModal.jsx'


const addCrops = () => {
        {/* */}
        const subID = "sub123"
        //Dummy object that will be filled in later
        const [cropData, setCropData] = useState({
            "fld_c_ZipCode": "12345",
            "fld_c_State": "TX",
            "fld_f_FarmID_fk": 1,
            "fld_c_HRFNumber": 0,
            "fld_l_LocationID_fk": 1,
            "fld_ct_CropTypeID_fk": 1,
            "fld_m_MediumID_fk": 1,
            "fld_c_CropName": "",
            "fld_c_Variety": "",
            "fld_c_Source": "",
            "fld_c_DatePlanted": "",
            "fld_c_Comments": "",
            "fld_c_Yield": "", 
            "fld_c_WasStartedIndoors": 0b0,
            "fld_c_isActive": 0b0,

        })
        const  [savePressed, setSavePressed ] = useState(false)

        const [open, setOpen] = useState(null);
        const [selectedIndoors, setSelectedIndoors] = useState()
        const [selectedLocation, setSelectedLocation] = useState()
        const [selectedActive, setSelectedActive] = useState()
        const [selectedVisible, setSelectedVisible] = useState()
        const [items, setItems] = useState([
                {label: 'Yes', value: 0b1 },
                {label: 'No', value: 0b0}
        ]);
        const [mediums, setMediums] = useState([])
        const [types, setTypes] = useState([])
        const [locations, setLocations] = useState([])
        const [modalVisible, setModalVisible] = useState(false);
        const [typeModalVisible, setTypeModalVisible] = useState(false);
        const [mediumModalVisible, setMediumModalVisible] = useState(false);
        const [selectedImage, setSelectedImage] = useState(null);
        const [newOption, setNewOption] = useState('');
        const [selectedType, setSelectedType] = useState()
        const [addLocationAdded, setAddLocationAdded] = useState(false)
        const [selectedMedium, setSelectedMedium] = useState(false)
        const [addTypeAdded, setAddTypeAdded] = useState(false)
        const [addMediumAdded, setAddMediumAdded] = useState(false)
        const [locationNameOption, setLocationNameOption] = useState()
        const [typeNameOption, setTypeNameOption] = useState()
        const [mediumNameOption, setMediumNameOption] = useState()
        const [isDark, setIsDarkMode] = useState(false)
        const [mediaModal, setMediaModalVisible] = useState(false);
        const handleOpenDropdown = (id) => {
                setOpen(open === id ? null : id)
        }

        const handleNewLocation = () => {
                if(locationNameOption.trim() !== '')
                {
                        setAddLocationAdded(true)
                        setModalVisible(false);
                }
        }
        
        const handleNewType = () => {
                if(typeNameOption.trim() !== '')
                {
                        setAddTypeAdded(true)
                        setTypeModalVisible(false);
                }
        }

        const handleNewMedium = () => {
                if(mediumNameOption.trim() !== '')
                {
                        setAddMediumAdded(true)
                        setMediumModalVisible(false)
                }
        }

        const handleLocationChange = (value) =>
        {
                setCropData({
                        ...cropData,
                        "fld_l_LocationID_fk": value
                })
        }


        const handleMediumChange = (value) =>
        {
                setCropData({
                        ...cropData,
                        "fld_m_MediumID_fk": value
                })
        }

        const handleTypeChange = (value) =>{
                setCropData({
                        ...cropData,
                        "fld_ct_CropTypeID_fk": value
                })
        }

        const handleIndoorsChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        "fld_c_WasStartedIndoors": value,
                })
        }
        const handleActiveChange = (value) =>
        {
                setCropData({
                        ...cropData, 
                        "fld_c_isActive": value,
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
                if(fieldName === 'fld_c_DatePlanted')
                {
                        
                        if(input.length === 10)
                        {
                                console.log("Date Planted Change")
                                const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
                                const test = regex.test(input);
                                if(!test)
                                {
                                        Alert.alert("Inproper Date format, please use YYYY-MM-DD")
                                }
                                else
                                {
                                        setCropData({
                                                ...cropData,
                                                //[fieldName]:  (input, noStopwords = false, noSQL = true, textOnly = true, hexCode = true)
                                                [fieldName]: input
                                        })       
                                }   
                        }
                        
                }
                else{
                        setCropData({
                                ...cropData,
                                //[fieldName]:  (input, noStopwords = false, noSQL = true, textOnly = true, hexCode = true)
                                [fieldName]: input
                        })  
                }               
        }

        //on save, alert for save push to view crops and add to list
        const handleSave = () =>{
                const emptyFields = Object.values(cropData).some(value=> value ==='');
                
                if(cropData.fld_c_DatePlanted.length != 10)
                {
                        
                        Alert.alert("Incorrect or incomplete value in Date Planted, please use the format YYYY-MM-DD");
                }
                else if(emptyFields)
                {
                        console.log(cropData)
                        Alert.alert("Unable to save, some fields are still empty");
                }
                else
                {
                        console.log(cropData)
                        setSavePressed(true)
                }
               // router.push({pathname: '/viewcrops', params: {newCrop: JSON.stringify(cropData)}});
        };
        //Handle old unused print checker
        const printStatement = () =>
        {
                Alert.alert('Save pressed');
                console.log(cropData);
        }
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
                                useColorScheme.Appearence.getColorScheme()
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
         useEffect(()=>{
                        const fetchData = async () =>{
                                console.log(cropData)
                                if(savePressed){
                                try{
                                        const response = await fetch('https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addcrop',{method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({cropData: cropData, subID: "sub123"})})
                                        if (!response.ok) {
                                             throw new Error(`HTTP error! Status: ${response.status}`);
                                        }

                                router.push({pathname: './viewcrops', params: {newCrop: JSON.stringify(cropData)}, relativeToDirectory: true});
                                setSavePressed(false)
                                }catch(error){
                                        console.error("Error: ", error)
                                }
                        }

                        }

                        fetchData()
                }, [savePressed])

        useEffect(()=>{
                const fetchLocations = async () =>{
                        try{
                                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listLocation/${subID}`,{method:'GET'})
                                if(!response.ok){
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                const data = await response.json()
                                setLocations(data)
                        }catch(error){
                                console.error("Error fetching locations", error)
                        }
                }
                fetchLocations()
        },[addLocationAdded])


        useEffect(()=>{
                const fetchMediums = async () =>{
                        try{
                                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/getMediums/${subID}`,{method:'GET'})
                                if(!response.ok){
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                const data = await response.json()
                                setMediums(data)
                        }catch(error){
                                console.error("Error fetching Mediums", error)
                        }
                }
                fetchMediums()
        },[])

        useEffect(()=>{
                const addLocation = async () =>{
                        if(addLocationAdded){
                                try{
                                        const response = await fetch('https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addLocation',{method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({locationName: locationNameOption, farmID: 1, subID: "sub123"})})
                                        if (!response.ok) {
                                             throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
                                        setLocationNameOption('')
                                        setAddLocationAdded(false)
                                }catch(error){
                                        console.error("Error:", error)
                                }
                        }
                }
                addLocation()
        }, [addLocationAdded])

        useEffect(()=>{
                const addType = async () =>{
                        if(addTypeAdded){
                                try{
                                        const response = await fetch('https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addCropType',{method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({cropData: typeNameOption, farmID: 1, subID: "sub123"})})
                                        if (!response.ok) {
                                             throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
                                        setTypeNameOption('')
                                        setAddTypeAdded(false)
                                }catch(error){
                                        console.error("Error:", error)
                                }
                        }
                }
                addType()
        }, [addTypeAdded])
        
        useEffect(()=> {
                const addMedium = async() => {
                        if(addMediumAdded){
                                try{
                                        const response = await fetch('https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/addMediumType',{method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({cropData: mediumNameOption, farmID: 1, subID: "sub123"})})
                                
                                        if(!response.ok)
                                        {
                                                throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
                                }
                                catch(error){
                                        console.error("Error:", error)
                                }
                        }
                }
                addMedium()
        }, [addMediumAdded])

        useEffect(()=>{
                const fetchCropTypes = async () =>{
                        try{
                                const response = await fetch(`https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/listCropTypes/${subID}`,{method:'GET'})
                                if(!response.ok){
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                const data = await response.json()
                                setTypes(data)
                        }catch(error){
                                console.error("Error fetching Types", error)
                        }
                }
                fetchCropTypes()
        },[addTypeAdded])

        const mutableLocations = useMemo(() => {
                return locations.map((location) => ({
                    label: location[4],      
                    value: location[0]
                }));
            }, [locations]);


        const mutableMediums = useMemo(() => {
                return mediums.map((medium) => ({
                    label: medium[1],      
                    value: medium[0]
                }));
            }, [mediums]);

        const mutableCropTypes = useMemo(() => {
                return types.map((type) => ({
                    label: type[2],      
                    value: type[0]
                }));
            }, [types]);


        const handleAddMedia = async (mode) => {
                try{     
                        let result = {};

                                //check if the mode is media gallery
                                if (mode === "gallery") {
                                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                                        result = await ImagePicker.launchImageLibraryAsync({
                                                mediaTypes: ImagePicker.Images, //only let user select images, not videos
                                                allowsEditing: true, //allows crop, rotate, flip depending on OS
                                                aspect: [1, 1], //set default aspect ratio, only affect s Android OS
                                                quality: 1, //sets basic compression level by expo-image-picker
                                        });
                                } 
                                //check if the mode is selfie for front-facing camera
                                else if (mode === "back") {
                                        console.log("Back pressed")
                                        await ImagePicker.requestCameraPermissionsAsync(); //wait for permission to access camera
                                        result = await ImagePicker.launchCameraAsync({ //launch the camera
                                                cameraType: ImagePicker.CameraType.back, //default the camera to the front one since it is a selfie
                                                allowsEditing: true, //allows crop, rotate, flip depending on OS
                                                aspect: [1, 1], //set default aspect ratio, only affects Android OS as iOs defaults to 1x1
                                                quality: 1, //sets basic compression level by expo-image-picker
                                        });
                                }
                                //otherwise, assume that the mode was for the back camera
                                else {
                                        await ImagePicker.requestCameraPermissionsAsync(); //wait for permission to access camera
                                        result = await ImagePicker.launchCameraAsync({ //launch the camera
                                                cameraType: ImagePicker.CameraType.back, //default the camera to the back one
                                                allowsEditing: true, //allows crop, rotate, flip depending on OS
                                                aspect: [1, 1], //set default aspect ratio, only affects Android OS as iOs defaults to 1x1
                                                quality: 1, //sets basic compression level by expo-image-picker
                                        });
                                }
                                

                                //canceled is true if the system UI is closed without selecting an image
                                //so save image if new image is selected
                                if (!result.canceled) {
                                        //await saveImage(result.assets[0].uri)
                                        console.log(result.assets[0].uri)
                                }
		} catch (error) {
			Alert.alert("Error uploading image: " + error.message)
			setMediaModalVisible(false)
		}
        }

        //load fonts
        const [fontsLoaded, fontError] = useFonts({
                'WorkSans-Semibold': require('../../assets/fonts/WorkSans-SemiBold.ttf'),
                'Domine-Medium': require('../../assets/fonts/Domine-Medium.ttf'),
                'Domine-Regular': require('../../assets/fonts/Domine-Regular.ttf'),
        });

        if(!fontsLoaded && !fontError)
        {
                return null;
        }

        return (
                /* Behavior subject to change, mostly making keyboard disappear after tapping elsewhere*/
                <GestureHandlerRootView>
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
                                                <Text style={styles.AddMedia} onPress = {()=> setMediaModalVisible(true)}>Add Img</Text>
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
                                        <TouchableOpacity style={[styles.medContainer, isDark && styles.medContainerDark]} onPress = {() => setMediumModalVisible(true)}>
                                                <Text style={styles.medText}>Medium</Text>
                                        </TouchableOpacity>     
                                </View>
                                
                                
                                <View style={styles.save}>
                                        <AppButton title="" mci="content-save" mciSize={30} mciColor={'white'} onPress={handleSave}/>
                                </View>
                                
                        </View>
                        
                        {/*Location Modal*/}
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
                                                        value={locationNameOption}
                                                        onChangeText={setLocationNameOption}
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
                        
                        {/*Type Modal*/}
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
                                                        value={typeNameOption}
                                                        onChangeText={setTypeNameOption}
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
                        {/*Medium Modal*/}
                        <Modal
                                visible = {mediumModalVisible}
                                animationType = 'slide'
                                transparent = {true}
                                onRequestClose={() => setMediumModalVisible(false)}
                        >  
                                <View style={styles.modalContainer}>
                                        <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                                                <Text style={styles.modalTitle}>Enter a New Medium</Text>
                                                <Input
                                                        style={styles.input}
                                                        placeholder="Type new option"
                                                        value={mediumNameOption}
                                                        onChangeText={setMediumNameOption}
                                                />
                                                <View style={{borderWidth: 2, borderColor: 'Black', borderRadius: 12}}>
                                                        <View style={{ paddingHorizontal: 60, paddingVertical: 10 }}>
                                                                <Button buttonStyle={{borderColor: 'Black', borderWidth: 2}}title="Add Option" onPress={handleNewMedium} />
                                                        </View>
                                                        <View style={{borderTopWidth: 2, borderColor: 'Black', paddingVertical:10 }}>
                                                                <Button title="Cancel" onPress={() => setMediumModalVisible(false)} />
                                                        
                                                        </View>
                                                </View>
                                        </View>
                                </View>

                        </Modal>
                        <UploadModal modalVisible={mediaModal} 
					onBackPress={() => setMediaModalVisible(false)} //disappear if it is clicked outside of the modal
					onCameraPress={() => handleAddMedia("back")} //trigger camera when that icon is pressed
					onGalleryPress={() => handleAddMedia("gallery")} //trigger gallery when that icon is pressed
					onRemovePress={() => setMediaModalVisible(false)} //remove the image when that icon is passed
                        />
                        <ScrollView> 
                                <View style={styles.spacer}/>
                                <StatusBar style={{backgroundColor: 'white'}}/>
                                <Text style = {[styles.label, isDark && styles.labelDark]}>Crop Name</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = "Name"
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength = {128}
                                        onChangeText={(text) => handleChange('fld_c_CropName', text)}
                                        testID="name-input"
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Variety</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Variety'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_c_Variety', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Source</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Source'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_c_Source', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Date Planted</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'YYYY-MM-DD'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={10}
                                        onChangeText={(text) => handleChange('fld_c_DatePlanted', text)}
                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Location</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'location'}
                                        setOpen={() => handleOpenDropdown('location')}
                                        value={selectedLocation}
                                        setValue={setSelectedLocation}
                                        items={mutableLocations}
                                        maxHeight={200}
                                        onChangeValue = {(selectedLocation) => handleLocationChange(selectedLocation)}
                                        placeholder="Location?"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTTOM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true,
                                                propagateSwipe: false
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
                                        maxLength={128}
                                        onChangeText={(text) => handleChange('fld_l_LocationID_pk', text)}
                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Comments</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Comments'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={1024}
                                        onChangeText={(text) => handleChange('fld_c_Comments', text)}
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
						zIndex: 65,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, styles.binaryDropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                
                             {/*  <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Indoors? (Y/N)'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('fld_c_WasStartedIndoors', text)}
                             />*/}
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
						zIndex: 60,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, styles.binaryDropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                {/*}
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Active'
                                        maxLength={3}
                                        onChangeText={(text) => handleChange('fld_c_isActive', text)}

                                />
                                */}
                                <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'type'}
                                        setOpen={() => handleOpenDropdown('type')}
                                        value={selectedType}
                                        setValue={setSelectedType}
                                        items={mutableCropTypes}
                                        maxHeight={200}
                                        onChangeValue={(selectedType)=> handleTypeChange(selectedType)}
                                        placeholder="Type"
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
						zIndex: 57,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                /> 
                                <Text style={[styles.label, isDark && styles.labelDark]}>Medium</Text>
                             {/*   <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Medium'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_MediumID_fk', text)}

                                />*/}
                                <DropDownPicker
                                        theme={isDark ? 'DARK' : 'LIGHT'}
                                        open={open === 'mediums'}
                                        setOpen={() => handleOpenDropdown('mediums')}
                                        value={selectedMedium}
                                        setValue={setSelectedMedium}
                                        items={mutableMediums}
                                        onChangeValue={selectedMedium=>handleMediumChange(selectedMedium)}
                                        maxHeight={200}
                                        placeholder="Medium"
                                        listMode='SCROLLVIEW'
					dropDownDirection='BOTOTM'
                                        scrollViewProps={{
					        nestedScrollEnabled: true
					}}
                                        props={{
						activeOpacity: 1,
					}}
                                        containerStyle={{
						width: '94%',
						zIndex: 55,
						marginBottom: 40,
					}}
                                        dropDownContainerStyle={[styles.dropDownContainer, isDark && styles.dropDownContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                /> 
                                <Text style={[styles.label, isDark && styles.labelDark]}>HRF Number</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'HRF Number'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_HRFNumber', parseInt(text))}

                                />
                                <Text style={[styles.label, isDark && styles.labelDark]}>Yield</Text>
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = 'Yield'
                                        style={[styles.inputText, isDark && styles.inputTextDark]}
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_Yield', text)}

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
                                        dropDownContainerStyle={[styles.dropDownBottomContainer, styles.binaryDropDownContainer, isDark && styles.dropDownBottomContainerDark]}
                                        style={[ styles.dropDownStyle, isDark && styles.dropDownStyleDark ]}
                                />
                                {/*}
                                <Input
                                        inputContainerStyle = {[styles.textBox, isDark && styles.textBoxDark]}
                                        placeholder = ' Visibility'
                                        maxLength={64}
                                        onChangeText={(text) => handleChange('fld_c_IsVisible', text)}

                                />
                                */}
                        </ScrollView>
                        
                        
                </View>
                
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                </GestureHandlerRootView>
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
        spacer:{
                marginTop: 20,
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
                flex:1 
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
		zIndex: 50,
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
                marginLeft: "2%"
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
		zIndex: 70,
                top: -10,
                width: '90%',
                marginLeft: '8%',
                marginRight: '5%',
                position: 'relative',
                height: 200,
        },
        binaryDropDownContainer: {
                height: 90,
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
                zIndex: 99,
        },
        dropDownStyleDark: {
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



      });
      export default addCrops;