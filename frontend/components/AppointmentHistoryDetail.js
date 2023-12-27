// HospitalDetail.js

import React, { useState, useEffect } from "react";
import { View, Text, Button,  StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_ADRESS } from "../constants/config";
import StyledInput from "./other/StyledInput";

export function AppoinmentHistoryDetail({ route }) {
  const { appo } = route.params;
  const [newName, setNewName] = useState(appo.name);
  const [hospital, setHospital] = useState('');
  const [major, setMajor] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSurname, setDoctorSurname] = useState('');
  const navigation = useNavigation();

  const { screenTitle } = route.params;

  useEffect(() => {
    // Yeni başlığı ayarla
    navigation.setOptions({
      title: screenTitle || "Randevu Geçmişi",
    });
    //getUserByEmail();
    getDoctorInfo(appo.doctorId);
  }, [screenTitle, doctorName, doctorSurname]);

  const handleUpdateAppointment = async () => {
    try {
      const response = await fetch(
        API_BASE_ADRESS + `/appointment/cancel/${appo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFull: false,
            patientId: null,
            isCancalled: false,
          }),
        }
      );

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert("Başarılı", "Randevu iptal edildi.");
        navigation.goBack();
      } else {
        Alert.alert("Hata", result.message);
      }
    } catch (error) {
      console.error("Güncelleme Hatası:", error);
    }
  };

  const getDoctorInfo = async (id) => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/doctor/getbydoctorid/", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          doctorId : id,
        })
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setDoctorName(result.userExist.name);
        setDoctorSurname(result.userExist.surname);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
      <StyledInput value={"Doktor Adı: " + doctorName} editable={false}/>
      <StyledInput value={"Doktor Soyadı: " + doctorSurname} editable={false}/>
          <StyledInput
            value={
              "Randevu Tarihi: " +
              new Date(appo.time).toLocaleDateString("tr-TR")
            }
            editable={false}
          />
          <StyledInput value={"Randevu Saati: " + appo.between} editable={false}/>
          <StyledInput placeholder={"Randevu notunuz"} value={"Notunuz: " + appo.note} editable={false}/>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Randevu İptal"
            onPress={handleUpdateAppointment}
            color="red"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  styledInput: {
    alignItems: "center",
    justifyContent: "center",
  },
});
