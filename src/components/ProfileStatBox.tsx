import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatBoxProps {
  title: string;
  value: string;
}

export default function ProfileStatBox({ title, value }: ProfileStatBoxProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4, // Kutular arası hafif boşluk
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
  }
});