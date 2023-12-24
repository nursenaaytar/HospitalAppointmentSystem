import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import { FontAwesome } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';

export function HospitalSettings() {
  const [hospitals, setHospitals] = useState([]);
  const navigation = useNavigation();


  useFocusEffect( // geçişlerde refresh
  useCallback(() => {
    getHospitals();
  }, [])
);

  const getHospitals = async () => {
    console.log("deneme2");
    try {
      const response = await fetch(API_BASE_ADRESS + "/hospital/getall/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setHospitals(prevHospitals => [...result.hospitals]); // Güncelleme
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []); 

  const handleAddHospital = () => {

    const hospital = {hospital: { name: null}}
    navigation.navigate('HospitalDetail', {screenTitle : "Hastane Ekle", hospital});
  };

  const handleHospitalDetail = (hospital) => {
    navigation.navigate('HospitalDetail', { screenTitle : "Hastane Düzenle",  hospital });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={hospitals}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleHospitalDetail(item)}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleHospitalDetail(item)}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
    <Button title="Hastane Ekle" onPress={handleAddHospital} />
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