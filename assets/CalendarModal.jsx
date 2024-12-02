/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester
 ***/

import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import Colors from './Color';
import { Input } from 'react-native-elements';
import { Calendar, CalendarUtils } from 'react-native-calendars';

//Please only pass date strings to initDate in the format of YYYY-MM-DD
//Please pass an integer to dateRange to indicate the furthest into the future and back into the past that you can select
const CalendarModal = ({selectedDate, setSelectedDate,  dateRange=90, isDarkMode=false, disabled=false}) => {
    const [isOpen, setIsOpen] = useState(false);

    const TODAY = new Date().toISOString().split('T')[0] + "";

    const getDate = (count) => {
        const date = new Date(TODAY);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    if (!disabled) {
        return (
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setIsOpen(!isOpen)}>
                    <Input
                        inputContainerStyle = {[styles.textBox, isDarkMode && styles.textBoxDark]}
                        maxLength={128}
                        disabled={true}
                        value={selectedDate}
                        disabledInputStyle={[styles.inputText, isDarkMode && styles.inputTextDark]}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isOpen}
                >
                    <Pressable 
                        onPress={() => setIsOpen(false)}
                        style={styles.backContainer}
                    >
                        <View style={styles.container}>
                            <Calendar
                                onDayPress={day => {
                                    setSelectedDate(day.dateString);
                                    setIsOpen(false)
                                }}
                                markedDates={{
                                    [selectedDate]: {selected: true, disableTouchEvent: true, selectedColor: Colors.IRISH_GREEN, marked: true},
                                }}
                                maxDate={getDate(dateRange)}
                                minDate={getDate(-1 * dateRange)}
                                theme={isDarkMode ? {
                                    calendarBackground: Colors.IRIDIUM,
                                    dayTextColor: Colors.SANTA_GRAY,
                                    monthTextColor: Colors.WHITE_SMOKE,
                                    todayTextColor: Colors.IRISH_GREEN,
                                    arrowColor: Colors.IRISH_GREEN,
                                } : {
                                    calendarBackground: Colors.WHITE_SMOKE,
                                    todayTextColor: Colors.IRISH_GREEN,
                                    arrowColor: Colors.IRISH_GREEN,
                                }}
                            />
                        </View>
                    </Pressable>
                </Modal>
            </View>
        );
    } else {
        return (
            <View>
                <Input
                    inputContainerStyle = {[styles.textBox, isDarkMode && styles.textBoxDark]}
                    maxLength={128}
                    disabled={true}
                    value={selectedDate}
                    disabledInputStyle={[styles.inputText, isDarkMode && styles.inputTextDark]}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
    backContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1,
    },
    container: {
        zIndex: 10,
    },
    inputText:{
        fontSize: 16,
        marginLeft: "2%",
        color: Colors.ALMOST_BLACK,
        opacity: 1
    },
    inputTextDark:{
        color: Colors.WHITE_SMOKE
    },
});

export default CalendarModal;
