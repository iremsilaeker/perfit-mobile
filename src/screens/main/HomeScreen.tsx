import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Component'ler
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';
import XpBar from '../../components/XpBar';
import VideoCard from '../../components/VideoCard';
import QuoteCard from '../../components/QuoteCard';
import RecipeCard from '../../components/RecipeCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- 1. HEADER --- */}
      <Header userName="İREM" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- 2. İSTATİSTİK KARTLARI --- */}
        <View style={styles.statsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScrollContent}>
            
            <StatCard title="GÖREVLER" onPress={() => console.log('Görevler sayfasına gidilecek')}>
              <Text style={styles.statValue}>0/3</Text>
            </StatCard>
            
            <StatCard title="HAFTALIK SERİ" onPress={() => console.log('Seri detaylarına gidilecek')}>
              <Text style={styles.statValue}>0</Text>
            </StatCard>
            
            {/* ŞİMDİLİK STATİK: İleride Su sayfasına yönlendirecek */}
            <StatCard title="SU TAKİBİ" onPress={() => console.log('Su Takibi sayfasına GİDİLECEK!')}>
              <View style={styles.waterContainer}>
                <Icon name="cup-water" size={24} color="#EC740A" />
                <Icon name="cup-outline" size={24} color="#888" />
                <Icon name="cup-outline" size={24} color="#888" />
              </View>
            </StatCard>
            
            <StatCard title="ROZETLER" onPress={() => console.log('Rozetler sayfasına gidilecek')}>
              <View style={styles.badgeContainer}>
                <Icon name="medal-outline" size={26} color="#EC740A" />
              </View>
            </StatCard>

          </ScrollView>
        </View>

        {/* --- 3. SEVİYE VE XP BARI --- */}
        <XpBar level={1} currentXp={70} maxXp={100} />

        {/* --- 4. SENİN İÇİN --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Senin İçin</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            <VideoCard 
              title="Yoga ile Huzura Açılan Kapı" duration="10:45" isPopular={true}
              thumbnailUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
              onPress={() => console.log('Videoya gidilecek')}
            />
            <VideoCard 
              title="Tüm Vücut HIIT Antrenmanı" duration="15:20" isPopular={false}
              thumbnailUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
            />
            <VideoCard 
              title="Sabah Esnemesi" duration="08:10" isPopular={false}
              thumbnailUrl="https://images.unsplash.com/photo-1552286450-37603ce58c49?q=80&w=1000&auto=format&fit=crop"
            />
          </ScrollView>
        </View>

        {/* --- 5. GÜNÜN İLHAMI --- */}
        <QuoteCard quote="Kendinin en iyi haline giden yol, bugün attığın adımdan başlar." />

        {/* --- 6. GÜNÜN TARİFİ --- */}
        <RecipeCard 
          title="KAKAO BOWL" calories={300} time={10} servings={1} protein="12g" fat="14g" carbs="50g"
          imageUrl="https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1000&auto=format&fit=crop"
          onPress={() => console.log('Tarife gidilecek')}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1E1E1E' },
  scrollContent: { paddingTop: 15, paddingBottom: 20 },
  
  statsWrapper: { marginBottom: 35 },
  statsScrollContent: { paddingHorizontal: 20, paddingBottom: 10 },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  waterContainer: { flexDirection: 'row', alignItems: 'center' },
  badgeContainer: { width: '100%', alignItems: 'center', marginTop: -2 },
  
  sectionContainer: { marginBottom: 35 },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 20, marginBottom: 15 },
});