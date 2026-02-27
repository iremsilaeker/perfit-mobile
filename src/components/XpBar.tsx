import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface XpBarProps {
  level: number;
  currentXp: number;
  maxXp: number;
}

export default function XpBar({ level, currentXp, maxXp }: XpBarProps) {
  // Barın doluluk yüzdesini otomatik hesaplıyoruz (örneğin 70/100 = %70)
  // Math.min ve Math.max kullanarak yüzdenin 0'ın altına veya 100'ün üstüne çıkmasını engelliyoruz
  const progressPercentage = Math.min(100, Math.max(0, (currentXp / maxXp) * 100));

  return (
    <View style={styles.xpContainer}>
      <Text style={styles.xpText}>SEVİYE {level}  {currentXp} / {maxXp} XP</Text>
      <View style={styles.progressBarBackground}>
        {/* Genişlik artık dinamik olarak hesaplanan yüzdeye göre ayarlanıyor */}
        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  xpContainer: { paddingHorizontal: 20, marginBottom: 35 },
  xpText: { color: '#fff', fontSize: 13, fontWeight: 'bold', marginBottom: 10, letterSpacing: 0.5 },
  progressBarBackground: { height: 10, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#EC740A', borderRadius: 10 },
});