// HospitalDetail.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import StyledInput from './other/StyledInput';

export function AppoinmentHistoryDetail({ route }) {
  const { appo } = route.params;
  const [newName, setNewName] = useState(appo.name);
  const navigation = useNavigation();

  const { screenTitle } = route.params;

  useEffect(() => {
    // Yeni başlığı ayarla
    navigation.setOptions({
      title: screenTitle || 'Randevu Geçmişi',
    });
    getUserByEmail();
  }, [screenTitle]);

  const handleCreateHospital = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/hospital/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Hastane eklendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Ekleme Hatası:', error);
    }
  };

  const handleUpdateHospital = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/hospital/update/${hospital._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Hastane güncellendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Güncelleme Hatası:', error);
    }
  };

  const handleDeleteHospital = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/hospital/delete/${hospital._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Hastane silindi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Silme Hatası:', error);
    }
  };

  return (
    <>
        {hospital.name != null ? (
            <View style={styles.container}>
      <StyledInput
        style={styles.input}
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Güncelle" onPress={handleUpdateHospital} />
        <Button style={styles.button} title="Sil" onPress={handleDeleteHospital} color="red" />
      </View>
      </View>):             <View style={styles.container}>
      <StyledInput
        placeholder="Hastane Adı"
        icon="add-circle"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Ekle" onPress={handleCreateHospital} />
      </View>
      </View>}</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  styledInput: {
    alignItems: 'center',
    justifyContent : 'center',
  }
});
