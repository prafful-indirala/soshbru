import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cafe } from '@/types/cafe';

import { CafeCard } from '../components/CafeCard';

const { width } = Dimensions.get('window');

const MOCK_CAFES = [
  {
    id: '1',
    name: 'The Digital Den',
    rating: 4.8,
    reviews: 128,
    distance: '0.3 mi',
    priceLevel: '$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=modern%20coworking%20cafe%20with%20professionals%20working%20on%20laptops',
    description:
      'Premium workspace with high-speed internet and dedicated quiet zones for focused work.',
    isOpen: true,
    wifiSpeed: 300,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 15,
    professionalCount: 12,
    hasBookableSpace: true,
  },
  // ... other cafes
];

export default function SearchScreen() {
  const router = useRouter();
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Animations
  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotations = 5 + Math.random() * 5; // 5-10 rotations
    const randomCafe =
      MOCK_CAFES[Math.floor(Math.random() * MOCK_CAFES.length)];

    // Reset animations
    spinAnim.setValue(0);

    Animated.sequence([
      // Spin animation
      Animated.timing(spinAnim, {
        toValue: randomRotations,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Bounce animation
      Animated.spring(bounceAnim, {
        toValue: 1.2,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset bounce
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();

      setSelectedCafe(randomCafe);
      setIsSpinning(false);
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1a73e8', '#0d47a1']} style={styles.gradient}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Discover Your Workspace</Text>
          <Text style={styles.subtitle}>
            Let fate decide your perfect spot today!
          </Text>
        </Animated.View>

        <View style={styles.wheelContainer}>
          <Animated.View
            style={[
              styles.wheel,
              {
                transform: [{ rotate: spin }, { scale: bounceAnim }],
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://api.a0.dev/assets/image?text=colorful%20wheel%20with%20workspace%20icons',
              }}
              style={styles.wheelImage}
            />
            <View style={styles.wheelCenter}>
              <FontAwesome5 name="compass" size={32} color="#fff" />
            </View>
          </Animated.View>

          <Pressable
            style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
            onPress={spinWheel}
            disabled={isSpinning}
          >
            <Text style={styles.spinButtonText}>
              {isSpinning ? 'Spinning...' : '🎲 Spin the Wheel'}
            </Text>
          </Pressable>
        </View>

        {selectedCafe && (
          <Animated.View
            style={[
              styles.resultContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.resultTitle}>Your Workspace Today:</Text>
            <CafeCard
              cafe={selectedCafe}
              onPress={cafe => {
                router.push({
                  pathname: '/cafe/[id]',
                  params: { id: cafe.id },
                });
              }}
            />
          </Animated.View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a73e8',
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  wheel: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
  },
  wheelImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.4,
  },
  wheelCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  spinButtonDisabled: {
    opacity: 0.7,
  },
  spinButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a73e8',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
});
