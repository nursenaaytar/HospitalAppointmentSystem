import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, LogoTitle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Register from "./components/Register";
import { Tabs } from "./components/Tabs";
import {HospitalDetail} from "./components/HospitalDetail";
import { MajorDetail } from "./components/MajorDetail";
import { UserDetail } from "./components/UserDetail";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Giriş Yap" }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen name="HospitalDetail" component={HospitalDetail} />
        <Stack.Screen name="MajorDetail" component={MajorDetail} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
      {/* <Tab.Navigator>
      <Tab.Screen name="Ana Sayfa" component={Home} options={{tabBarIcon:({color, size})=>(<FontAwesome name="home" size={size} color={color} />)}} /> 
      <Tab.Screen name="Randevu Al" component={Appointment} options={{tabBarIcon:({color, size})=> (<AntDesign name="layout" size={size} color={color} />)}}/>
      <Tab.Screen name="Geçmiş" component={History} options={{tabBarIcon:({color, size})=> (<FontAwesome name="history" size={size} color={color} />)}}/>
      <Tab.Screen name="Ayarlar" component={Settings}options={{tabBarIcon:({color, size})=> (<Feather name="settings" size={size} color={color} />)}} />
    </Tab.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
