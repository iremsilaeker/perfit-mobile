import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';

import CustomButton from '../../components/CustomButton';
import OptionCard from '../../components/OptionCard';

type Props = NativeStackScreenProps<AuthStackParamList, 'NutritionPreferences'>;

export default function NutritionPreferencesScreen({ navigation }: Props) {
  const [dietType, setDietType] = useState<string | null>(null);
  const [meals, setMeals] = useState<string | null>(null);
  const [habits, setHabits] = useState<string[]>([]);

  // Çoklu seçim (Alışkanlıklar) için fonksiyon
  const toggleHabit = (item: string) => {
    if (habits.includes(item)) {
      setHabits(habits.filter(i => i !== item));
    } else {
      setHabits([...habits, item]);
    }
  };

  const handleFinish = () => {
    if (!dietType || !meals || habits.length === 0) {
      Alert.alert("Eksik Seçim", "Lütfen beslenme tercihlerini, öğün sayısını ve alışkanlıklarını seç.");
      return;
    }
    console.log("Adım 4 Verileri:", { dietType, meals, habits });
    
    navigation.navigate("MainApp"); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.stepText}>Adım 4 / 4</Text>
          <Text style={styles.headerText}>Beslenme</Text>
          <Text style={styles.subHeader}>Hedefine ulaşman için spor kadar beslenme de önemlidir. Alışkanlıklarını seç.</Text>
        </View>

        {/* BESLENME TİPİ (Tek Seçim) */}
        <View style={styles.section}>
          <Text style={styles.label}>Beslenme Tercihin Nedir?</Text>
          <View style={styles.rowGrid}>
            <View style={styles.gridItemHalf}>
              <OptionCard title="Standart" isSelected={dietType === 'Standart'} onPress={() => setDietType('Standart')} />
            </View>
            <View style={styles.gridItemHalf}>
              <OptionCard title="Vejetaryen" isSelected={dietType === 'Vejetaryen'} onPress={() => setDietType('Vejetaryen')} />
            </View>
            <View style={styles.gridItemHalf}>
              <OptionCard title="Vegan" isSelected={dietType === 'Vegan'} onPress={() => setDietType('Vegan')} />
            </View>
            <View style={styles.gridItemHalf}>
              <OptionCard title="Ketojenik" isSelected={dietType === 'Ketojenik'} onPress={() => setDietType('Ketojenik')} />
            </View>
          </View>
        </View>

        {/* ÖĞÜN DÜZENİ (Tek Seçim) */}
        <View style={styles.section}>
          <Text style={styles.label}>Günlük Öğün Düzenin</Text>
          <View style={styles.row}>
            <OptionCard title="2 Ana Öğün (Aralıklı Oruç)" isSelected={meals === '2 Ana Öğün'} onPress={() => setMeals('2 Ana Öğün')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="3 Ana Öğün" isSelected={meals === '3 Ana Öğün'} onPress={() => setMeals('3 Ana Öğün')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="3 Ana Öğün + Ara Öğün" isSelected={meals === '3 Ana Öğün + Ara Öğün'} onPress={() => setMeals('3 Ana Öğün + Ara Öğün')} />
          </View>
        </View>

        {/* YEME ALIŞKANLIKLARI (Çoklu Seçim) */}
        <View style={styles.section}>
          <Text style={styles.label}>Sık Tükettiğin Besinler (Çoklu Seçim)</Text>
          <View style={styles.rowGrid}>
            <View style={styles.gridItemThird}>
              <OptionCard title="Tavuk" isSelected={habits.includes('Tavuk')} onPress={() => toggleHabit('Tavuk')} />
            </View>
            <View style={styles.gridItemThird}>
              <OptionCard title="Tatlı" isSelected={habits.includes('Tatlı')} onPress={() => toggleHabit('Tatlı')} />
            </View>
            <View style={styles.gridItemThird}>
              <OptionCard title="Salata" isSelected={habits.includes('Salata')} onPress={() => toggleHabit('Salata')} />
            </View>
            <View style={styles.gridItemThird}>
              <OptionCard title="Fast Food" isSelected={habits.includes('Fast Food')} onPress={() => toggleHabit('Fast Food')} />
            </View>
            <View style={styles.gridItemThird}>
              <OptionCard title="Meyve" isSelected={habits.includes('Meyve')} onPress={() => toggleHabit('Meyve')} />
            </View>
            <View style={styles.gridItemThird}>
              <OptionCard title="Hamur İşi" isSelected={habits.includes('Hamur İşi')} onPress={() => toggleHabit('Hamur İşi')} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <CustomButton title="Kurulumu Tamamla" onPress={handleFinish} type="PRIMARY" />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#242424' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 25, paddingTop: 50, paddingBottom: 50 },
  headerContainer: { marginBottom: 30 },
  stepText: { color: '#EC740A', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  headerText: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { color: '#aaa', fontSize: 14, lineHeight: 20 },
  section: { marginBottom: 30 },
  label: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  row: { flexDirection: 'row', width: '100%', marginBottom: 5 },
  rowGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  gridItemHalf: { width: '50%', paddingHorizontal: 5 },
  gridItemThird: { width: '33.3%', paddingHorizontal: 5 },
  footer: { marginTop: 'auto', paddingTop: 10, paddingBottom: 20 },
});