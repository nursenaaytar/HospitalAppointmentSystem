import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export function Home() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigation = useNavigation();

  useFocusEffect( // geçişlerde refresh
  useCallback(() => {
    getUserInfo();
  }, [])
);

  useEffect(() => {
    console.log("UseEffect")
    getUserInfo();
    console.log("Name: "+ name);
    console.log("Surname: "+ surname);
  }, []); 

  const getUserInfo = async () => {
    try {
      await AsyncStorage.getItem("name").then((user) => {console.log("User: "+ user)}).catch((err) => {console.log("Error: "+ err)});
      console.log("SET YOK : " + await AsyncStorage.getItem("name"));
      await setName(JSON.parse(await AsyncStorage.getItem("name")));
      await setSurname(JSON.parse(await AsyncStorage.getItem("surname")));
    } catch (error) {
      console.error(
        "AsyncStorage'ten veri çekilirken bir hata oluştu:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 50, fontWeight: 700 }}>
        Hoş Geldin {name + " " + surname + "!"}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 50, textAlign: "center" }}>
        Alt kısımda yer alan menüyü kullanarak işlemlerine devam edebilirsiniz.
      </Text>
      {/* 
              <Button
        title="Hastane Ayarları"
        onPress={() => navigation.navigate('HospitalSettings')}
        style={styles.button}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Ana Bilim Dalı Ayarları"
        onPress={() => navigation.navigate('MajorSettings')}
        style={styles.button}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Kullanıcı Ayarları"
        onPress={() => navigation.navigate('UserSettings')}
        style={styles.button}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20, // İstediğiniz buton büyüklüğünü burada belirleyebilirsiniz
  },
  buttonSpacing: {
    marginBottom: 20, // İstediğiniz boşluk miktarını burada belirleyebilirsiniz
  },
});
