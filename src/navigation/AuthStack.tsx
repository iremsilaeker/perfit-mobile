import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/auth/StartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import PersonalInfoScreen from "../screens/onboarding/PersonalInfoScreen";
import GoalExperienceScreen from "../screens/onboarding/GoalExperienceScreen";
import TrainingPreferencesScreen from "../screens/onboarding/TrainingPreferencesScreen";
import NutritionPreferencesScreen from "../screens/onboarding/NutritionPreferencesScreen";
import MainTabNavigator from "./MainTabNavigator"; 
import { AuthStackParamList } from "../types/navigationTypes"; 

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="GoalExperience" component={GoalExperienceScreen} />
      <Stack.Screen name="TrainingPreferences" component={TrainingPreferencesScreen} />
      <Stack.Screen name="NutritionPreferences" component={NutritionPreferencesScreen} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} /> 
    </Stack.Navigator>
  );
}