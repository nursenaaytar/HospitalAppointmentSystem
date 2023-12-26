import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import { API_BASE_ADRESS } from "../constants/config";
import { useFocusEffect } from "@react-navigation/native";
import DatePicker from "./other/DatePicker";
import StyledInput from "./other/StyledInput";
import { useNavigation } from '@react-navigation/native';

export function Plan() {
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospital, setHospital] = useState(null);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [hour, setHour] = useState(new Date());
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const navigation = useNavigation();

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setSelectedDay(selectedDate.toLocaleDateString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      asyncFunctions();
      setActive(false);
    }, [major, hospital])
  );

  const asyncFunctions = async () => {
    await getMajors();
    await getHospitals();
    await getDoctors();
    console.log(doctors);
    console.log("-----");
    await getUsersByDoctor();
  };

  const getDoctors = async () => {
    try {
      const response = await fetch(
        API_BASE_ADRESS + "/doctor/getbyhospitalandmajor",
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            hospitalId: hospital,
            majorId: major,
          }),
        }
      );

      const result = await response.json();
      if (result.isSuccessful) {
        setDoctors(result.doctors);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getHospitals = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/hospital/getall/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setHospitals(result.hospitals);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMajors = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/major/getall/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setMajors(result.majors);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUsersByDoctor = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/user/getdoctors/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      //console.log(result.users);
      if (result.isSuccessful) {
        setUsers(result.users);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCreatePlan = () => {


    if (major != null && hospital != null && doctor != null) {
      setActive(true);
    } else {
      Alert.alert("Tüm seçimler yapılmalıdır.");
    }
  };

  const handleSaveAppointment = () => {
    console.log("deneme");
            setActive(true);
        if(startHour > 24 || endHour > 24  || endHour < 0 || startHour <0 ) {
          Alert.alert("Geçerli saat aralığı giriniz.");
          return;
        }
        console.log("bbb");

        const timeSlots = [];
        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute = 0; minute < 60; minute += selectedTime) {
            const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
            const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
            const time = `${formattedHour}:${formattedMinute}`;
            timeSlots.push(time);
          }
        }

        for(let i = 0; i < timeSlots.length; i++) {
           handleCreateAppointment(timeSlots[i]);
        }
        Alert.alert("Başarılı", "Planlar oluşturuldu");
        navigation.navigate("Plan")
  };

  const handleCreateAppointment = async (aralik) => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/appointment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({doctorId:doctor, time: selectedDay, between : aralik }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        //navigation.navigate("Plan");
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Ekleme Hatası:', error);
    }
  };

  return (
    <View>
      <Picker
        style={{ width: "80%" }}
        selectedValue={hospital}
        onValueChange={(selectedValue) => {
          setHospital(selectedValue);
        }}
      >
        <Picker.Item key={null} label={"Hastane Seçiniz"} value={null} />
        {hospitals.map((hospital) => (
          <Picker.Item
            key={hospital._id}
            label={hospital.name}
            value={hospital._id}
          />
        ))}
      </Picker>

      <Picker
        style={{ width: "80%" }}
        selectedValue={major}
        onValueChange={(selectedValue) => {
          setMajor(selectedValue);
        }}
      >
        <Picker.Item key={null} label={"Ana Bilim Dalı Seçiniz"} value={null} />
        {majors.map((major) => (
          <Picker.Item key={major._id} label={major.name} value={major._id} />
        ))}
      </Picker>
      <Picker
        style={{ width: "80%" }}
        selectedValue={doctor}
        onValueChange={(selectedValue) => {
          setDoctor(selectedValue);
        }}
      >
        <Picker.Item key={null} label={"Doctor Seçiniz"} value={null} />
        {doctors.map((doctor) => (
          <Picker.Item
            key={doctor.userId}
            label={
              users.find((user) => user._id === doctor.userId).name +
              " " +
              users.find((user) => user._id === doctor.userId).surname
            }
            value={doctor.userId}
          />
        ))}
      </Picker>
      <Button title="Plan oluştur" onPress={handleCreatePlan} />
      {active && (
        <View style={styles.container}>
          <>
            <DatePicker
              nameDate="Gün"
              dateForUser={selectedDay}
              onDateChange={handleDateChange}
              mode="date"
            />
            <StyledInput
              placeholder="Başlangıç Saati"
              value={startHour}
              keyboardType="numeric"
              onChangeText={(text) => setStartHour(text)}
              style={styles.input}
            />
            <StyledInput
              placeholder="Bitiş Saati"
              value={endHour}
              keyboardType="numeric"
              onChangeText={(text) => setEndHour(text)}
              style={styles.input}
            />
            <Picker
              style={{ width: "80%" }}
              selectedValue={selectedTime}
              onValueChange={(selectedValue) => {
                setSelectedTime(selectedValue);
              }}
            >
              <Picker.Item
                key={null}
                label={"Randevu Aralığı Seçiniz"}
                value={null}
              />
              <Picker.Item key={15} label="15 Dakika" value={15} />
              <Picker.Item key={20} label="20 Dakika" value={20} />
              <Picker.Item key={30} label="30 Dakika" value={30} />
            </Picker>
          </>
          <Button title="Randevu Oluştur" onPress={handleSaveAppointment} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
  },
  timePickerButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    marginTop: 20,
  },
});
