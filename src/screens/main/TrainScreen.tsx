import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoCard from '../../components/VideoCard';
// YENİ EFSANE COMPONENTİMİZ GELDİ!
import TrainSidebar from '../../components/TrainSidebar';

const CATEGORIES = [
  'Tüm Vücut', 'Alt Vücut', 'Üst Vücut', 'Kardiyo & HIIT', 'Yoga & Esneme',
  'Pilates', 'Zihin & Nefes', 'Kadınlara Özel', 'Çocuklara Özel',
  'Kısa Antrenmanlar', 'Favorilerim'
];

export default function TrainScreen() {
  const [activeCategory, setActiveCategory] = useState('Tüm Vücut');
  
  // İŞTE SİHİRLİ STATE: Menünün açık olup olmadığını takip eder
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. ÖZEL HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          {/* HAMBURGER BUTONA TIKLANINCA SİDEBAR AÇILIR! */}
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Icon name="menu" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ANTRENMANLAR</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity><Icon name="heart-outline" size={26} color="#fff" style={styles.iconSpaced} /></TouchableOpacity>
          <TouchableOpacity><Icon name="message-text-outline" size={26} color="#fff" /></TouchableOpacity>
        </View>
      </View>

      {/* 2. ARAMA ÇUBUĞU */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Antrenman ara..." placeholderTextColor="#888" />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="tune-variant" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 3. YATAY KATEGORİLER */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.categoryChip, isActive && styles.activeCategoryChip]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. VİDEO LİSTESİ */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        <VideoCard 
          title="Dans Kardiyo" duration="10:45" difficulty="Zor" isPopular={true} isFullWidth={true} 
          thumbnailUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
        />
        <VideoCard 
          title="Kardiyo Zamanı" duration="10:45" difficulty="Orta" isNew={true} isFullWidth={true} 
          thumbnailUrl="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
        />
        <VideoCard 
          title="Yoga ile Huzura Açılan Kapı" duration="15:35" difficulty="Kolay" isFullWidth={true} 
          thumbnailUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
        />
      </ScrollView>

      {/* SİDEBAR COMPONENTİNİ ÇAĞIRIYORUZ (Normalde gizlidir, state true olunca fırlar) */}
      <TrainSidebar 
        isVisible={isSidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1E1E1E' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15, letterSpacing: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconSpaced: { marginRight: 15 },
  searchWrapper: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', borderRadius: 25, paddingHorizontal: 15, height: 45, borderWidth: 1, borderColor: '#3b3b3b' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 14 },
  filterButton: { marginLeft: 15 },
  categoriesWrapper: { marginBottom: 20 },
  categoriesScroll: { paddingHorizontal: 20 },
  categoryChip: { backgroundColor: '#2A2A2A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#3b3b3b' },
  activeCategoryChip: { backgroundColor: '#EC740A', borderColor: '#EC740A' },
  categoryText: { color: '#ccc', fontSize: 13, fontWeight: '600' },
  activeCategoryText: { color: '#fff', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
});