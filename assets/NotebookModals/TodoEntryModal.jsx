import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Appearance,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoEntryModal = ({
    visible,
    onClose,
    onSave,
    taskID,
    initialTaskData,
    farmers,
    locations,
    crops,
    taskTypes,
    icons,
    onAddNewTaskType,
    
}) => {
    const [taskData, setTaskData] = useState({
        "fld_t_TaskID_pk": taskID || null,
        "fld_t_Comments": '',
        "fld_t_DateDue": '1990-01-01',
        "fld_fs_FarmerID_fk": '',
        "fld_l_LocationID_fk": '',
        CropID: '',
        "fld_tt_TaskTypeID_fk": '',
        NewTask: '',
        "fld_t_TaskIconPath": '',
        "fld_t_IsCompleted": 0b0,
        "fld_t_DateCompleted": '',
    });

    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        // declare the async data fetching function
        const fetchDarkModeSetting = async () => {
            const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
            let result = null
            if (JSON_VALUE && JSON_VALUE !== "") {
                result = JSON.parse(JSON_VALUE)
                console.log("Async: " + result)
            } else {
                colorScheme = Appearance.getColorScheme()
                if (colorScheme == 'dark') {
                    result = true
                } else {
                    result = false
                }
                console.log("colorScheme: " + result)
            }
            setIsDark(result)
        }

        // call the function
        fetchDarkModeSetting()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    useEffect(() => {
        if (taskID == null) return; 
        // Set task data once when the modal opens
        setTaskData({
           "fld_t_TaskID_pk": initialTaskData[0] || taskID,
            "fld_t_Comments": initialTaskData[8] || '',
           "fld_t_DateDue": initialTaskData[6] || '',
            "fld_fs_FarmerID_fk": initialTaskData[2] || '',
            "fld_l_LocationID_fk": initialTaskData[3]|| '',
            CropID: '' || '',
           "fld_tt_TaskTypeID_fk": initialTaskData[4] || '',
            NewTaskType: '',
            "fld_t_TaskIconPath": initialTaskData[9] || '',
            "fld_t_IsCompleted": initialTaskData[5] || 0b0,
            "fld_t_DateCompleted": initialTaskData[7] || '',
        });
    }, [visible]); // Only run when `visible` changes
    console.log("Current Task Data: \n\n",taskData)
    const handleDateChange = (type, value) => {
        // Mapping months to their numeric equivalents
        const monthMap = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
            "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
            "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };

        // Split the current date parts or default to current year
        console.log(taskData["fld_t_DateDue"])
        const currentDate = new Date(taskData["fld_t_DateDue"]);
        let year = currentDate.getFullYear() 
        let month = currentDate.getMonth() +1
        let day = currentDate.getDay() 

        if (type === 'month') {
            console.log(month)
            month = monthMap[value];

        } else if (type === 'day') {
            day = value.padStart(2, '0'); // Ensure day is two digits
        } else if (type === 'year') {
            year = value;
        }

        // Construct ISO format date (YYYY-MM-DD)
        const newDate = `${year}-${month}-${day}`
        console.log(newDate)
        const newD = new Date(newDate).toISOString().slice(0,10)
        console.log(newD)
        setTaskData(prevData => ({ ...prevData, "fld_t_DateDue": newD}));
    };
    
    
    const handleChange = (name, value) => {
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };
    
    
    
    const [iconPickerVisible, setIconPickerVisible] = useState(false);                                                   
    const handleIconSelect = (iconName) => {
        setTaskData((prevData) => ({
            ...prevData,
            fld_t_TaskIconPath: iconName,
        }));
        setIconPickerVisible(false);
    };
    const handleAddTaskType = () => {
        const newTaskType = taskData.NewTaskType.trim();
        console.log("New Task Type Trimmed: " + newTaskType)
        if (newTaskType !== '') {
            const uniqueID = `${Math.floor(Math.random()*1000000000).toString()}`;
            const updatedTaskTypes = [...taskTypes, [uniqueID, 1, newTaskType, newTaskType]];
            taskTypes = updatedTaskTypes
            onAddNewTaskType(uniqueID, newTaskType);
            handleChange('TaskType', uniqueID);
            handleChange('NewTaskType', '');
        }
    };

    const handleSave = () => {
        onSave(taskData);
        console.log("task icon path",fld_t_TaskIconPath)
        resetForm();  // Reset form after saving
        onClose();
    };

    const handleCancel = () => {
        resetForm();  // Reset form if the modal is cancelled
        onClose();
    };

    const resetForm = () => {
        setTaskData({
        "fld_t_TaskID_pk": null,
        "fld_t_Comments": '',
        "fld_t_DateDue": '',
        "fld_fs_FarmerID_fk": '',
        "fld_l_LocationID_fk": '',
        CropID: '',
        "fld_tt_TaskTypeID_fk": '',
        NewTask: '',
        "fld_t_TaskIconPath": '',
        "fld_t_IsCompleted": false,
        "fld_t_DateCompleted": 0b0,
        });
    };
       return (
        <Modal visible={visible} animationType="slide">
            <ScrollView style={[styles.modalContainer, isDark && styles.darkModalContainer]} contentContainerStyle={styles.scrollContent}>

                {/* Assigned Farmer Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Assigned Farmer</Text>
                    <Picker
                        selectedValue={taskData["fld_fs_FarmerID_fk"]}
                        onValueChange={(itemValue) => handleChange("fld_fs_FarmerID_fk", itemValue)}
                        style={isDark ? styles.darkPicker : styles.picker}
                        dropdownIconColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    >
                        {farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={farmer[0]} label={farmer[3]} value={farmer[0]} />
                            ))
                        ) : (
                            <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} label="No farmers available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Location Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Location</Text>
                    <Picker
                        selectedValue={taskData["fld_l_LocationID_fk"]}
                        onValueChange={(itemValue) => handleChange("fld_l_LocationID_fk", itemValue)}
                        style={isDark ? styles.darkPicker : styles.picker}
                        dropdownIconColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    >
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={location[0]} label={location[4]} value={location[0]} />
                            )
                        )
                        ) : (
                            <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} label="No locations available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Crop Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Crop</Text>
                    <Picker
                        selectedValue={taskData.CropID}
                        onValueChange={(itemValue) => handleChange('CropID', itemValue)}
                        style={isDark ? styles.darkPicker : styles.picker}
                        dropdownIconColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    >
                        {crops.length > 0 ? (
                            crops.map((crop) => (
                                <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={crop.id} label={crop.name} value={crop.id} />
                            ))
                        ) : (
                            <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} label="No crops available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Task Type Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Task Type</Text>
                    <Picker
                        selectedValue={taskData["fld_tt_TaskTypeID_fk"]}
                        onValueChange={(itemValue) => handleChange("fld_tt_TaskTypeID_fk", itemValue)}
                        style={isDark ? styles.darkPicker : styles.picker}
                        dropdownIconColor={isDark ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
                    >
                        {taskTypes.length > 0 ? (
                            taskTypes.map((taskType) => (
                                <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} key={taskType[0]} label={taskType[3]} value={taskType[0]} />
                            ))
                        ) : (
                            <Picker.Item style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}} label="No task types available" value="" />
                        )}
                    </Picker>
                    <TextInput
                        style={styles.input}
                        placeholder="Add New Task Type"
                        value={taskData.NewTaskType}
                        onChangeText={text => handleChange('NewTaskType', text)}
                    />
                    <Button title="Add Task Type" onPress={handleAddTaskType} />
                </View>

                {/* Due Date Section */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Due Date</Text>
                    <View style={styles.dateRow}>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[0] || 'January'}
                            onValueChange={(itemValue) => handleDateChange('month', itemValue)}
                            style={[styles.datePicker, isDark && styles.datePickerDark]}
                            itemStyle={{backgroundColor: Colors.IRISH_GREEN}}
                        >
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                                <Picker.Item key={month} label={month} value={month} style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[1] || '1'}
                            onValueChange={(itemValue) => handleDateChange('day', itemValue)}
                            style={[styles.datePicker, isDark && styles.datePickerDark]}
                        >
                            {[...Array(31)].map((_, i) => (
                                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[2] || `${new Date().getFullYear()}`}
                            onValueChange={(itemValue) => handleDateChange('year', itemValue)}
                            style={[styles.datePicker, isDark && styles.datePickerDark]}
                        >
                            {[...Array(21)].map((_, i) => (
                                <Picker.Item key={i} label={`${new Date().getFullYear() + i}`} value={`${new Date().getFullYear() + i}`} style={isDark ? {backgroundColor: Colors.IRIDIUM, color: Colors.WHITE_SMOKE} : {backgroundColor: Colors.WHITE_SMOKE, color: Colors.ALMOST_BLACK}}/>
                            ))}
                        </Picker>
                    </View>
                </View>
                   {/* Icon Picker Section */}
                   <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                       <Text style={styles.label}>Select Task Icon</Text>
                       <TouchableOpacity onPress={() => setIconPickerVisible(true)} style={styles.iconPickerContainer}>
                           {taskData.fld_t_TaskIconPath ? (
                               <MaterialCommunityIcons name={taskData.fld_t_TaskIconPath} size={32} color={isDark ? Colors.WHITE_SMOKE : 'black'} />
                           ) : (
                               <Text style={[styles.placeholderText, isDark && { color: Colors.WHITE_SMOKE }]}>Choose an Icon</Text>
                           )}
                       </TouchableOpacity>
                   </View>

                   <Modal visible={iconPickerVisible} transparent animationType="slide">
                       <View style={[styles.iconPickerModal, isDark && styles.darkModal]}>
                           <FlatList
                               data={[
                                   { label: 'Watering', value: 'watering-can-outline', icon: () => <MaterialCommunityIcons name="watering-can-outline" size={40} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Planning', value: 'calendar', icon: () => <MaterialCommunityIcons name="calendar" size={40} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Rake', value: 'rake', icon: () => <MaterialCommunityIcons name="rake" size={40} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Shovel', value: 'shovel', icon: () => <MaterialCommunityIcons name="shovel" size={40} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Tools', value: 'tools', icon: () => <MaterialCommunityIcons name="tools" size={40} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Beehive', value: 'beehive-outline', icon: () => <MaterialCommunityIcons name="beehive-outline" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Egg', value: 'egg-fried', icon: () => <MaterialCommunityIcons name="egg-fried" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Cow', value: 'cow', icon: () => <MaterialCommunityIcons name="cow" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Pig', value: 'pig-variant-outline', icon: () => <MaterialCommunityIcons name="pig-variant-outline" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Turkey', value: 'turkey', icon: () => <MaterialCommunityIcons name="turkey" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Fence', value: 'fence', icon: () => <MaterialCommunityIcons name="fence" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Wrench', value: 'wrench-outline', icon: () => <MaterialCommunityIcons name="wrench-outline" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Tractor', value: 'tractor-variant', icon: () => <MaterialCommunityIcons name="tractor-variant" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Cowboy', value: 'account-cowboy-hat-outline', icon: () => <MaterialCommunityIcons name="account-cowboy-hat-outline" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Scissors', value: 'scissors-cutting', icon: () => <MaterialCommunityIcons name="scissors-cutting" size={24} color={isDark ? 'white' : 'black'} /> },
                                   { label: 'Wheelbarrow', value: 'wheel-barrow', icon: () => <MaterialCommunityIcons name="wheel-barrow" size={24} color={isDark ? 'white' : 'black'} /> },
                               ]}
                               keyExtractor={(item) => item.value}
                               numColumns={4}
                               renderItem={({ item }) => (
                                   <TouchableOpacity onPress={() => handleIconSelect(item.value)} style={[styles.iconItem, isDark && styles.darkIconItem]}>
                                       {item.icon()}
                                   </TouchableOpacity>
                               )}
                           />
                           <Button title="Close" onPress={() => setIconPickerVisible(false)} />
                       </View>
                   </Modal>
                {/* Comments */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Comments</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter comments"
                        value={taskData.Comments}
                        onChangeText={(text) => handleChange("fld_t_Comments", text)}
                        multiline
                    />
                </View>

                {/* Save/Cancel Buttons */}
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Cancel" onPress={handleCancel} color={Colors.cancelButton} />
                </View>

            </ScrollView>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        backgroundColor: Colors.SANTA_GRAY,
        flex: 1,
        fontFamily: 'Domine-Regular',
        height: '100%',
        paddingBottom: 500,
    },
    darkModalContainer: {
        backgroundColor: Colors.BALTIC_SEA,
    },
    darkModal: {
        backgroundColor: Colors.BALTIC_SEA, // Dark mode modal background
        color: 'white'
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    darkIconItem: {
        backgroundColor: Colors.BALTIC_SEA, 
        color: 'white'
    },
    placeholderText: {
        fontSize: 16,
        color: Colors.ALMOST_BLACK,
    },
    listContainer: {
        marginBottom: 20,
        backgroundColor: Colors.ALMOND_TAN,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    darkListContainer: {
        backgroundColor: Colors.LICHEN,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        borderRadius: 5,
        backgroundColor: Colors.WHITE_SMOKE,
        color: Colors.ALMOST_BLACK,
    },
    darkPicker: {
        backgroundColor: Colors.IRIDIUM,
        color: Colors.WHITE_SMOKE,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        flex: 1,
        marginRight: 10,
        backgroundColor: Colors.WHITE_SMOKE,
        color: Colors.ALMOST_BLACK,
        height: 50,
    },
    datePickerDark: {
        backgroundColor: Colors.IRIDIUM,
        color: Colors.WHITE_SMOKE,
    },
    iconPickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',  // Allow the icons to wrap to the next line
        justifyContent: 'space-evenly',  // Even spacing between icons
        marginBottom: 20,
        padding: '1%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
       // backgroundColor: Colors.IRIDIUM,
       // color: 'white'
    },
    iconPickerModal: {
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: Colors.ALMOND_TAN
    },
    iconItem: {
        width: '30%', 
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        fontFamily: 'Domine-Regular',
    },
    buttonContainer: {
        flexDirection: 'column',
        //justifyContent: 'space-between',
        fontFamily: 'Domine-Regular',
        paddingBottom: 100,
       // paddingVertical: 10
        justifyContent: 'space-evenly'
    },
});

export default TodoEntryModal;
