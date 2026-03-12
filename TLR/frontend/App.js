import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./OnboardingScreen";
import OnboardingEmail from "./OnboardingEmail";
import OnboardingClasses from "./OnboardingClasses";
import OnboardingHobbies from "./OnboardingHobbies";
import OnboardingTrustedContact from "./OnboardingTrustedContact";
import OnboardingTutorial from "./OnboardingTutorial";
import MainApp from "./MainApp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0F1E' },
        }}
      >
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingEmail" component={OnboardingEmail} />
        <Stack.Screen name="OnboardingClasses" component={OnboardingClasses} />
        <Stack.Screen name="OnboardingHobbies" component={OnboardingHobbies} />
        <Stack.Screen name="OnboardingTrustedContact" component={OnboardingTrustedContact} />
        <Stack.Screen name="OnboardingTutorial" component={OnboardingTutorial} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
