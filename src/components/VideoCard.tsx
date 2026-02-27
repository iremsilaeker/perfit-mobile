import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnailUrl: string;
  isPopular?: boolean;
  isNew?: boolean;       // Figma'daki "+ Yeni" etiketi için eklendi
  difficulty?: string;   // Figma'daki "Zor, Orta, Kolay" yazısı için eklendi
  isFullWidth?: boolean; // Kartın Ana Sayfa'da mı Antrenman'da mı olduğunu belirleyecek!
  onPress?: () => void;
}

export default function VideoCard({ 
  title, duration, thumbnailUrl, isPopular, isNew, difficulty, isFullWidth, onPress 
}: VideoCardProps) {
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      // Eğer isFullWidth true ise geniş kart stilini, değilse eski dar stili uygula
      style={[styles.cardWrapper, isFullWidth && styles.fullWidthCard]}
    >
      <ImageBackground 
        source={{ uri: thumbnailUrl }} 
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 16, resizeMode: 'cover' }}
      >
        <View style={styles.cardTop}>
          {/* Popüler veya Yeni etiketleri */}
          <View style={{ flexDirection: 'row' }}>
            {isPopular && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🔥 Popüler</Text>
              </View>
            )}
            {isNew && (
              <View style={[styles.badge, { backgroundColor: 'rgba(236, 116, 10, 0.8)' }]}>
                <Text style={styles.badgeText}>+ Yeni</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity>
            <Icon name="cards-heart-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Ana sayfadaki gibi ortada play butonu dursun istemezsen burayı isFullWidth'e göre gizleyebiliriz ama şimdilik şık duruyor */}
        {!isFullWidth && (
          <View style={styles.playIconContainer}>
            <Icon name="play-circle-outline" size={48} color="rgba(255, 255, 255, 0.8)" />
          </View>
        )}

        <View style={styles.cardBottom}>
          <Text style={styles.cardMainText} numberOfLines={2}>{title}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.cardTimeText}>{duration}</Text>
            {/* Eğer zorluk seviyesi gönderilmişse sürenin altına yaz */}
            {difficulty && <Text style={styles.difficultyText}>{difficulty}</Text>}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.75, // Ana Sayfa için varsayılan genişlik
    height: 180,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  // ANTRENMAN SAYFASI İÇİN TAM GENİŞLİK STİLİ
  fullWidthCard: {
    width: '100%',
    marginRight: 0,
    marginBottom: 20, // Alt alta dizilecekleri için alt boşluk eklendi
    height: 200,      // Biraz daha uzun yaptık
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  badge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playIconContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardMainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  cardTimeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  difficultyText: {
    color: '#ccc',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});