import { useNavigation } from '@react-navigation/core'
import React, {useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../auth/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const Settings = () => {
  const navigation = useNavigation()
  const [name, setName] = React.useState("")
  const [surname, setSurname] = React.useState("")
  const [role, setRole] = React.useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setName(JSON.parse(await AsyncStorage.getItem("name")));
        setSurname(JSON.parse(await AsyncStorage.getItem("surname")));
        setRole(JSON.parse(await AsyncStorage.getItem("role")));
      } catch (error) {
        console.error(
          "AsyncStorage'ten veri çekilirken bir hata oluştu:",
          error
        );
      }
    };
    getUserInfo();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then( () => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15}}>Adınız: {name}</Text>
      <Text style={{fontSize: 15}}>Soyadınız: {surname}</Text>
      <Text style={{fontWeight: 700}}>Email: {auth.currentUser?.email}</Text>
      <Text style={{fontWeight: 700}}>Rol: {role}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})