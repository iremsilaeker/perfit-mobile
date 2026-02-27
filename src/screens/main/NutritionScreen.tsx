import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NutritionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BESLENME</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center' },
  header: { color: '#EC740A', fontSize: 24, fontWeight: 'bold' }
});