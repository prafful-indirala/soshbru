import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
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
import { useLocalSearchParams } from 'expo-router';

import Layout from '@/components/Layout';
import { NetworkingCard } from '@/components/NetworkingCard';
import { RatingStars } from '@/components/RatingStars';

export default function CafeDetailsScreen() {
  const { cafe } = useLocalSearchParams();
  console.log('🚀 ~ CafeDetailsScreen ~ cafe:', cafe);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
  }; // Add state for check-in status
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);

  return (
    <Layout hasSafeArea={false}>
      <ScrollView style={styles.scrollView}>
        {/* Existing content */}

        {/* Add NetworkingCard */}
        <NetworkingCard
          cafeId={cafe.id}
          cafeName={cafe.name}
          onSiteCount={cafe.professionalCount}
          isCheckedIn={isCheckedIn}
          onCheckIn={() => setIsCheckedIn(true)}
          onViewProfessionals={() => {
            navigation.navigate('Professionals', { cafeName: cafe.name });
          }}
        />
        <View style={styles.imageContainer}>
          <Image source={{ uri: cafe.imageUrl }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Workspace Status */}
          <View style={styles.statusSection}>
            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: cafe.isOpen ? '#4CAF50' : '#FF5252' },
                ]}
              />
              <Text style={styles.statusText}>
                {cafe.isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
            <View style={styles.occupancyBadge}>
              <FontAwesome5 name="user-friends" size={16} color="#666" />
              <Text style={styles.occupancyText}>
                {cafe.currentOccupancy}/50 seats
              </Text>
            </View>
          </View>

          {/* Workspace Title & Rating */}
          <View style={styles.header}>
            <Text style={styles.name}>{cafe.name}</Text>
            <View style={styles.ratingContainer}>
              <RatingStars rating={cafe.rating} />
              <Text style={styles.reviews}>({cafe.reviews} reviews)</Text>
            </View>
          </View>

          {/* Key Metrics */}
          <View style={styles.metricsContainer}>
            {/* WiFi Speed */}
            <View style={styles.metricItem}>
              <MaterialCommunityIcons
                name="wifi"
                size={24}
                color={getWifiStrengthColor(cafe.wifiSpeed)}
              />
              <Text style={styles.metricValue}>{cafe.wifiSpeed} Mbps</Text>
              <Text style={styles.metricLabel}>WiFi Speed</Text>
            </View>

            {/* Noise Level */}
            <View style={styles.metricItem}>
              <FontAwesome5
                name={getNoiseLevel(cafe.noiseLevel).icon}
                size={24}
                color={getNoiseLevel(cafe.noiseLevel).color}
              />
              <Text
                style={[
                  styles.metricValue,
                  { color: getNoiseLevel(cafe.noiseLevel).color },
                ]}
              >
                {getNoiseLevel(cafe.noiseLevel).text}
              </Text>
              <Text style={styles.metricLabel}>Ambiance</Text>
            </View>

            {/* Power Outlets */}
            <View style={styles.metricItem}>
              <MaterialCommunityIcons
                name="power-socket"
                size={24}
                color={cafe.powerOutlets ? '#4CAF50' : '#FF5252'}
              />
              <Text
                style={[
                  styles.metricValue,
                  { color: cafe.powerOutlets ? '#4CAF50' : '#FF5252' },
                ]}
              >
                {cafe.powerOutlets ? 'Available' : 'Limited'}
              </Text>
              <Text style={styles.metricLabel}>Power</Text>
            </View>
          </View>

          {/* Professional Network */}
          <View style={styles.networkSection}>
            <Text style={styles.sectionTitle}>Professional Network</Text>
            <View style={styles.networkStats}>
              <FontAwesome5 name="laptop" size={16} color="#666" />
              <Text style={styles.networkText}>
                {cafe.professionalCount} professionals working now
              </Text>
            </View>
          </View>

          {/* Workspace Packages */}
          {cafe.popularItems && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Workspace Packages</Text>
              {cafe.popularItems.map((item, index) => (
                <View key={index} style={styles.packageItem}>
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageName}>{item.name}</Text>
                    <Text style={styles.packagePrice}>{item.price}</Text>
                  </View>
                  <Text style={styles.packageDescription}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this Workspace</Text>
            <Text style={styles.description}>{cafe.description}</Text>
          </View>

          {/* Location Info */}
          <View style={styles.locationSection}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.locationText}>{cafe.distance} away</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  occupancyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  occupancyText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviews: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  networkSection: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  networkStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  packageItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  packagePrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  packageDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});
