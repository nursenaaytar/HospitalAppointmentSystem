// HospitalDetail.js

import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_ADRESS } from "../constants/config";
import StyledInput from "./other/StyledInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function TakeAppointmentDetail({ route }) {
  const { appoint, doctorName } = route.params;
  const [userId, setUserId] = useState('');
  const [ note, setNote] = useState('');
  const navigation = useNavigation();

  const { screenTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: screenTitle || "Randevu Düzenle",
    });
    
    getUserByEmail();
  }, [screenTitle]);

  const handleUpdateAppointment = async () => {
    try {
      const response = await fetch(
        API_BASE_ADRESS + `/appointment/take`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ note: note, _id : appoint._id, patientId : userId  }),
        }
      );
      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert("Başarılı", "Randevu Alındı.");
        navigation.goBack();
      } else {
        Alert.alert("Hata", result.message);
      }
    } catch (error) {
      console.error("Güncelleme Hatası:", error);
    }
  };

  const getUserByEmail = async () => {
    var email = await AsyncStorage.getItem('email');
    try {
      const response = await fetch(API_BASE_ADRESS + "/user/get/" + JSON.parse(email), {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
  
      const result = await response.json();
      if (result.isSuccessful) {
        setUserId(result.user._id);
          } else {
        Alert.alert("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  

  return (
    <>
      {doctorName != null ? (
        <View style={styles.container}>
          <StyledInput value={"Doktor Adı: " + doctorName} editable={false}/>
          <StyledInput
            value={
              "Randevu Tarihi: " +
              new Date(appoint.time).toLocaleDateString("tr-TR")
            }
            editable={false}
          />
          <StyledInput value={"Randevu Saati: " + appoint.between} editable={false}/>
          <StyledInput placeholder={"Randevu notunuz"} value={note} onChangeText={(text) => setNote(text)}/>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title="Randevu Al"
              onPress={handleUpdateAppointment}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title="Ekle"
              onPress={handleUpdateAppointment}
            />
          </View>
        </View>
      )}
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
