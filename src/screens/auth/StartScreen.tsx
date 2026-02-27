import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigationTypes";

// Kendi modern butonumuzu import ediyoruz
import CustomButton from "../../components/CustomButton";

type Props = NativeStackScreenProps<AuthStackParamList, "Start">;

const { width } = Dimensions.get("window");

export default function StartScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* ÜST KISIM: LOGO VE YAZI GRUBU */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/perfit-logo-removebg.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* PERFIT YAZISI */}
        <View style={styles.titleBox}>
          <Text style={styles.titlePer}>PER</Text>
          {/* T harfinin kesilmemesi için yanına boşluk eklendi */}
          <Text style={styles.titleFit}>FIT  </Text>
        </View>

        {/* SLOGAN (Daha modern, aralıklı ve zarif, çizgi kaldırıldı) */}
        <Text style={styles.slogan}>BE PERFIT BE PERFECT</Text>
      </View>

      {/* ORTA GÖRSEL */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/anaekranfoto.png")}
          style={styles.centerImage}
          resizeMode="contain"
        />
      </View>

      {/* MODERN BAŞLA BUTONU */}
      <View style={styles.footer}>
        <CustomButton 
          title="HADİ BAŞLAYALIM" 
          onPress={() => navigation.navigate("Login")} 
          type="PRIMARY" 
        />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    paddingHorizontal: 25, // Yanlardan diğer sayfalar gibi boşluk verdik
  },
  topSection: {
    alignItems: "center", 
    marginTop: 40, // Ekranın en üstünden biraz boşluk
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: -10, // Logoyu yazıya yaklaştırmak için
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginLeft: 15, // Logoya göre hafif ortalamak için
  },
  titlePer: {
    color: "white",
    fontSize: 42,
    fontFamily: "Montserrat-BoldItalic",
    textShadowColor: "rgba(0, 0, 0, 0.25)", 
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
  },
  titleFit: {
    color: "#EC740A",
    fontSize: 54, // Senin orijinal font büyüklüğün
    fontFamily: "PermanentMarker-Regular",
    marginLeft: 4,
    paddingRight: 10, // T'nin kesilmesini önlemek için garanti çözüm
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
  },
  slogan: {
    color: "#aaa", // Daha yumuşak bir gri
    fontSize: 14, 
    fontFamily: "PermanentMarker-Regular", // Orijinal fontunu koruduk
    letterSpacing: 3, // Harf arası boşluk ile premium hava
    marginTop: 15,
  },
  imageContainer: {
    flex: 1, // Kalan tüm boşluğu doldurur, görseli ortalar
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    width: width * 0.85, 
    height: width * 0.9,
  },
  footer: {
    paddingBottom: 30, // Butonun en alta yapışmaması için boşluk
  },
});