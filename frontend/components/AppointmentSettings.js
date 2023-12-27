import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import { FontAwesome } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AppointmentSettings() {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  useFocusEffect( 
  useCallback(() => {
    getUserByEmail();
  }, [])
);

  const getAppointments = async (id) => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/appointment/getbyuserid/", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId : id,
        })
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setAppointments(prevAppointments => [...result.appointments]);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
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
      console.log(result)
      if (result.isSuccessful) {
        console.log(result.user)
        getAppointments(result.user._id);
          } else {
        Alert.alert("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, []); 

  const handleAppointmentDetail = (appo) => {
    navigation.navigate('AppointmentHistoryDetail', { screenTitle : "Randevu Görüntüleme",  appo });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={appointments}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: item.isCancalled ? "red" : "#0382a9" }
        ]}
          onPress={() => handleAppointmentDetail(item)}
        >
          <Text style={styles.itemText}>{new Date(item.time).toLocaleDateString("tr-TR") + " - " + item.between}</Text>
          <TouchableOpacity onPress={() => handleAppointmentDetail(item)}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
    {/* <Button title="Hastane Ekle" onPress={handleAddHospital} /> */}
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#0382a9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    itemText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
    separator: {
      height: 5,
      backgroundColor: '#fff',
    },
  });