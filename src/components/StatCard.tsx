import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface StatCardProps {
  title: string;
  children: React.ReactNode; 
  onPress?: () => void;      
}

export default function StatCard({ title, children, onPress }: StatCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress} 
      activeOpacity={0.7} 
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A', // Bembeyaz yerine efsane tok gri!
    borderRadius: 14,          
    paddingVertical: 14,       
    paddingHorizontal: 12,     
    width: 120,                
    height: 85,                
    marginRight: 15,
    justifyContent: 'space-between', 
    borderWidth: 1,             // Çok ince, zarif bir çerçeve
    borderColor: '#3b3b3b',     // Çerçeve rengi
  },
  title: {
    color: '#bbb', // Başlıklar siyah değil, açık gri oldu
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  content: {
    alignItems: 'flex-start',
  }
});