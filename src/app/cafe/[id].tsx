import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Clock, Globe, Phone, Star as StarIcon } from 'lucide-react-native';

import Layout from '../../components/Layout';
import { Center } from '../../components/ui/center';
import { Heading } from '../../components/ui/heading';
import { HStack } from '../../components/ui/hstack';
import { Icon } from '../../components/ui/icon';
import { Image } from '../../components/ui/image';
import { ScrollView } from '../../components/ui/scroll-view';
import { Spinner } from '../../components/ui/spinner';
import { Text } from '../../components/ui/text';
import { VStack } from '../../components/ui/vstack';
import { EmptyState } from '../../elements';
import {
  googlePlacesService,
  type PlaceDetails,
} from '../../services/google-places';

export default function CafeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [cafe, setCafe] = useState<PlaceDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCafeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await googlePlacesService.getPlaceDetails(id as string);
        setCafe(details);
      } catch (err) {
        setError('Failed to load cafe details. Please try again.');
        console.error('Error loading cafe details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCafeDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Center className="flex-1">
          <Spinner size="large" />
          <Text>Loading cafe details...</Text>
        </Center>
      </Layout>
    );
  }

  if (error || !cafe) {
    return (
      <Layout>
        <EmptyState
          title="Error Loading Cafe"
          description={error || 'Failed to load cafe details'}
          buttonText="Go Back"
          onPress={() => window.history.back()}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView className="flex-1">
        <VStack className="flex-1">
          {cafe.photos?.[0] && (
            <Image
              source={{ uri: cafe.photos[0] }}
              alt={cafe.name}
              className="h-[250px] w-full"
            />
          )}
          <VStack className="space-y-4 p-4">
            <VStack className="space-y-2">
              <Heading size="xl">{cafe.name}</Heading>
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

            {cafe.openingHours && (
              <VStack className="space-y-2">
                <HStack className="items-center space-x-2">
                  <Icon as={Clock} size="sm" className="text-gray-500" />
                  <Text className="font-bold">Opening Hours</Text>
                </HStack>
                <Text className="text-gray-600">
                  {cafe.openingHours.openNow ? 'Open Now' : 'Closed'}
                </Text>
              </VStack>
            )}

            {cafe.phoneNumber && (
              <HStack className="items-center space-x-2">
                <Icon as={Phone} size="sm" className="text-gray-500" />
                <Text className="text-gray-600">{cafe.phoneNumber}</Text>
              </HStack>
            )}

            {cafe.website && (
              <HStack className="items-center space-x-2">
                <Icon as={Globe} size="sm" className="text-gray-500" />
                <Text className="text-blue-600">{cafe.website}</Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </Layout>
  );
}
