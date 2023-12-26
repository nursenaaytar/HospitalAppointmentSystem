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
  
  export function TakeAppointment() {
    const [majors, setMajors] = useState([]);
    const [major, setMajor] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [hospital, setHospital] = useState(null);
    const [appointments, setAppointments] = useState([]);
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

    const getAppointments = async () => {
        setAppointments([]);
        try {
          const response = await fetch(
            API_BASE_ADRESS + "/appointment/search",
            {
              method: "post",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                doctorId: doctor,
                stDate : formatDate(selectedDay, false),
                endDate: formatDate(selectedDay, true),
              }),
            }
          );
    
          const result = await response.json();
          if (result.isSuccessful) {
            if(result.appointments.length == 0){
                Alert.alert("Aradığınız kriterlere uygun randevu bulunamadı");
            }
            setAppointments(result.appointments);
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
  
    const handleSearchAppointment = async () => {
        await getAppointments();
        console.log(appointments.length);
        if(appointments.length == 0) {
        
        }
    };

    function formatDate(send, dayEnd) {
        console.log(send);
        const [month, day, year] = send.split('/');
        if(dayEnd == true){
            return `${year}-${month}-${day}T23:59:59.000+00:00`;
        }else{
            return `${year}-${month}-${day}T00:00:00.000+00:00`;
        }
      }
      
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
          <View style={styles.container}>
              <DatePicker
                nameDate="Gün"
                dateForUser={selectedDay}
                onDateChange={handleDateChange}
                mode="date"
              />
            <Button style={{marginTop : 10}} title="Randevu Ara" onPress={handleSearchAppointment} />
          </View>{
            appointments.map((appo) => (
                    <Button style ={{width:2}} title={appo.between}/>
            ))
          }
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
  