import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// İŞTE YENİ HABERLEŞME KANALLARIMIZ EKLENDİ! 👇
interface TrainSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  activeCategory: string;                  // Ana ekrandan gelen mevcut seçili kategori
  onSelectCategory: (cat: string) => void; // Tıkladığımızda ana ekranı güncelleyecek fonksiyon
}

const MENU_ITEMS = [
  { id: 'Tüm Vücut', icon: 'weight-lifter' },
  { id: 'Alt Vücut (Bacak & Kalça)', icon: 'run' },
  { id: 'Üst Vücut (Kol & Göğüs & Sırt)', icon: 'arm-flex' },
  { id: 'Kardiyo & HIIT', icon: 'heart-pulse' },
  { id: 'Yoga & Esneme', icon: 'yoga' },
  { id: 'Pilates', icon: 'human-child' },
  { id: 'Zihin & Nefes', icon: 'brain' },
  { id: 'Kadınlara Özel', icon: 'gender-female' },
  { id: 'Çocuklara Özel', icon: 'emoticon-happy-outline' },
  { id: 'Kısa Antrenmanlar', icon: 'clock-outline' },
  { id: 'Favorilerim', icon: 'heart-outline' },
];

const DIFFICULTY_OPTIONS = ['Başlangıç', 'Orta', 'İleri'];
const EQUIPMENT_OPTIONS = ['Ekipmansız', 'Dambıl', 'Direnç Bandı'];

export default function TrainSidebar({ isVisible, onClose, activeCategory, onSelectCategory }: TrainSidebarProps) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

  const [selectedDifficulties, setSelectedDifficulties] = useState<Record<string, string | null>>({});
  const [selectedEquipments, setSelectedEquipments] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (isVisible) {
      // Menü her açıldığında, ana ekranda ne seçiliyse onu otomatik olarak akordeonda aç!
      setExpandedCategory(activeCategory); 
      
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      ]).start();
    }
  }, [isVisible, activeCategory]); // activeCategory değiştiğinde de tetiklensin

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -width, duration: 250, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true })
    ]).start(() => {
      onClose();
    });
  };

  const toggleCategory = (id: string) => {
    // 1. ANA EKRANI GÜNCELLE (Arkadaki turuncu buton değişsin)
    onSelectCategory(id);

    // 2. SOL MENÜNÜN KENDİ İÇ MANTIĞI
    if (expandedCategory === id) {
      setExpandedCategory(null);
      setExpandedFilters([]); 
    } else {
      setExpandedCategory(id);
      setExpandedFilters([]);
      setSelectedDifficulties({});
      setSelectedEquipments({});
    }
  };

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName) 
        : [...prev, filterName]              
    );
  };

  const handleDifficultySelect = (categoryId: string, diff: string) => {
    setSelectedDifficulties(prev => ({ ...prev, [categoryId]: prev[categoryId] === diff ? null : diff }));
  };

  const handleEquipmentSelect = (categoryId: string, eq: string) => {
    setSelectedEquipments(prev => ({ ...prev, [categoryId]: prev[categoryId] === eq ? null : eq }));
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="none">
      <View style={styles.modalWrapper}>
        <Animated.View style={[styles.overlayBg, { opacity: fadeAnim }]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleClose} activeOpacity={1} />
        </Animated.View>

        <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.sidebarHeader}><Text style={styles.headerTitle}>ANTRENMANLAR</Text></View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {MENU_ITEMS.map((item) => {
                // Artık sadece menü açıksa değil, ana ekranda da bu seçiliyse turuncu yap!
                const isExpanded = expandedCategory === item.id;
                const isActuallySelected = activeCategory === item.id; 

                return (
                  <View key={item.id} style={styles.menuItemWrapper}>
                    <TouchableOpacity 
                      // Eğer seçiliyse turuncu yap!
                      style={[styles.menuButton, isActuallySelected && styles.menuButtonActive]}
                      onPress={() => toggleCategory(item.id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.menuLeft}>
                        <Icon name={item.icon} size={22} color={isActuallySelected ? "#fff" : "#ccc"} />
                        <Text style={[styles.menuText, isActuallySelected && styles.menuTextActive]}>{item.id}</Text>
                      </View>
                      <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={22} color={isActuallySelected ? "#fff" : "#888"} />
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.subFiltersContainer}>
                        {/* 1. Zorluk Seviyesi */}
                        <TouchableOpacity style={styles.subFilterHeader} onPress={() => toggleFilter('zorluk')}>
                          <Text style={styles.subFilterTitle}>Zorluk Seviyesi</Text>
                          <Icon name={expandedFilters.includes('zorluk') ? "chevron-up" : "chevron-down"} size={20} color="#bbb" />
                        </TouchableOpacity>
                        {expandedFilters.includes('zorluk') && (
                          <View style={styles.filterOptions}>
                            {DIFFICULTY_OPTIONS.map((diff) => {
                              const isSelected = selectedDifficulties[item.id] === diff;
                              return (
                                <TouchableOpacity key={diff} style={isSelected ? styles.activeOptionBg : styles.inactiveOptionBg} onPress={() => handleDifficultySelect(item.id, diff)}>
                                  <Text style={isSelected ? styles.optionTextActive : styles.optionText}>{diff}</Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}

                        {/* 2. Ekipman Filtresi */}
                        <TouchableOpacity style={styles.subFilterHeader} onPress={() => toggleFilter('ekipman')}>
                          <Text style={styles.subFilterTitle}>Ekipman</Text>
                          <Icon name={expandedFilters.includes('ekipman') ? "chevron-up" : "chevron-down"} size={20} color="#bbb" />
                        </TouchableOpacity>
                        {expandedFilters.includes('ekipman') && (
                          <View style={styles.filterOptions}>
                            {EQUIPMENT_OPTIONS.map((eq) => {
                              const isSelected = selectedEquipments[item.id] === eq;
                              return (
                                <TouchableOpacity key={eq} style={isSelected ? styles.activeOptionBg : styles.inactiveOptionBg} onPress={() => handleEquipmentSelect(item.id, eq)}>
                                  <Text style={isSelected ? styles.optionTextActive : styles.optionText}>{eq}</Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Stiller birebir aynı, sadece yer kaplamasın diye kalabalık kısımları aynen bıraktım.
  modalWrapper: { flex: 1, flexDirection: 'row' },
  overlayBg: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  sidebarContainer: { width: '75%', backgroundColor: '#2A2A2A', height: '100%', elevation: 10, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10 },
  sidebarHeader: { padding: 20, paddingTop: 30, borderBottomWidth: 1, borderBottomColor: '#3b3b3b' },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  scrollContent: { padding: 15, paddingBottom: 40 },
  menuItemWrapper: { marginBottom: 8 },
  menuButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b3b3b', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10 },
  menuButtonActive: { backgroundColor: '#EC740A' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { color: '#ccc', fontSize: 13, fontWeight: '600', marginLeft: 12 },
  menuTextActive: { color: '#fff', fontWeight: 'bold' },
  subFiltersContainer: { backgroundColor: '#333', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10, marginTop: -5, paddingTop: 15 },
  subFilterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 },
  subFilterTitle: { color: '#ddd', fontSize: 12, fontWeight: 'bold' },
  filterOptions: { paddingLeft: 5, paddingBottom: 10 },
  inactiveOptionBg: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
  activeOptionBg: { backgroundColor: '#444', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
  optionText: { color: '#aaa', fontSize: 12 },
  optionTextActive: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});