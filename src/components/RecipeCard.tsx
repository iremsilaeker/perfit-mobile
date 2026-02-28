import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RecipeCardProps {
  title: string;
  calories: string | number; // String de gelebilir number da, esnek yaptık
  time: string | number;
  servings: string | number;
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
      
      {/* SOL TARAF: Bilgiler */}
      <View style={styles.leftContainer}>
        <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
        
        {/* FİGMA'DAKİ O HARİKA İKİLİ GRİ KUTU SİSTEMİ 🔥 */}
        <View style={styles.infoBoxesRow}>
          
          {/* 1. Kutu: Temel Meta Bilgiler */}
          <View style={styles.greyBox}>
            <Text style={styles.boxText}>🔥 {calories} kcal</Text>
            <Text style={styles.boxText}>⏱ {time} dk</Text>
            <Text style={styles.boxText}>🍽 {servings} kş</Text>
          </View>
          
          {/* 2. Kutu: Makro Değerleri */}
          <View style={styles.greyBox}>
            <Text style={styles.boxText}>🥚 Pro: {protein}</Text>
            <Text style={styles.boxText}>🥑 Yağ: {fat}</Text>
            <Text style={styles.boxText}>🍞 Karb: {carbs}</Text>
          </View>

        </View>

        {/* Tarife Git Butonu */}
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>TARİFE GİT</Text>
        </TouchableOpacity>
      </View>

      {/* SAĞ TARAF: Yemek Görseli */}
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
          {/* Favori (Bookmark) İkonu */}
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
    marginBottom: 20, // Kartlar arası boşluk
    height: 205, // Figma'ya daha uygun
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  leftContainer: {
    flex: 1.3, // Sol tarafı (yazıları) resme göre biraz daha geniş tuttuk
    paddingVertical: 15,
    paddingHorizontal: 12,
    justifyContent: 'space-between', 
  },
  title: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 5,
  },
  
  // İKİLİ KUTU SİSTEMİNİN STİLLERİ
  infoBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8, // İki kutu arası boşluk
  },
  greyBox: {
    flex: 1,
    backgroundColor: '#3b3b3b', // O şık gri tonu
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 12,
    justifyContent: 'center',
  },
  boxText: {
    color: '#ccc',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 2,
  },

  button: {
    backgroundColor: '#EC740A', 
    paddingVertical: 10,
    borderRadius: 20, 
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
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
    backgroundColor: 'rgba(0,0,0,0.4)', 
    padding: 6,
    borderRadius: 8,
  }
});