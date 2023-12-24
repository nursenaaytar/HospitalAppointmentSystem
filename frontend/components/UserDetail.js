import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_ADRESS } from '../constants/config';
import StyledInput from './other/StyledInput';
import GenderSelection from "./other/GenderSelection";
import RoleSelection from "./other/RoleSelection";
import DatePicker from "./other/DatePicker";

export function UserDetail({ route }) {
  const { user } = route.params;
  const [newName, setNewName] = useState(user.name);
  const [newSurname, setNewSurname] = useState(user.surname);
  const [newTel, setNewTel] = useState(user.tel);
  const [newGender, setNewGender] = useState(user.gender);
  const [newDob, setNewDob] = useState(user.dob);
  const [newRole, setNewRole] = useState(user.role);
  const navigation = useNavigation();

  const { screenTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: screenTitle || 'Kullanıcı Detay',
    });
  }, [screenTitle]);

  const handleCreateUser = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Kullanıcı eklendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Ekleme Hatası:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/user/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, surname: newSurname, tel: newTel, gender: newGender,  dob: newDob, role: newRole }),
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Kullanıcı güncellendi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Güncelleme Hatası:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(API_BASE_ADRESS + `/user/delete/${user._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.isSuccessful) {
        Alert.alert('Başarılı', 'Kullanıcı silindi.');
        navigation.goBack();
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error) {
      console.error('Silme Hatası:', error);
    }
  };

  const handleDateChange = (selectedDate) => {
    setNewDob(selectedDate.toLocaleDateString());
  };

  const handleGenderSelected = (gender) => {
    setNewGender(gender);
  };

  const handleRoleSelected = (role) => {
    if(role === "Doctor"){
      
    }
    setNewRole(role);
  };

  return (
    <>
        {user.name != null ? (
            <View style={styles.container}>
      <StyledInput
        style={styles.input}
        value={newName}
        icon="person-outline"
        onChangeText={(text) => setNewName(text)}
      />
        <StyledInput
          placeholder="Soyadınız"
          value={newSurname}
          icon="person"
          onChangeText={(text) => setNewSurname(text)}
          style={styles.input}
        />
        <StyledInput
          placeholder="Telefon No"
          value={newTel}
          icon = "call-outline"
          onChangeText={(text) => setNewTel(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <DatePicker dateForUser={newDob} onDateChange={handleDateChange} />
        <GenderSelection genderForUser={newGender} onGenderSelected={handleGenderSelected} />
        <RoleSelection roleForUser={newRole} onRoleSelected={handleRoleSelected} />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Güncelle" onPress={handleUpdateUser} />
        <Button style={styles.button} title="Sil" onPress={handleDeleteUser} color="red" />
      </View>
      </View>):             
      <View style={styles.container}>
      <StyledInput
        placeholder="Kullanıcı Adı"
        icon="add-circle"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Ekle" onPress={handleCreateUser} />
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
    marginTop: 40
  },
  styledInput: {
    alignItems: 'center',
    justifyContent : 'center',
  }
});
