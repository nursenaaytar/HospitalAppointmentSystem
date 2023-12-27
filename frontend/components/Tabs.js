import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appointment } from './Appointment';
import { Home } from './Home';
import { Plan } from './Plan';
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
import { TakeAppointment} from './TakeAppointment';
import { AppoinmentHistoryDetail } from './AppointmentHistoryDetail';
import { AppointmentSettings } from './AppointmentSettings';
import { DoctorAppointment } from './DoctorAppointment';
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
        <Tab.Screen name="Hastane" component={HospitalSettings} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="hospital" size={size} color={color} />) }} />
        <Tab.Screen name="Ana Bilim Dalı" component={MajorSettings} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="flow-tree" size={size} color={color} />) }} />
        <Tab.Screen name="Kullanıcılar" component={UserSettings} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="users" size={size} color={color} />) }} />
        <Tab.Screen name="Plan" component={Plan} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="calendar" size={size} color={color} />) }} />
      </>)}
      {userRole === "User" && (
        <>
        <Tab.Screen name="Randevu Al" component={TakeAppointment} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="layout" size={size} color={color} />) }} />
        <Tab.Screen name="Randevu Geçmişim" component={AppointmentSettings} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="history" size={size} color={color} />) }} />
        </>
      )}
      {userRole === "Doctor" && (
        <>
        <Tab.Screen name="Programım" component={DoctorAppointment} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="calendar" size={size} color={color} />)  }} />
       </>
      )}
      <Tab.Screen name="Profil" component={Settings} options={{ tabBarIcon: ({ color, size }) => (<Feather name="settings" size={size} color={color} />) }} />
    </Tab.Navigator>
  );
}