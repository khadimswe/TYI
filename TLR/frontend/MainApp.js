import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import SendTag from './SendTag';
import Board from './Board';
import Leaderboard from './Leaderboard';
import CashOut from './CashOut';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused }) => {
          const icons = {
            Home: '🏠',
            'SendTag': '🏷️',
            'LiveTags': '📍',
            Board: '💬',
            Leaderboard: '🏆',
            'CashOut': '💵',
          };
          return (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
              {icons[route.name]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="SendTag" component={SendTag} options={{ tabBarLabel: 'Send Tag' }} />
      <Tab.Screen name="Board" component={Board} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="CashOut" component={CashOut} options={{ tabBarLabel: 'Cash Out' }} />
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
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});

