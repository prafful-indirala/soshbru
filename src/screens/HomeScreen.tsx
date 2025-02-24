import React, { useEffect, useRef } from 'react';
import { Animated, RefreshControl, StyleSheet } from 'react-native';
import { Cafe } from '@/data/useCafe';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { CafeCard } from '@/components/CafeCard';
import { FilterChips, FilterOption } from '@/components/FilterChips';
import Layout from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export const MOCK_CAFES: Cafe[] = [
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
    popularItems: [
      {
        name: 'Power Package',
        price: '$15/day',
        description:
          'Includes reserved desk, premium WiFi, and unlimited coffee',
      },
    ],
  },
  {
    id: '2',
    name: 'Creative Commons',
    rating: 4.6,
    reviews: 95,
    distance: '0.8 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=artistic%20cafe%20with%20colorful%20walls%20and%20creative%20workspace',
    description:
      'Vibrant community space perfect for creative professionals and collaborative projects.',
    isOpen: true,
    wifiSpeed: 200,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 28,
    professionalCount: 20,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Creative Corner',
        price: '$20/day',
        description:
          'Private booth with drawing tablet and creative software access',
      },
    ],
  },
  {
    id: '3',
    name: 'Zen Zone',
    rating: 4.9,
    reviews: 156,
    distance: '1.2 mi',
    priceLevel: '$$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=minimalist%20japanese%20style%20workspace%20with%20zen%20garden',
    description:
      'Peaceful workspace with meditation rooms and focus-oriented design.',
    isOpen: false,
    wifiSpeed: 500,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 5,
    professionalCount: 8,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Zen Package',
        price: '$25/day',
        description:
          'Private pod with meditation cushion and wellness amenities',
      },
    ],
  },
  {
    id: '4',
    name: 'Tech Hub',
    rating: 4.7,
    reviews: 203,
    distance: '0.5 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=modern%20tech%20workspace%20with%20multiple%20monitors%20and%20gadgets',
    description:
      'High-tech workspace with advanced equipment and developer-friendly setup.',
    isOpen: true,
    wifiSpeed: 1000,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 32,
    professionalCount: 25,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Dev Station',
        price: '$30/day',
        description:
          'Dual monitor setup with development tools and private server',
      },
    ],
  },
  {
    id: '5',
    name: 'Green Oasis',
    rating: 4.5,
    reviews: 87,
    distance: '1.5 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=eco-friendly%20workspace%20with%20plants%20and%20natural%20light',
    description:
      'Eco-friendly workspace surrounded by plants and natural light.',
    isOpen: true,
    wifiSpeed: 150,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 18,
    professionalCount: 10,
    hasBookableSpace: false,
    popularItems: [
      {
        name: 'Garden Desk',
        price: '$18/day',
        description:
          'Workspace surrounded by plants with organic coffee included',
      },
    ],
  },
  {
    id: '6',
    name: 'Night Owl Studio',
    rating: 4.4,
    reviews: 142,
    distance: '0.9 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=late%20night%20workspace%20with%20cozy%20lighting%20and%20modern%20furniture',
    description:
      '24/7 workspace perfect for night owls and international remote workers.',
    isOpen: true,
    wifiSpeed: 400,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 8,
    professionalCount: 15,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Night Pass',
        price: '$22/night',
        description: 'Overnight access with sleeping pod and shower facilities',
      },
    ],
  },
];

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open Now' },
  { id: 'fastWifi', label: 'Fast WiFi' },
  { id: 'ultraFastWifi', label: 'Ultra Fast WiFi (500+ Mbps)' },
  { id: 'quietZone', label: 'Quiet Zone' },
  { id: 'powerOutlets', label: 'Power Available' },
  { id: 'lowOccupancy', label: 'Low Occupancy' },
  { id: 'highPro', label: '5+ Professionals' },
  { id: 'meetingSpace', label: 'Meeting Space' },
  { id: 'nearby', label: 'Within 1mi' },
  { id: 'budget', label: 'Budget Friendly ($)' },
  { id: 'premium', label: 'Premium ($$$)' },
  { id: '247', label: '24/7 Access' },
  { id: 'eco', label: 'Eco-Friendly' },
];

export default function HomeScreen() {
  const router = useRouter();
  // State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([
    'all',
  ]);
  const [refreshing, setRefreshing] = React.useState(false);

  // Animations
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Header animation based on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 80],
    extrapolate: 'clamp',
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [28, 22],
    extrapolate: 'clamp',
  });

  const handleToggleFilter = (filterId: string) => {
    setSelectedFilters(prevFilters => {
      if (filterId === 'all') return ['all'];

      const newFilters = prevFilters.includes('all')
        ? [filterId]
        : prevFilters.includes(filterId)
          ? prevFilters.filter(f => f !== filterId)
          : [...prevFilters, filterId];

      return newFilters.length === 0 ? ['all'] : newFilters;
    });
  };

  const filteredCafes = MOCK_CAFES.filter(cafe => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !cafe.name.toLowerCase().includes(searchLower) &&
        !cafe.description.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (selectedFilters.includes('all')) return true;

    return selectedFilters.some(filter => {
      switch (filter) {
        case 'open':
          return cafe.isOpen;
        case 'fastWifi':
          return cafe.wifiSpeed >= 100;
        case 'quietZone':
          return cafe.noiseLevel === 'quiet';
        case 'powerOutlets':
          return cafe.powerOutlets;
        case 'lowOccupancy':
          return cafe.currentOccupancy <= 25;
        case 'highPro':
          return cafe.professionalCount >= 5;
        case 'meetingSpace':
          return cafe.hasBookableSpace;
        case 'nearby':
          return parseFloat(cafe.distance) <= 1.0;
        default:
          return false;
      }
    });
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <Layout hasSafeArea={false}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#1a73e8', '#0d47a1']}
          style={styles.headerGradient}
        >
          <Animated.Text style={[styles.title, { fontSize: headerTitleSize }]}>
            Explore Workspaces
          </Animated.Text>
        </LinearGradient>
      </Animated.View>

      {/* Search and Filters */}
      <Animated.View
        style={[
          styles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
        <Box>
          <FilterChips
            options={filterOptions}
            selectedFilters={selectedFilters}
            onToggleFilter={handleToggleFilter}
          />
        </Box>
      </Animated.View>

      {/* Workspace Listings */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#1a73e8"
          />
        }
      >
        {filteredCafes.map((cafe, index) => (
          <Animated.View
            key={cafe.id}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50 * (index + 1), 0],
                  }),
                },
              ],
            }}
          >
            <CafeCard
              cafe={cafe}
              onPress={cafe => {
                router.push({
                  pathname: '/cafe/[id]',
                  params: { id: cafe.id },
                });
              }}
            />
          </Animated.View>
        ))}
        {filteredCafes.length === 0 && (
          <Text style={styles.noResults}>
            No workspaces found matching your criteria
          </Text>
        )}
      </Animated.ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 32,
  },
});
