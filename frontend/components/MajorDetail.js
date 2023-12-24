import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import StyledInput from './other/StyledInput';

export function MajorDetail ({ route }) {
  const { major } = route.params;
  const [newName, setNewName] = useState(major.name);
  const navigation = useNavigation();

  const { screenTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: screenTitle || 'Ana Bilim Dalı Detay',
    });
  }, [screenTitle]);

  const handleCreateMajor = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/major/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Ana Bilim Dalı eklendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Ekleme Hatası:', error);
    }
  };

  const handleUpdateMajor = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/major/update/${major._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Ana Bilim Dalı güncellendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Güncelleme Hatası:', error);
    }
  };

  const handleDeleteMajor= async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/major/delete/${major._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Ana Bilim Dalı silindi.');
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
        {major.name != null ? (
            <View style={styles.container}>
      <StyledInput
        style={styles.input}
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Güncelle" onPress={handleUpdateMajor} />
        <Button style={styles.button} title="Sil" onPress={handleDeleteMajor} color="red" />
      </View>
      </View>):             <View style={styles.container}>
      <StyledInput
        placeholder="Ana Bilim Dalı Adı"
        icon="add-circle"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Ekle" onPress={handleCreateMajor} />
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
