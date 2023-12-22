import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../auth/Firebase";

const Register = () => {
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async () => {

    await fetch("http://192.168.1.33:3000/user/create", {
      method: "POST",
      body: JSON.stringify({
        identity: identity,
        name: name,
        surname: surname,
        dob: dob,
        tel: tel,
        email: email,
        password: password,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.message}`);
      }
      return response.json();
    })
    .then(_ => {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        navigation.navigate('Login')
        const user = userCredentials.user;
        Alert.alert('Kayıt Başarılı', 'Mesaj',[{
            text: 'Giriş Yap',
            onPress: navigation.navigate('Login'),
            style: 'cancel',
          }])
      })
      .catch((error) => alert(error.message));
    })
    .catch(error => {
      // Hata durumunda
      Alert.alert('Hata:', error);
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={{fontSize:20, marginBottom:30, color: "#0782F9"}}>Kayıt Ol!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="TC Kimlik No"
          value={identity}
          onChangeText={(text) => setIdentity(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Adınız"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Soyadınız"
          value={surname}
          onChangeText={(text) => setSurname(text)}
          style={styles.input}
        />
                <TextInput
          placeholder="Telefon No"
          value={tel}
          onChangeText={(text) => setTel(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Doğum Tarihi"
          value={dob}
          onChangeText={(text) => setDob(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
