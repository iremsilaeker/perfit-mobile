import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function OptionCard({ title, isSelected, onPress }: Props) {
  return (
    <Pressable
      style={[
        styles.card,
        isSelected ? styles.cardSelected : styles.cardUnselected
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        isSelected ? styles.textSelected : styles.textUnselected
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flex: 1, // Yan yana dizildiğinde eşit alan kaplasın diye
    marginHorizontal: 5,
  },
  cardUnselected: {
    backgroundColor: '#3b3b3b',
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: 'rgba(236, 116, 10, 0.15)', // Turuncunun şeffaf hali
    borderColor: '#EC740A', // Turuncu
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textUnselected: {
    color: '#aaa',
  },
  textSelected: {
    color: '#EC740A',
  },
});