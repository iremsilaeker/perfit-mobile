import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigationTypes";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import GoogleIcon from '../../assets/images/google-icon.svg'; 

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // --- GELİŞMİŞ E-POSTA KONTROLÜ (REGEX) ---
  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleLogin = () => {
    // 1. Boş Alan Kontrolü
    if (!email || !password) {
      Alert.alert("Eksik Bilgi", "Lütfen e-posta ve şifrenizi girin.");
      return;
    }

    // 2. E-posta Format Kontrolü
    if (!validateEmail(email)) {
      Alert.alert("Hatalı Format", "Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    console.log("Giriş yapılıyor:", email);
    navigation.navigate("MainApp");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Klavye açıkken butona direkt basabilmeyi sağlar
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Giriş Yap</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subHeader}>Hesabınıza erişin</Text>

          <CustomInput 
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput 
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.optionsRow}>
            <Pressable 
              style={styles.rememberMeContainer} 
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
              <Text style={styles.optionText}>Beni hatırla</Text>
            </Pressable>

            <Pressable onPress={() => console.log("Şifremi unuttum")}>
              <Text style={styles.forgotPasswordText}>Şifremi unuttum?</Text>
            </Pressable>
          </View>

          <CustomButton title="Giriş Yap" onPress={handleLogin} type="PRIMARY" />
          
          <CustomButton 
            title="Google ile devam et"
            onPress={() => console.log("Google ile giriş")}
            type="SECONDARY" 
            icon={<GoogleIcon width={24} height={24} />}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Hesabın yok mu? </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signupText}> Kayıt ol</Text>
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
  headerContainer: { alignItems: "center", justifyContent: "center", marginBottom: 40 },
  headerText: { color: "#ffffff", fontSize: 32, fontWeight: "bold", fontFamily: "sans-serif", letterSpacing: 1 },
  formContainer: { paddingHorizontal: 25 },
  subHeader: { color: "white", fontSize: 18, textAlign: "center", marginBottom: 25, opacity: 0.6 },
  optionsRow: { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 },
  rememberMeContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: "white", marginRight: 8, borderRadius: 4 },
  checkboxChecked: { backgroundColor: "#EC740A", borderColor: "#EC740A" },
  optionText: { color: "white", fontSize: 14 },
  forgotPasswordText: { color: "#EC740A", fontSize: 14, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 20 },
  footerText: { color: "#aaa", fontSize: 16 },
  signupText: { color: "#EC740A", fontWeight: "bold", fontSize: 16 },
});