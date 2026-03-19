import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationProvider } from './LocationContext';

import SplashScreen from './SplashScreen';
import LoginSignup from './LoginSignup';
import SignupVerify from './SignupVerify';
import CreateAccount from './CreateAccount';
import ForgotPassword from "./ForgotPassword";
import ForgotUsername from "./ForgotUsername";
import OnboardingScreen from "./OnboardingScreen";
import OnboardingClasses from "./OnboardingClasses";
import TranscriptUpload from './TranscriptUpload';
import OnboardingHobbies from "./OnboardingHobbies";
import OnboardingTrustedContact from "./OnboardingTrustedContact";
import OnboardingTutorial from "./OnboardingTutorial";
import Profile from "./Profile";
import MainApp from './MainApp';

import CreateTag from "./CreateTag";
import { TagFeedScreen } from "./TagFeedScreen";
import { MapScreen } from "./MapScreen";
import { SessionActiveScreen, SessionCompleteScreen } from "./SessionScreens";
import { XPWalletScreen } from './XPWalletScreen';
import { HelperOrientationScreen } from "./HelperOrientationScreen";
import { TalentProfileScreen } from './TalentProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#0A0F1E' },
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginSignup" component={LoginSignup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ForgotUsername" component={ForgotUsername} />
          <Stack.Screen name="SignupVerify" component={SignupVerify} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="OnboardingClasses" component={OnboardingClasses} />
          <Stack.Screen name="TranscriptUpload" component={TranscriptUpload} />
          <Stack.Screen name="OnboardingHobbies" component={OnboardingHobbies} />
          <Stack.Screen name="OnboardingTrustedContact" component={OnboardingTrustedContact} />
          <Stack.Screen name="OnboardingTutorial" component={OnboardingTutorial} />
          <Stack.Screen name="HelperOrientation" component={HelperOrientationScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="TalentProfile" component={TalentProfileScreen} />
          <Stack.Screen name="CreateTag" component={CreateTag} />
          <Stack.Screen name="TagFeed" component={TagFeedScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="SessionActive" component={SessionActiveScreen} />
          <Stack.Screen name="SessionComplete" component={SessionCompleteScreen} />
          <Stack.Screen name="XPWallet" component={XPWalletScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
