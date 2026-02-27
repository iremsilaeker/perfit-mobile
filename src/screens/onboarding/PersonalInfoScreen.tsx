import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import OptionCard from '../../components/OptionCard';

type Props = NativeStackScreenProps<AuthStackParamList, 'PersonalInfo'>;

export default function PersonalInfoScreen({ navigation }: Props) {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleNext = () => {
    if (!gender || !age || !height || !weight) {
        Alert.alert('Eksik Bilgi', 'Lütfen devam etmeden önce tüm bilgileri doldurun.');
        return;
    }
    
    navigation.navigate("GoalExperience");
        
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.stepText}>Adım 1 / 4</Text>
          <Text style={styles.headerText}>Seni Tanıyalım</Text>
          <Text style={styles.subHeader}>Sana en uygun programı hazırlayabilmemiz için fiziksel özelliklerini bilmemiz gerekiyor.</Text>
        </View>

        {/* CİNSİYET SEÇİMİ (YENİ COMPONENT İLE) */}
        <View style={styles.section}>
          <Text style={styles.label}>Cinsiyet</Text>
          <View style={styles.row}>
            <OptionCard 
              title="Erkek" 
              isSelected={gender === 'Erkek'} 
              onPress={() => setGender('Erkek')} 
            />
            <OptionCard 
              title="Kadın" 
              isSelected={gender === 'Kadın'} 
              onPress={() => setGender('Kadın')} 
            />
          </View>
        </View>

        {/* DİĞER BİLGİLER (MEVCUT INPUT İLE) */}
        <View style={styles.section}>
          <Text style={styles.label}>Yaş</Text>
          <CustomInput 
            placeholder="Örn: 24" 
            keyboardType="numeric" 
            value={age} 
            onChangeText={setAge} 
            maxLength={2}
          />

          <Text style={styles.label}>Boy (cm)</Text>
          <CustomInput 
            placeholder="Örn: 175" 
            keyboardType="numeric" 
            value={height} 
            onChangeText={setHeight} 
            maxLength={3}
          />

          <Text style={styles.label}>Kilo (kg)</Text>
          <CustomInput 
            placeholder="Örn: 70" 
            keyboardType="numeric" 
            value={weight} 
            onChangeText={setWeight} 
            maxLength={3}
          />
        </View>

        <View style={styles.footer}>
          <CustomButton title="Devam Et" onPress={handleNext} type="PRIMARY" />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
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
  label: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginLeft: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: -5 },
  footer: { marginTop: 'auto', paddingTop: 20 },
});