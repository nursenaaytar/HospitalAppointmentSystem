import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import { FontAwesome } from '@expo/vector-icons'; 

export function MajorSettings() {
  const [majors, setMajors] = useState([]);
  const navigation = useNavigation();

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

  useEffect(() => {
    getMajors();
  }, [majors]); 

  const handleAddMajor = () => {
    const major = {major: { name: null}}
    navigation.navigate('MajorDetail', {screenTitle : "Ana Bilim Dalı Ekle", major});
  };

  const handleMajorDetail = (major) => {
    navigation.navigate('MajorDetail', { screenTitle : "Ana Bilim Dalı Düzenle",  major });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={majors}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleMajorDetail(item)}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleMajorDetail(item)}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
    <Button title="Ana Bilim Dalı Ekle" onPress={handleAddMajor} />
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