import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

import HomeScreen from '../screens/main/HomeScreen';
import TrainScreen from '../screens/main/TrainScreen';
import NutritionScreen from '../screens/main/NutritionScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // İŞTE O KLAVYEYİ DÜZELTEN SİHİRLİ KOD BURAYA GELDİ! 👇
        tabBarHideOnKeyboard: true, 
        tabBarStyle: {
          backgroundColor: '#1E1E1E', 
          borderTopColor: '#3b3b3b',  
          height: 65,                 
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#EC740A', 
        tabBarInactiveTintColor: '#aaa',  
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'home'; 

          if (route.name === 'Ana Sayfa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Antrenman') {
            iconName = 'dumbbell'; 
          } else if (route.name === 'Beslenme') {
            iconName = focused ? 'food-apple' : 'food-apple-outline'; 
          } else if (route.name === 'Profil') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={focused ? 30 : 25} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Antrenman" component={TrainScreen} />
      <Tab.Screen name="Beslenme" component={NutritionScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}