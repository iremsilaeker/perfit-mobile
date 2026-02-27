import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RecipeCardProps {
  title: string;
  calories: number;
  time: number;
  servings: number;
  protein: string;
  fat: string;
  carbs: string;
  imageUrl: string;
  onPress?: () => void;
  onBookmarkPress?: () => void;
}

export default function RecipeCard({
  title, calories, time, servings, protein, fat, carbs, imageUrl, onPress, onBookmarkPress
}: RecipeCardProps) {
  return (
    <View style={styles.cardWrapper}>
      {/* Sol Taraf: Bilgiler */}
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        
        {/* BÜYÜTÜLMÜŞ Meta Bilgiler */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🔥 {calories} kcal</Text>
          <Text style={styles.metaText}>⏱️ {time} dk</Text>
          <Text style={styles.metaText}>🍽️ {servings} kş</Text>
        </View>

        {/* RENKLERİ SADELEŞTİRİLMİŞ MAKROLAR */}
        <View style={styles.macrosContainer}>
          <Text style={styles.macroLabel}>Protein: <Text style={styles.macroValue}>{protein}</Text></Text>
          <Text style={styles.macroLabel}>Yağ: <Text style={styles.macroValue}>{fat}</Text></Text>
          <Text style={styles.macroLabel}>Karb: <Text style={styles.macroValue}>{carbs}</Text></Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>TARİFE GİT</Text>
        </TouchableOpacity>
      </View>

      {/* Sağ Taraf: Yemek Görseli */}
      <View style={styles.rightContainer}>
        <ImageBackground 
          source={{ uri: imageUrl }} 
          style={styles.image}
          imageStyle={{ 
            resizeMode: 'cover',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmarkPress}>
            <Icon name="bookmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row', 
    backgroundColor: '#2A2A2A', 
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    height: 220, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  leftContainer: {
    flex: 1.2, 
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  title: {
    color: '#fff',
    fontSize: 17, 
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 5,
    textAlign: 'center',
  },
  
  // ÜST BİLGİLER (Kalori vs. Büyütüldü)
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    gap: 8, // Yazılar büyüdüğü için aralarını biraz daha açtık
  },
  metaText: {
    color: '#ddd',
    fontSize: 12, // 10'dan 12'ye çıkarıldı
    fontWeight: '600',
  },
  
  // ALT BİLGİLER (Renkler nötrleştirildi)
  macrosContainer: {
    alignItems: 'center',
    gap: 4, 
  },
  macroLabel: {
    color: '#bbb',
    fontSize: 13, 
    fontWeight: '600',
  },
  macroValue: {
    color: '#fff', // Turuncu iptal edildi, net okunması için saf beyaz yapıldı!
    fontSize: 14,
    fontWeight: '900',
  },

  button: {
    backgroundColor: '#EC740A', 
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20, 
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  rightContainer: {
    flex: 1, 
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
  },
  bookmarkButton: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 6,
    borderRadius: 8,
  }
});