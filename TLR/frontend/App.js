import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationProvider } from './context/LocationContext';

// screens
import SplashScreen from './screens/SplashScreen';
import LoginSignup from './screens/LoginSignup';
import MainApp from './MainApp';
import SignupVerify from './screens/SignupVerify';
import CreateAccount from './screens/CreateAccount';
import OnboardingScreen from "./screens/OnboardingScreen";
import OnboardingClasses from "./screens/OnboardingClasses";
import TranscriptUpload from './screens/TranscriptUpload';
import OnboardingHobbies from "./screens/OnboardingHobbies";
import OnboardingTrustedContact from "./screens/OnboardingTrustedContact";
import OnboardingTutorial from "./screens/OnboardingTutorial";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotUsername from "./screens/ForgotUsername";
import Profile from "./screens/Profile";


import CreateTag from "./screens/CreateTag";
import { TagFeedScreen } from "./screens/TagFeedScreen";
import { MapScreen } from "./screens/MapScreen";
import { SessionActiveScreen, SessionCompleteScreen } from "./screens/SessionScreens";
import { XPWalletScreen } from './screens/XPWalletScreen';
import { HelperOrientationScreen } from "./screens/HelperOrientationScreen";
import { TalentProfileScreen } from './screens/TalentProfileScreen';


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
          <Stack.Screen name = "TalentProfile" component ={TalentProfileScreen} />
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
