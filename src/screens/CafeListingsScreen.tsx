import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { SearchIcon, Star as StarIcon } from 'lucide-react-native';

import Layout from '../components/Layout';
import { Center } from '../components/ui/center';
import { Heading } from '../components/ui/heading';
import { HStack } from '../components/ui/hstack';
import { Icon } from '../components/ui/icon';
import { Image } from '../components/ui/image';
import { Input, InputField, InputIcon } from '../components/ui/input';
import { ScrollView } from '../components/ui/scroll-view';
import { Spinner } from '../components/ui/spinner';
import { Text } from '../components/ui/text';
import { VStack } from '../components/ui/vstack';
import EmptyState from '../elements/EmptyState';
import FormControl from '../elements/FormControl';
import {
  googlePlacesService,
  type PlaceDetails,
} from '../services/google-places';

export default function CafeListingsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cafes, setCafes] = useState<PlaceDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchCafes = useCallback(async (query: string = '') => {
    try {
      setError(null);
      const result = await googlePlacesService.searchPlaces({
        query: `${query} cafe coffee`,
        type: 'cafe',
        radius: 5000, // 5km radius
      });
      setCafes(result.places);
    } catch (err) {
      setError('Failed to load cafes. Please try again.');
      console.error('Error loading cafes:', err);
    }
  }, []);

  const loadCafes = useCallback(async () => {
    setLoading(true);
    await searchCafes(searchQuery);
    setLoading(false);
  }, [searchQuery, searchCafes]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await searchCafes(searchQuery);
    setRefreshing(false);
  }, [searchQuery, searchCafes]);

  useEffect(() => {
    loadCafes();
  }, [loadCafes]);

  const renderContent = () => {
    if (loading) {
      return (
        <Center className="flex-1 p-4">
          <Spinner size="large" />
          <Text>Loading cafes...</Text>
        </Center>
      );
    }

    if (error) {
      return (
        <EmptyState
          title="Error Loading Cafes"
          description={error}
          buttonText="Try Again"
          onPress={loadCafes}
        />
      );
    }

    if (cafes.length === 0) {
      return (
        <EmptyState
          title="No Cafes Found"
          description="Try adjusting your search or location settings."
          buttonText="Refresh"
          onPress={handleRefresh}
        />
      );
    }

    return (
      <VStack className="space-y-4 p-4">
        {cafes.map(cafe => (
          <Link
            key={cafe.placeId}
            href={`/cafe/${cafe.placeId}` as any}
            asChild
          >
            <Pressable>
              <CafeCard cafe={cafe} />
            </Pressable>
          </Link>
        ))}
      </VStack>
    );
  };

  return (
    <Layout>
      <VStack className="bg-background flex-1">
        <VStack className="space-y-4 p-4">
          <Heading size="xl">Find Cafes</Heading>
          <FormControl
            label="Search"
            helperMsg=""
            isRequired={false}
            isInvalid={undefined}
          >
            <Input>
              <InputIcon as={SearchIcon} className="ml-2 text-gray-500" />
              <InputField
                placeholder="Search cafes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => searchCafes(searchQuery)}
              />
            </Input>
          </FormControl>
        </VStack>

        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {renderContent()}
        </ScrollView>
      </VStack>
    </Layout>
  );
}

interface CafeCardProps {
  cafe: PlaceDetails;
}

function CafeCard({ cafe }: CafeCardProps) {
  return (
    <VStack className="space-y-2 rounded-lg border border-gray-200 bg-white p-4">
      {cafe.photos?.[0] && (
        <Image
          source={{ uri: cafe.photos[0] }}
          alt={cafe.name}
          className="h-[200px] w-full rounded-md"
        />
      )}
      <VStack className="space-y-1">
        <Heading size="md">{cafe.name}</Heading>
        <Text className="text-gray-600">{cafe.formattedAddress}</Text>
        {cafe.rating && (
          <HStack className="items-center space-x-1">
            <Icon as={StarIcon} size="sm" className="text-yellow-500" />
            <Text>{cafe.rating.toFixed(1)}</Text>
            <Text className="text-gray-600">
              ({cafe.userRatingsTotal?.toLocaleString()} reviews)
            </Text>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}
