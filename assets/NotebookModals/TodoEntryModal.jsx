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
import CalendarModal from '../CalendarModal';

const DEFAULT_TASK_DATA = {
    "fld_t_TaskID_pk": null,
    "fld_t_Comments": '',
    "fld_t_DateDue": '1990-01-01',
    "fld_fs_FarmerID_fk": 2,
    "fld_l_LocationID_fk": 1,
    "CropID": '',
    "fld_tt_TaskTypeID_fk": 1,
    "NewTask": '',
    "fld_t_TaskIconPath": '',
    "fld_t_IsCompleted": 0b0,
    "fld_t_DateCompleted": '',
}



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
    const [selectedDate, setSelectedDate] = useState('No date selected yet');
    const [taskData, setTaskData] = useState(DEFAULT_TASK_DATA);

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
        setTaskData((prevData) => ({
            ...prevData,
            fld_t_TaskID_pk: taskID,
        }));

        if (taskID == null) return; 
        // Set task data once when the modal opens
        setTaskData({
           "fld_t_TaskID_pk": initialTaskData[0] || taskID,
            "fld_t_Comments": initialTaskData[8] || DEFAULT_TASK_DATA.fld_t_Comments,
           "fld_t_DateDue": initialTaskData[6] || DEFAULT_TASK_DATA.fld_t_DateDue,
            "fld_fs_FarmerID_fk": initialTaskData[2] || DEFAULT_TASK_DATA.fld_fs_FarmerID_fk,
            "fld_l_LocationID_fk": initialTaskData[3]|| DEFAULT_TASK_DATA.fld_l_LocationID_fk,
            'CropID': '' || DEFAULT_TASK_DATA.CropID,
           "fld_tt_TaskTypeID_fk": initialTaskData[4] || DEFAULT_TASK_DATA.fld_tt_TaskTypeID_fk,
            'NewTaskType': '' || DEFAULT_TASK_DATA.NewTask,
            "fld_t_TaskIconPath": initialTaskData[9] || DEFAULT_TASK_DATA.fld_t_TaskIconPath,
            "fld_t_IsCompleted": initialTaskData[5] || DEFAULT_TASK_DATA.fld_t_IsCompleted,
            "fld_t_DateCompleted": initialTaskData[7] || DEFAULT_TASK_DATA.fld_t_DateCompleted,
        });
    }, [visible]); // Only run when `visible` changes
    console.log("Current Task Data: \n\n",taskData)  
    
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
            handleChange('fld_tt_TaskTypeID_fk', uniqueID);
        }
    };

    const handleSave = () => {
        onSave(taskData);
        console.log("task icon path", taskData.fld_t_TaskIconPath)
        resetForm();  // Reset form after saving
        onClose();
    };

    const handleCancel = () => {
        resetForm();  // Reset form if the modal is cancelled
        onClose();
    };

    const resetForm = () => {
        setTaskData(DEFAULT_TASK_DATA);
    };
       return (
        <Modal visible={visible} animationType="slide">
            <ScrollView style={[styles.modalContainer, isDark && styles.darkModalContainer]} contentContainerStyle={styles.scrollContent}>

                {/* Assigned Farmer Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Assigned Farmer*</Text>
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
                    <Text style={styles.label}>Task Type*</Text>
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
                    <Text style={styles.label}>Due Date*</Text>
                    <View style={styles.dateRow}>
                        <CalendarModal isDarkMode={isDark} selectedDate={selectedDate} setSelectedDate={(val) => {setSelectedDate(val); console.log("Calendar Date: ", val); handleChange('fld_t_DateDue', val)}}/>
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
                    <Text style={styles.label}>Description*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter description"
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
        height: 60,
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
