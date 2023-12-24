import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import { FontAwesome } from '@expo/vector-icons'; 

export function UserSettings() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const getUsers = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/user/getall/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccessful) {
        setUsers(result.users);
      } else {
        console.log("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [users]); 

  const handleUserDetail = (user) => {
    navigation.navigate('UserDetail', { screenTitle : "Kullanıcı Düzenle",  user });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={users}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: item.gender === "Erkek" ? '#0382ff' : '#ff52a9' }]}
        onPress={() => handleUserDetail(item)}
        >
          <Text style={styles.itemText}>{item.name + " " + item.surname + " | Yaş: " + (new Date().getFullYear() - parseInt(item.dob.substring(0,4), 10)) + " | " + item.role}</Text>
          <TouchableOpacity onPress={() => handleUserDetail(item)}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
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