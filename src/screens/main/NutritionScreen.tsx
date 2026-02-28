import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RecipeCard from '../../components/RecipeCard';

// İstediğin gibi "Çocuklara Özel" kategorisini ekledik! 🔥
const NUTRITION_CATEGORIES = [
  'Tümü', 'Kahvaltı', 'Öğle Yemeği', 'Akşam Yemeği', 'Atıştırmalık', 
  'Tatlı', 'İçecek', 'Özel Diyetler', 'Kas Yapımı', 'Kilo Verimi', 
  'Çocuklara Özel', 'Favorilerim'
];

export default function NutritionScreen() {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. HEADER (TARİFLER BAŞLIĞI) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>TARİFLER</Text>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 2. ARAMA ÇUBUĞU */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Tarif ara..."
            placeholderTextColor="#888"
          />
        </View>
      </View>

      {/* 3. YATAY KATEGORİLER */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {NUTRITION_CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.categoryChip, isActive && styles.activeCategoryChip]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. TARİF LİSTESİ */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        
        <RecipeCard 
          title="Kakao Bowl"
          calories="300" time="20" servings="1" // "kişilik" ve "dk" yazılarını sildik çünkü kartın içinde var!
          protein="12g" fat="9g" carbs="40g"
          // Kakao Bowl resmini garanti olsun diye daha sağlam bir linkle değiştirdim
          imageUrl="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop"
          onPress={() => console.log("Kakao Bowl Detayına Gidilecek!")}
        />

        <RecipeCard 
          title="Ton Balıklı Salata"
          calories="450" time="15" servings="1"
          protein="35g" fat="12g" carbs="10g"
          imageUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
          onPress={() => console.log("Salata Detayına Gidilecek!")}
        />

        <RecipeCard 
          title="Orman Meyveli Smoothie"
          calories="200" time="6" servings="1"
          protein="9g" fat="7g" carbs="20g"
          imageUrl="https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800&auto=format&fit=crop"
          onPress={() => console.log("Smoothie Detayına Gidilecek!")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1E1E1E' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
  searchWrapper: { paddingHorizontal: 20, marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', borderRadius: 25, paddingHorizontal: 15, height: 45, borderWidth: 1, borderColor: '#3b3b3b' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 14 },
  categoriesWrapper: { marginBottom: 20 },
  categoriesScroll: { paddingHorizontal: 20 },
  categoryChip: { backgroundColor: '#3b3b3b', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  activeCategoryChip: { backgroundColor: '#EC740A' },
  categoryText: { color: '#ccc', fontSize: 13, fontWeight: '600' },
  activeCategoryText: { color: '#fff', fontWeight: 'bold' },
  
  // İŞTE SİHİRLİ DOKUNUŞ: paddingHorizontal: 20 kısmını buradan sildik! Artık kartlar özgür! 👇
  listContent: { paddingBottom: 30 },
});