import {
    Text,
    View,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import { useEffect, useState, useCallback } from "react";
  import { Picker } from "@react-native-picker/picker";
  import { API_BASE_ADRESS } from "../constants/config";
  import { useFocusEffect } from "@react-navigation/native";
  import DatePicker from "./other/DatePicker";
  import { useNavigation } from "@react-navigation/native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { auth } from '../auth/Firebase'

  export function DoctorAppointment() {
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
        handleSearchAppointment();
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
        const response = await fetch(API_BASE_ADRESS + "/doctor/getbyuserid", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: auth.currentUser?.email,
            stDate: formatDate(selectedDay, false),
            endDate: formatDate(selectedDay, true),
          }),
        });
        const result = await response.json();

        if (result.isSuccessful) {
          if (result.appointments.length == 0) {
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
  
    const handleSearchAppointment = async () => {
      await getAppointments();
      if (appointments.length == 0) {
      }
    };
  
    function formatDate(send, dayEnd) {
      console.log(send);
      const [month, day, year] = send.split("/");
      if (dayEnd == true) {
        return `${year}-${month}-${day}T23:59:59.000+00:00`;
      } else {
        return `${year}-${month}-${day}T00:00:00.000+00:00`;
      }
    }
  
    const handleCreateAppointment = async (item) => {
        console.log(item)
      if (item.isFull) {
        Alert.alert("Bu randevu zaten alınmış.");
        return;
      }
  
      if (item.isCancalled) {
        Alert.alert("Bu randevu iptal edilmiştir.");
        return;
      }
      navigation.navigate("DoctorAppointmentHistoryDetail", {screenTitle : "Randevu Düzenle", appo : item  })
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => handleCreateAppointment(item)}
        style={
          item.isCancalled == true
            ? styles.buttonCancalled
            : item.isFull == true
            ? styles.buttonFull
            : styles.buttonEmpty
        }
      >
        <Text style={styles.buttonText}>{item.between}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View>
        <View style={styles.container}>
          <DatePicker
            nameDate="Gün"
            dateForUser={selectedDay}
            onDateChange={handleDateChange}
            mode="date"
          />
          <Button
            style={{ marginTop: 10 }}
            title="Randevularımı Getir"
            onPress={handleSearchAppointment}
          />
          <FlatList
            data={appointments}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            numColumns={5} // İstediğiniz sütun sayısını burada belirtin
          />
        </View>
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
    buttonEmpty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      height: 50,
      backgroundColor: "#3498db",
      borderRadius: 5,
    },
    buttonFull: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      height: 50,
      backgroundColor: "#555",
      borderRadius: 5,
    },
    buttonCancalled: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      height: 50,
      backgroundColor: "#dd0000",
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
    },
  });
  