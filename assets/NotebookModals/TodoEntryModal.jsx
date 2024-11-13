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
        "fld_t_DateDue": '',
        "fld_fs_FarmerID_fk": '',
        "fld_l_LocationID_fk": '',
        CropID: '',
        "fld_tt_TaskTypeID_fk": '',
        NewTask: '',
        "fld_t_TaskIconPath": '',
        "fld_t_IsCompleted": false,
        "fld_t_DateCompleted": '',
    });

    const [isDark, setIsDarkMode] = useState(false);
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
            setIsDarkMode(result)
        }

        // call the function
        fetchDarkModeSetting()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    useEffect(() => {
        if (!initialTaskData) return; // Guard clause for initialTaskData
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
            "January": "01", "February": "02", "March": "03", "April": "04",
            "May": "05", "June": "06", "July": "07", "August": "08",
            "September": "09", "October": "10", "November": "11", "December": "12"
        };

        // Split the current date parts or default to current year
        const dateParts = taskData["fld_t_DateDue"].split('-');
        let year = dateParts[0] || `${new Date().getFullYear()}`;
        let month = dateParts[1] || '01';
        let day = dateParts[2] || '01';

        if (type === 'month') {
            month = monthMap[value];
        } else if (type === 'day') {
            day = value.padStart(2, '0'); // Ensure day is two digits
        } else if (type === 'year') {
            year = value;
        }

        // Construct ISO format date (YYYY-MM-DD)
        const newDate = `${year}-${month}-${day}`;
        setTaskData(prevData => ({ ...prevData, "fld_t_DateDue": newDate }));
    };
    
    
    const handleChange = (name, value) => {
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };
    
    
    // Initialize the icon picker visibility state
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
                        style={styles.picker}
                    >
                        {farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <Picker.Item key={farmer[0]} label={farmer[3]} value={farmer[0]} />
                            ))
                        ) : (
                            <Picker.Item label="No farmers available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Location Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Location</Text>
                    <Picker
                        selectedValue={taskData["fld_l_LocationID_fk"]}
                        onValueChange={(itemValue) => handleChange("fld_l_LocationID_fk", itemValue)}
                        style={styles.picker}
                    >
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <Picker.Item key={location[0]} label={location[4]} value={location[0]} />
                            )
                        )
                        ) : (
                            <Picker.Item label="No locations available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Crop Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Crop</Text>
                    <Picker
                        selectedValue={taskData.CropID}
                        onValueChange={(itemValue) => handleChange('CropID', itemValue)}
                        style={styles.picker}
                    >
                        {crops.length > 0 ? (
                            crops.map((crop) => (
                                <Picker.Item key={crop.id} label={crop.name} value={crop.id} />
                            ))
                        ) : (
                            <Picker.Item label="No crops available" value="" />
                        )}
                    </Picker>
                </View>

                {/* Task Type Picker */}
                <View style={[styles.listContainer, isDark && styles.darkListContainer]}>
                    <Text style={styles.label}>Task Type</Text>
                    <Picker
                        selectedValue={taskData["fld_tt_TaskTypeID_fk"]}
                        onValueChange={(itemValue) => handleChange("fld_tt_TaskTypeID_fk", itemValue)}
                        style={styles.picker}
                    >
                        {taskTypes.length > 0 ? (
                            taskTypes.map((taskType) => (
                                <Picker.Item key={taskType[0]} label={taskType[3]} value={taskType[0]} />
                            ))
                        ) : (
                            <Picker.Item label="No task types available" value="" />
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
                            style={styles.datePicker}
                            itemStyle={{backgroundColor: Colors.IRISH_GREEN}}
                        >
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                <Picker.Item key={month} label={month} value={month} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[1] || '1'}
                            onValueChange={(itemValue) => handleDateChange('day', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(31)].map((_, i) => (
                                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={taskData["fld_t_DateDue"].split(' ')[2] || `${new Date().getFullYear()}`}
                            onValueChange={(itemValue) => handleDateChange('year', itemValue)}
                            style={styles.datePicker}
                        >
                            {[...Array(21)].map((_, i) => (
                                <Picker.Item key={i} label={`${new Date().getFullYear() + i}`} value={`${new Date().getFullYear() + i}`} style={{fontSize: 16}}/>
                            ))}
                        </Picker>
                    </View>
                </View>
 {/* Icon Picker Section */}
                   <View style={styles.listContainer}>
                       <Text style={styles.label}>Select Task Icon</Text>
                       <TouchableOpacity onPress={() => setIconPickerVisible(true)} style={styles.iconPickerContainer}>
                           {taskData.fld_t_TaskIconPath ? (
                               <MaterialCommunityIcons name={taskData.fld_t_TaskIconPath} size={32} />
                           ) : (
                               <Text style={styles.placeholderText}>Choose an Icon</Text>
                           )}
                       </TouchableOpacity>
                   </View>
                   {/* Custom Icon Picker Modal */}
                   <Modal visible={iconPickerVisible} transparent animationType="slide">
                       <View style={styles.iconPickerModal}>
                           <FlatList
                               data={icons} // icon data
                               keyExtractor={(item) => item}
                               numColumns={4}
                               renderItem={({ item }) => (
                                   <TouchableOpacity onPress={() => handleIconSelect(item)} style={styles.iconItem}>
                                       <MaterialCommunityIcons name={item} size={32} />
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
        backgroundColor: Colors.PERIWINKLE_GRAY,
        flex: 1,
        fontFamily: 'Domine-Regular',
        height: '100%',
        paddingBottom: 500,

    },
    darkModalContainer: {
        backgroundColor: Colors.BALTIC_SEA,
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
        backgroundColor: Colors.PERIWINKLE_GRAY
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#fff',
        height: 50,
    },
       iconPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        fontFamily: 'Domine-Regular',
    },
    iconPickerContainer: {
        marginBottom: 20,
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Domine-Regular',
    },
});

export default TodoEntryModal;
