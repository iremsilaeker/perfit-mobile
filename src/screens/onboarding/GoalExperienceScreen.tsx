import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';

import CustomButton from '../../components/CustomButton';
import OptionCard from '../../components/OptionCard';

type Props = NativeStackScreenProps<AuthStackParamList, 'GoalExperience'>;

export default function GoalExperienceScreen({ navigation }: Props) {
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  const handleNext = () => {
    if (!goal || !experience) {
      Alert.alert("Eksik Seçim", "Lütfen devam etmeden önce seçenekleri işaretleyin.");
      return;
    }
    console.log("Adım 2 Verileri:", { goal, experience });
    
    navigation.navigate("TrainingPreferences");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.stepText}>Adım 2 / 4</Text>
          <Text style={styles.headerText}>Hedef & Tecrübe</Text>
          <Text style={styles.subHeader}>Sana en uygun antrenman ve beslenme planını oluşturmamız için amacını bilmeliyiz.</Text>
        </View>

        {/* HEDEF SEÇİMİ */}
        <View style={styles.section}>
          <Text style={styles.label}>Ana hedefin nedir?</Text>
          {/* OptionCard'ları alt alta tam genişlikte dizmek için row kullanıyoruz */}
          <View style={styles.row}>
            <OptionCard title="Kilo Vermek / Yağ Yakmak" isSelected={goal === 'Kilo Vermek'} onPress={() => setGoal('Kilo Vermek')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Kas Geliştirmek / Kilo Almak" isSelected={goal === 'Kas Geliştirmek'} onPress={() => setGoal('Kas Geliştirmek')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Formu Korumak / Sıkılaşmak" isSelected={goal === 'Form Korumak'} onPress={() => setGoal('Form Korumak')} />
          </View>
        </View>

        {/* TECRÜBE SEÇİMİ */}
        <View style={styles.section}>
          <Text style={styles.label}>Fitness tecrüben ne seviyede?</Text>
          <View style={styles.row}>
            <OptionCard title="Yeni Başlayan (Hiç tecrübem yok)" isSelected={experience === 'Yeni Başlayan'} onPress={() => setExperience('Yeni Başlayan')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="Orta Seviye (1 yıldan az tecrübem var)" isSelected={experience === 'Orta Seviye'} onPress={() => setExperience('Orta Seviye')} />
          </View>
          <View style={styles.row}>
            <OptionCard title="İleri Seviye (1 yıldan fazla tecrübem var)" isSelected={experience === 'İleri Seviye'} onPress={() => setExperience('İleri Seviye')} />
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
  section: { marginBottom: 25 },
  label: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  row: { flexDirection: 'row', width: '100%' },
  footer: { marginTop: 'auto', paddingTop: 20 },
});