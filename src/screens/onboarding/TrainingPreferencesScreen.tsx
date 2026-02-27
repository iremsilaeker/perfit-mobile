import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';

import CustomButton from '../../components/CustomButton';
import OptionCard from '../../components/OptionCard';

type Props = NativeStackScreenProps<AuthStackParamList, 'TrainingPreferences'>;

export default function TrainingPreferencesScreen({ navigation }: Props) {
  // İki farklı çoklu seçim listemiz var
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [favoriteSports, setFavoriteSports] = useState<string[]>([]);
  const [daysPerWeek, setDaysPerWeek] = useState<string | null>(null);

  // Çoklu seçimleri yönetecek ortak fonksiyon
  const toggleSelection = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (state.includes(item)) {
      setState(state.filter(i => i !== item)); // Varsa çıkar
    } else {
      setState([...state, item]); // Yoksa ekle
    }
  };

  const handleNext = () => {
    if (focusAreas.length === 0 || favoriteSports.length === 0 || !daysPerWeek) {
      Alert.alert("Eksik Seçim", "Lütfen odak bölgeni, sevdiğin sporları ve antrenman sıklığını seç.");
      return;
    }
    console.log("Adım 3 Verileri:", { focusAreas, favoriteSports, daysPerWeek });
    
    navigation.navigate("NutritionPreferences");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.stepText}>Adım 3 / 4</Text>
          <Text style={styles.headerText}>Antrenman Tercihleri</Text>
          <Text style={styles.subHeader}>Figma tasarımındaki harika kategorilerine göre sana en uygun planı seçelim.</Text>
        </View>

        {/* ODAK BÖLGELERİ (Figma'daki İsimlerle) */}
        <View style={styles.section}>
          <Text style={styles.label}>Odak Bölgelerin (Çoklu Seçim)</Text>
          <View style={styles.row}>
            <OptionCard title="Tüm Vücut" isSelected={focusAreas.includes('Tüm Vücut')} onPress={() => toggleSelection('Tüm Vücut', focusAreas, setFocusAreas)} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Alt Vücut (Bacak & Kalça)" isSelected={focusAreas.includes('Alt Vücut')} onPress={() => toggleSelection('Alt Vücut', focusAreas, setFocusAreas)} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Üst Vücut (Kol & Göğüs & Sırt)" isSelected={focusAreas.includes('Üst Vücut')} onPress={() => toggleSelection('Üst Vücut', focusAreas, setFocusAreas)} />
          </View>
        </View>

        {/* SEVDİĞİM SPORLAR (Figma'daki İsimlerle) */}
        <View style={styles.section}>
          <Text style={styles.label}>Sevdiğin Sporlar (Çoklu Seçim)</Text>
          <View style={styles.row}>
            <OptionCard title="Kardiyo & HIIT" isSelected={favoriteSports.includes('Kardiyo & HIIT')} onPress={() => toggleSelection('Kardiyo & HIIT', favoriteSports, setFavoriteSports)} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Yoga & Esneme" isSelected={favoriteSports.includes('Yoga & Esneme')} onPress={() => toggleSelection('Yoga & Esneme', favoriteSports, setFavoriteSports)} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Pilates" isSelected={favoriteSports.includes('Pilates')} onPress={() => toggleSelection('Pilates', favoriteSports, setFavoriteSports)} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Zihin & Nefes" isSelected={favoriteSports.includes('Zihin & Nefes')} onPress={() => toggleSelection('Zihin & Nefes', favoriteSports, setFavoriteSports)} />
          </View>
        </View>

        {/* HAFTALIK SÜRE SEÇİMİ */}
        <View style={styles.section}>
          <Text style={styles.label}>Haftalık Ayrılan Süre</Text>
          <View style={styles.rowGrid}>
            <View style={styles.gridItem}>
              <OptionCard title="1-2 Gün" isSelected={daysPerWeek === '1-2 Gün'} onPress={() => setDaysPerWeek('1-2 Gün')} />
            </View>
            <View style={styles.gridItem}>
              <OptionCard title="3-4 Gün" isSelected={daysPerWeek === '3-4 Gün'} onPress={() => setDaysPerWeek('3-4 Gün')} />
            </View>
            <View style={styles.gridItem}>
              <OptionCard title="5+ Gün" isSelected={daysPerWeek === '5+ Gün'} onPress={() => setDaysPerWeek('5+ Gün')} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <CustomButton title="Devam Et" onPress={handleNext} type="PRIMARY" />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#242424' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 25, paddingTop: 50, paddingBottom: 30 },
  headerContainer: { marginBottom: 30 },
  stepText: { color: '#EC740A', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  headerText: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { color: '#aaa', fontSize: 14, lineHeight: 20 },
  section: { marginBottom: 30 },
  label: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  row: { flexDirection: 'row', width: '100%', marginBottom: 0 },
  rowGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  gridItem: { width: '33.3%', paddingHorizontal: 5 }, // Günler yan yana dizesin diye 3'e böldük
  footer: { marginTop: 'auto', paddingTop: 10 },
});