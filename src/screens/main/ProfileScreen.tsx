import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Kendi yaptığımız lego parçalarını çağırıyoruz!
import ProfileStatBox from '../../components/ProfileStatBox';
import ActionMenuRow from '../../components/ActionMenuRow';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. ÜST BİLGİ KARTI (Siluet İkonu ve Bilgiler) */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          {/* FOTOĞRAF YERİNE SİLUET İKONU GELDİ 🔥 */}
          <Icon name="account-circle" size={65} color="#888" style={styles.profileIcon} />
          
          <View style={styles.nameContainer}>
            <View style={styles.nameBadgeRow}>
              <Text style={styles.userName}>İREM SILA EKER</Text>
              <Icon name="check-decagram" size={18} color="#FFD700" style={styles.badgeIcon} />
            </View>
            <Text style={styles.userId}>ID: 123456</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="cog-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* SAYFA KAYDIRILABİLİR İÇERİĞİ */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. ROZETLER BÖLÜMÜ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ROZETLER</Text>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badgeContainer}>
          <Icon name="medal-outline" size={40} color="#666" />
          <Text style={styles.badgeText}>Henüz rozetin yok! İlkini kazanmak için antrenmana başla.</Text>
        </View>

        {/* 3. İSTATİSTİK BÖLÜMÜ */}
        <Text style={styles.sectionTitle}>İSTATİSTİK</Text>
        <View style={styles.statsRow}>
          <ProfileStatBox title="Süre" value="150 dk" />
          <ProfileStatBox title="Aktiflik" value="27 gün" />
          <ProfileStatBox title="Kalori" value="1250 kcal" />
        </View>

        {/* 4. İŞLEMLER MÜNÜSÜ */}
        <Text style={styles.sectionTitle}>İŞLEMLER</Text>
        <View style={styles.menuContainer}>
          <ActionMenuRow iconName="account-outline" title="Üyelik Bilgilerim" />
          <ActionMenuRow iconName="chart-line-variant" title="Raporlarım" />
          <ActionMenuRow iconName="scale-bathroom" title="Ölçümlerim" />
          <ActionMenuRow iconName="fire" title="Kalori Hesaplama" />
          <ActionMenuRow iconName="door-open" title="Antrenman Tercihlerim" />
        </View>

        {/* 5. PAYLAŞ BUTONU */}
        <TouchableOpacity style={styles.shareButton} activeOpacity={0.8}>
          <Icon name="share-variant" size={24} color="#fff" style={styles.shareIcon} />
          <Text style={styles.shareButtonText}>Uygulamayı Paylaş</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* 6. İŞTE O EFSANE SABİT KALEM BUTONU (FAB) 🔥 */}
      {/* Rengi Figma'daki açık turuncu oldu! */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => console.log("Profili Düzenle Sayfasına Gidilecek!")}
      >
        {/* İkon rengi koyu yapıldı ki açık zeminde parlasın */}
        <Icon name="pencil" size={26} color="#3b3b3b" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1E1E1E' },
  
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  // Image stili yerine Icon stili geldi
  profileIcon: { marginRight: 15 },
  nameContainer: { justifyContent: 'center' },
  nameBadgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },
  badgeIcon: { marginLeft: 5 },
  userId: { color: '#888', fontSize: 11, fontWeight: 'bold' },
  
  divider: { height: 1, backgroundColor: '#3b3b3b', marginHorizontal: 20, marginBottom: 15 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: 1, marginTop: 15, marginBottom: 10 },
  smallButton: { backgroundColor: '#3b3b3b', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  smallButtonText: { color: '#ccc', fontSize: 10, fontWeight: 'bold' },
  
  badgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 10, marginBottom: 10 },
  badgeText: { color: '#888', fontSize: 12, flex: 1, marginLeft: 15, lineHeight: 18 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },

  menuContainer: { backgroundColor: '#2A2A2A', borderRadius: 16, overflow: 'hidden', marginBottom: 30, borderWidth: 1, borderColor: '#3b3b3b' },

  shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2A2A2A', paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: '#EC740A' },
  shareIcon: { marginRight: 10 },
  shareButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },

  // 🔥 KALEM BUTONU (FLOATING ACTION BUTTON) STİLLERİ GÜNCELLENDİ 🔥
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#fd8a17', // FİGMA'DAKİ AÇIK TURUNCU RENK! 🎨
    width: 60,
    height: 60,
    borderRadius: 18, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Kenarlık kaldırıldı, Figma'da daha temiz duruyor
  }
});