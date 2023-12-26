import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../auth/Firebase";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "./other/DatePicker";
import { API_BASE_ADRESS } from "../constants/config";
import GenderSelection from "./other/GenderSelection";

const Register = () => {
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState(new Date());
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleDateChange = (selectedDate) => {
    setDob(selectedDate.toLocaleDateString());
    console.log(dob);
  };

  const handleGenderSelected = (gender) => {
    setGender(gender);
  };

  const handleSignUp = async () => {
    if (identity.length != 11) {
      Alert.alert("Kimlik Numarası 11 karakter olmalıdır.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (gender.length == 0) {
      Alert.alert("Cinsiyet Seçiniz.");
      return;
    }

    await fetch(API_BASE_ADRESS + "/user/create", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        identity: identity,
        name: name,
        surname: surname,
        dob: dob,
        tel: tel,
        email: email,
        password: password,
        gender: gender,
        role: "User",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.isSuccessful) {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
              navigation.navigate("Login");
              const user = userCredentials.user;
              Alert.alert("Kayıt Başarılı", "Mesaj", [
                {
                  text: "Giriş Yap",
                  onPress: navigation.navigate("Login"),
                  style: "cancel",
                },
              ]);
            })
            .catch((error) => alert(error.message));
        } else {
          Alert.alert("Hata Oluştu:", result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={{ fontSize: 20, marginBottom: 30, color: "#0782F9" }}>
          Kayıt Ol!
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="TC Kimlik No"
          value={identity}
          onChangeText={(text) =>
            text.length <= 11 ? setIdentity(text) : null
          }
          style={styles.input}
          keyboardType="numeric"
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
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefon No"
          value={tel}
          onChangeText={(text) => setTel(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <DatePicker nameDate="Doğum" onDateChange={handleDateChange} dateForUser={new Date()}/>
        <GenderSelection onGenderSelected={handleGenderSelected} />
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
