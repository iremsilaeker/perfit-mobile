import React from 'react';
import { TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';

interface Props extends TextInputProps {}

export default function CustomInput(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#666"
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: "#000",
    
    // --- İŞTE ÇÖZÜM BURADA ---
    // Android ve iOS'in kendi standart fontunu kullanmasını söylüyoruz.
    // Böylece Türkçe karakterlerin hepsi %100 çalışır.
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'System',
    fontWeight: 'normal',
  },
});