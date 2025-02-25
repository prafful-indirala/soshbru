import React, { useEffect, useRef } from 'react';
import { Animated, RefreshControl, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import useCafes from '@/data/useCafe';

import { useFilters } from '@/hooks/useFilters';
import { CafeCard } from '@/components/CafeCard';
import { FilterChips } from '@/components/FilterChips';
import Layout from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { Box } from '@/components/ui/box';
import { brandColors, grayScale } from '@/components/ui/colors-reference';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const router = useRouter();
  // State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  // Filtering
  const { data: MOCK_CAFES } = useCafes();
  const filters = useFilters({
    cafes: MOCK_CAFES,
    searchQuery,
    initialFilters: ['all'],
  });
  const { selectedFilters, filteredCafes, handleToggleFilter, filterOptions } =
    filters;

  // Debug filter state
  React.useEffect(() => {
    console.log('Selected:', selectedFilters);
    console.log('Filtered count:', filteredCafes.length);
  }, [selectedFilters, filteredCafes.length]);

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
  }, [fadeAnim, translateY]);

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
          colors={[brandColors.purpleDark, brandColors.purple]}
          style={styles.headerGradient}
        >
          <Animated.Text style={[styles.title, { fontSize: headerTitleSize }]}>
            Explore Coffice Spots
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
            tintColor={brandColors.purpleDark}
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
    backgroundColor: grayScale.gray100,
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
    color: grayScale.white,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: grayScale.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: grayScale.gray900,
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
    color: grayScale.gray500,
    fontSize: 16,
    marginTop: 32,
  },
});
