import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Tab screens — only screens that live permanently in the tab bar
import Homepage from './screens/Homepage';
import Leaderboard from './screens/Leaderboard';
import { MapScreen } from './screens/MapScreen';
import { XPWalletScreen } from './screens/XPWalletScreen';

const Tab = createBottomTabNavigator();

// CreateTag lives in the STACK navigator (so it can navigate to TagFeed, SessionActive etc.)
// This button navigates up to the stack to open it
function CreateTagTabButton({ children }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.createTagBtn}
      onPress={() => navigation.navigate('CreateTag')}
    >
      <View style={styles.createTagInner}>
        <Ionicons name="pricetag" size={22} color="#000" />
      </View>
    </TouchableOpacity>
  );
}

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" color={color} size={size} />,
        }}
      />

      {/* Center button — navigates to CreateTag in the stack */}
      <Tab.Screen
        name="TagButton"
        component={Homepage}
        options={{
          tabBarLabel: 'Tag',
          tabBarButton: (props) => <CreateTagTabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="XPWallet"
        component={XPWalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1E2A3A',
    borderTopColor: '#374151',
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 12,
    paddingTop: 8,
  },
  tabLabel: { fontSize: 11, fontWeight: '500' },
  createTagBtn: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTagInner: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#3B82F6',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#3B82F6', shadowOpacity: 0.5,
    shadowRadius: 8, elevation: 6,
  },
});