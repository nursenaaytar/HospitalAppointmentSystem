import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appointment } from './Appointment';
import { Home } from './Home';
import { History } from './History';
import { Settings } from './Settings';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HospitalSettings } from './HospitalSettings';
import { MajorSettings } from './MajorSettings';
import { UserSettings } from './UserSettings';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export function Tabs() {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("role");
        if (storedUserInfo !== null) {
          const data = JSON.parse(storedUserInfo);
          setUserRole(data);
        }
      } catch (error) {
        console.error("AsyncStorage'ten veri çekilirken bir hata oluştu:", error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Ana Sayfa" component={Home} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />) }} />

      {userRole === "Admin" && (<>
        <Tab.Screen name="Hastane Bilgileri" component={HospitalSettings} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="hospital" size={size} color={color} />) }} />
        <Tab.Screen name="Ana Bilim Dalı" component={MajorSettings} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="flow-tree" size={size} color={color} />) }} />
        <Tab.Screen name="Kullanıcılar" component={UserSettings} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="users" size={size} color={color} />) }} />
      </>)}
      {userRole === "User" && (
        <>
          <Tab.Screen name="Randevu Al" component={Appointment} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="layout" size={size} color={color} />) }} />
          <Tab.Screen name="Geçmiş" component={History} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="history" size={size} color={color} />) }} />
        </>
      )}
      {/* {userRole === "Doctor" && (
        <Tab.Screen name="Ayarlar" component={Settings} options={{ tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />) }} />)
      } */}
      <Tab.Screen name="Ayarlar" component={Settings} options={{ tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />) }} />
    </Tab.Navigator>
  );
}