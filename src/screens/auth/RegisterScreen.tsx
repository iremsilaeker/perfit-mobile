import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigationTypes";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import GoogleIcon from '../../assets/images/google-icon.svg'; 

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- GARANTİ TÜRKÇE İSİM DÜZELTME ---
  const formatTurkishName = () => {
    if (!fullName) return;

    const formatted = fullName
      .split(' ') 
      .map(word => {
        if (word.length === 0) return "";
        let firstChar = word.charAt(0);
        
        const map: Record<string, string> = {
          'i': 'İ', 'ı': 'I', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç'
        };

        firstChar = map[firstChar] || firstChar.toLocaleUpperCase('tr-TR');
        return firstChar + word.slice(1); 
      })
      .join(' '); 

    setFullName(formatted);
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPasswordStrong = (pass: string) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{6,}$/;
    return strongRegex.test(pass);
  };

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Hatalı E-posta", "Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (!isPasswordStrong(password)) {
      Alert.alert(
        "Şifre Yetersiz", 
        "Şifreniz en az 6 karakter olmalı ve şunları içermelidir:\n- 1 Büyük Harf\n- 1 Küçük Harf\n- 1 Rakam\n- 1 Özel Karakter (.,@!?)"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Hata", "Girdiğiniz şifreler birbiriyle uyuşmuyor.");
      return;
    }

    console.log("Kayıt Verileri:", { fullName, email, password });

    navigation.navigate("PersonalInfo");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Kayıt Ol</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subHeader}>Yeni bir hesap oluşturun</Text>

          <CustomInput 
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
            onBlur={formatTurkishName} 
            autoCapitalize="none" 
            autoCorrect={false} 
            autoComplete="name"
          />

          <CustomInput 
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput 
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomInput 
            placeholder="Şifre Tekrar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <View style={{ marginTop: 10 }}>
            <CustomButton title="Kayıt Ol" onPress={handleRegister} type="PRIMARY" />
          </View>

          <CustomButton 
            title="Google ile devam et"
            onPress={() => console.log("Google ile kayıt")}
            type="SECONDARY"
            icon={<GoogleIcon width={24} height={24} />} 
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten hesabın var mı? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLinkText}> Giriş Yap</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#242424" },
  scrollContainer: { flexGrow: 1, paddingTop: 60, paddingBottom: 20 },
  headerContainer: { alignItems: "center", justifyContent: "center", marginBottom: 30 },
  headerText: { color: "#ffffff", fontSize: 32, fontWeight: "bold", fontFamily: "sans-serif", letterSpacing: 1 },
  formContainer: { paddingHorizontal: 25 },
  subHeader: { color: "white", fontSize: 18, textAlign: "center", marginBottom: 25, opacity: 0.6 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 20 },
  footerText: { color: "#aaa", fontSize: 16 },
  loginLinkText: { color: "#EC740A", fontWeight: "bold", fontSize: 16 },
});