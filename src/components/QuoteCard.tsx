import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Dışarıdan alacağı veriler (İleride API'den gelecek)
interface QuoteCardProps {
  title?: string; // Soru işareti koyduk çünkü opsiyonel, göndermezsek varsayılanı kullanır
  quote: string;
}

export default function QuoteCard({ title = "GÜNÜN İLHAMI", quote }: QuoteCardProps) {
  return (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteTitle}>{title}</Text>
      <Text style={styles.quoteText}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    marginHorizontal: 20,
    backgroundColor: '#242424', 
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1.5,           
    borderColor: '#b3b3b3',     
    marginBottom: 30,
  },
  quoteTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',          
    letterSpacing: 1.5,         
    marginBottom: 12,
  },
  quoteText: {
    color: '#fff',              
    fontSize: 14,
    fontWeight: '600',          
    textAlign: 'center',
    lineHeight: 22,             
  }
});