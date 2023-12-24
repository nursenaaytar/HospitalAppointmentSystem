import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../auth/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_ADRESS } from "../constants/config";

const Login = () => {
  const [email, setEmail] = useState("mys@hotmail.com");
  const [password, setPassword] = useState("123123");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tabs");
      }
    });

    return unsubscribe;
  }, []);

  const getUserByEmail = async (email) => {
    try {
      const response = await fetch(API_BASE_ADRESS + "/user/get/" + email, {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
  
      const result = await response.json();
  
      if (result.isSuccessful) {
        console.log(JSON.stringify(result.user));
        await AsyncStorage.setItem("name", JSON.stringify(result.user.name));
        await AsyncStorage.setItem("surname", JSON.stringify(result.user.surname));
        await AsyncStorage.setItem("email", JSON.stringify(result.user.email));
        await AsyncStorage.setItem("role", JSON.stringify(result.user.role));
      } else {
        Alert.alert("Hata Oluştu:", result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const handleLogin =  () => {
     auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
         getUserByEmail(user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={{ fontSize: 20, marginBottom: 30, color: "#0782F9" }}>
          Giriş Yap
        </Text>
      </View>
      <View style={styles.inputContainer}>
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Kayıt Ol!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
