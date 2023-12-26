import React, { useState } from 'react';
import { View, Text, Button, Platform,  StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = ({ onDateChange, dateForUser, nameDate, mode }) => {
  const [date, setDate] = useState(new Date(dateForUser));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode} // time date
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{marginTop: 10}}>
        <Button onPress={showDatePicker} title={nameDate + " Tarihi Seç: " + (mode == "time" ? date.getHours('tr-TR') +":" + date.getMinutes('tr-TR'): date.toLocaleDateString('tr-TR') ) } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default DatePickerComponent;
