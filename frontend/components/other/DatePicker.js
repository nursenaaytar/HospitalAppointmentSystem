import React, { useState } from 'react';
import { View, Text, Button, Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
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
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{marginTop: 10}}>
        <Button onPress={showDatePicker} title={"Doğum Tarihi Seç: " + date.toLocaleDateString('tr-TR')} />
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
