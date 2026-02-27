import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "İREM" }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Icon name="account-circle-outline" size={34} color="#fff" />
        <Text style={styles.greetingText}>HOŞGELDİN {userName.toLocaleUpperCase('tr-TR')} !</Text>
      </View>
      
      <View style={styles.headerRight}>
        <TouchableOpacity><Icon name="magnify" size={26} color="#fff" style={styles.iconSpaced} /></TouchableOpacity>
        <TouchableOpacity><Icon name="bell-outline" size={26} color="#fff" style={styles.iconSpaced} /></TouchableOpacity>
        <TouchableOpacity><Icon name="message-text-outline" size={26} color="#fff" /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 15,
    backgroundColor: '#1E1E1E', // Sabit kalacağı için arka planı sağlamlaştırdık
    zIndex: 10,                 // Sayfanın her zaman en üst katmanında durmasını sağlar
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  greetingText: { color: '#fff', fontSize: 17, fontWeight: 'bold', marginLeft: 12, letterSpacing: 0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconSpaced: { marginRight: 16 },
});