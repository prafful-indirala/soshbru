import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Cafe } from '@/types/cafe';

import { RatingStars } from '@/components/RatingStars';
import { StatusBadge } from '@/components/StatusBadge';

interface CafeCardProps {
  cafe: Cafe;
  onPress: (cafe: Cafe) => void;
}

export const CafeCard = ({ cafe, onPress }: CafeCardProps) => {
  const pressAnimation = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnimation, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getWifiStrengthColor = (speed: number) => {
    if (speed >= 100) return '#4CAF50';
    if (speed >= 50) return '#FFC107';
    return '#FF5252';
  };

  const getNoiseLevel = (level: string) => {
    switch (level) {
      case 'quiet':
        return { icon: 'volume-off', color: '#4CAF50', text: 'Quiet Zone' };
      case 'moderate':
        return { icon: 'volume-down', color: '#FFC107', text: 'Moderate' };
      case 'lively':
        return { icon: 'volume-up', color: '#FF5252', text: 'Lively' };
      default:
        return { icon: 'volume-mute', color: '#999', text: 'Unknown' };
    }
  };

  return (
    <Animated.View
      style={[styles.cardContainer, { transform: [{ scale: pressAnimation }] }]}
    >
      <Pressable
        style={styles.card}
        onPress={() => onPress(cafe)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image source={{ uri: cafe.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />

        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{cafe.name}</Text>
              <StatusBadge isOpen={cafe.isOpen} />
            </View>
            <View style={styles.occupancyBadge}>
              <FontAwesome5 name="user-friends" size={12} color="#fff" />
              <Text style={styles.occupancyText}>
                {cafe.currentOccupancy}/50
              </Text>
            </View>
          </View>

          <View style={styles.amenitiesContainer}>
            {/* WiFi Speed */}
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons
                name="wifi"
                size={16}
                color={getWifiStrengthColor(cafe.wifiSpeed)}
              />
              <Text style={styles.amenityText}>{cafe.wifiSpeed} Mbps</Text>
            </View>

            {/* Noise Level */}
            <View style={styles.amenityItem}>
              <FontAwesome5
                name={getNoiseLevel(cafe.noiseLevel).icon}
                size={14}
                color={getNoiseLevel(cafe.noiseLevel).color}
              />
              <Text
                style={[
                  styles.amenityText,
                  { color: getNoiseLevel(cafe.noiseLevel).color },
                ]}
              >
                {getNoiseLevel(cafe.noiseLevel).text}
              </Text>
            </View>

            {/* Power Outlets */}
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons
                name="power-socket"
                size={16}
                color={cafe.powerOutlets ? '#4CAF50' : '#FF5252'}
              />
              <Text
                style={[
                  styles.amenityText,
                  { color: cafe.powerOutlets ? '#4CAF50' : '#FF5252' },
                ]}
              >
                {cafe.powerOutlets ? 'Power Available' : 'Limited Power'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <RatingStars rating={cafe.rating} />
            <Text style={styles.reviews}>({cafe.reviews})</Text>
            <View style={styles.separator} />
            <Text style={styles.distance}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              {cafe.distance}
            </Text>
          </View>

          {/* Professional Count */}
          <View style={styles.professionalCount}>
            <FontAwesome5 name="laptop" size={12} color="#fff" />
            <Text style={styles.professionalText}>
              {cafe.professionalCount} professionals working now
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderRadius: 16,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  amenityText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviews: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  distance: {
    color: '#fff',
    fontSize: 14,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  occupancyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  occupancyText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  professionalCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  professionalText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
