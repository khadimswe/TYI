import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  Platform,
} from "react-native";

const { height } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';

export default function SplashScreen({ navigation }) {

  const dotOpacity = useRef(new Animated.Value(isWeb ? 1 : 0)).current;
  const dotScale = useRef(new Animated.Value(isWeb ? 1 : 0.6)).current;

  const tagOpacity = useRef(new Animated.Value(isWeb ? 1 : 0)).current;
  const tagScale = useRef(new Animated.Value(isWeb ? 1 : 0.8)).current;

  const tagY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // On web, skip animations and navigate after a brief delay
    if (isWeb) {
      const timer = setTimeout(() => {
        navigation.replace("LoginSignup");
      }, 1500);
      return () => clearTimeout(timer);
    }

    Animated.sequence([

      // 1️⃣ Dot appears
      Animated.parallel([
        Animated.timing(dotOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.spring(dotScale, {
          toValue: 1,
          stiffness: 180,
          damping: 18,
          mass: 1,
          useNativeDriver: true,
        }),
      ]),

      // 2️⃣ Tag text appears
      Animated.parallel([
        Animated.timing(tagOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.spring(tagScale, {
          toValue: 1,
          stiffness: 160,
          damping: 16,
          mass: 1,
          useNativeDriver: true,
        }),
      ]),

      // 3️⃣ Pause briefly
      Animated.delay(300),

      // 4️⃣ Tag shoots upward
      Animated.timing(tagY, {
        toValue: -(height * 0.35),
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

    ]).start(() => {
      navigation.replace("LoginSignup");
    });

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.row,
          {
            opacity: tagOpacity,
            transform: [
              { scale: tagScale },
              { translateY: tagY },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.dot,
            {
              opacity: dotOpacity,
              transform: [{ scale: dotScale }],
            },
          ]}
        />

        <Text style={styles.tagText}>Tag</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },

  tagText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    letterSpacing: -2,
  },
});