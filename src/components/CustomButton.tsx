import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  type?: 'PRIMARY' | 'SECONDARY'; // Turuncu mu Beyaz mı?
  icon?: React.ReactNode; // İkon var mı? (Google logosu için)
}

export default function CustomButton({ title, onPress, type = 'PRIMARY', icon }: Props) {
  
  // Basılma Animasyonu Mantığı
  const getButtonStyle = (pressed: boolean) => [
    styles.container,
    type === 'PRIMARY' ? styles.containerPrimary : styles.containerSecondary,
    {
      transform: [{ scale: pressed ? 0.98 : 1 }],
      elevation: pressed ? 2 : 8,
      shadowOpacity: pressed ? 0.1 : 0.3,
    } as ViewStyle
  ];

  return (
    <Pressable 
      style={({ pressed }) => getButtonStyle(pressed)} 
      onPress={onPress}
    >
      {icon && icon} 
      <Text style={[
        styles.text, 
        type === 'PRIMARY' ? styles.textPrimary : styles.textSecondary,
        icon ? { marginLeft: 10 } : {} // İkon varsa yazı kaysın
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row', // İkon ve yazı yan yana olsun diye
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  containerPrimary: {
    backgroundColor: "#EC740A", // Turuncu
  },
  containerSecondary: {
    backgroundColor: "white",   // Beyaz
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrimary: {
    color: "white",
  },
  textSecondary: {
    color: "#000",
    fontSize: 16,
  },
});