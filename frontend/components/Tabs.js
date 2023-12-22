import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { Appointment } from './Appointment';
import { History } from './History';
import { Settings } from './Settings';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

export function Tabs(){
    return (
                <Tab.Navigator>
      <Tab.Screen name="Ana Sayfa" component={Home} options={{tabBarIcon:({color, size})=>(<FontAwesome name="home" size={size} color={color} />)}} /> 
      <Tab.Screen name="Randevu Al" component={Appointment} options={{tabBarIcon:({color, size})=> (<AntDesign name="layout" size={size} color={color} />)}}/>
      <Tab.Screen name="Geçmiş" component={History} options={{tabBarIcon:({color, size})=> (<FontAwesome name="history" size={size} color={color} />)}}/>
      <Tab.Screen name="Ayarlar" component={Settings}options={{tabBarIcon:({color, size})=> (<Feather name="settings" size={size} color={color} />)}} />
    </Tab.Navigator>
    );
}