import {
  NearbySearchOptions,
  PlaceDetails,
  SearchOptions,
  SearchResult,
} from './types';

class GooglePlacesService {
  private apiKey: string;

  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    // We'll get this from environment variables once set up
    this.apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Google Places API key is not configured');
    }
  }

  // Search for places using text query
  async searchPlaces(options: SearchOptions): Promise<SearchResult> {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        ...(options.query && { query: options.query }),
        ...(options.location && {
          location: `${options.location.latitude},${options.location.longitude}`,
        }),
        ...(options.radius && { radius: options.radius.toString() }),
        ...(options.type && { type: options.type }),
        ...(options.pageToken && { pagetoken: options.pageToken }),
      });

      const response = await fetch(
        `${this.baseUrl}/textsearch/json?${params.toString()}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_message || 'Failed to fetch places');
      }

      return this.formatSearchResults(data);
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  }

  // Search for nearby places
  async searchNearbyPlaces(
    options: NearbySearchOptions,
  ): Promise<SearchResult> {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        location: `${options.location.latitude},${options.location.longitude}`,
        radius: options.radius.toString(),
        ...(options.type && { type: options.type }),
        ...(options.pageToken && { pagetoken: options.pageToken }),
      });

      const response = await fetch(
        `${this.baseUrl}/nearbysearch/json?${params.toString()}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_message || 'Failed to fetch nearby places');
      }

      return this.formatSearchResults(data);
    } catch (error) {
      console.error('Error searching nearby places:', error);
      throw error;
    }
  }

  // Get detailed information about a specific place
  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        place_id: placeId,
        fields: [
          'name',
          'formatted_address',
          'geometry',
          'photo',
          'rating',
          'user_ratings_total',
          'opening_hours',
          'formatted_phone_number',
          'website',
          'price_level',
          'type',
        ].join(','),
      });

      const response = await fetch(
        `${this.baseUrl}/details/json?${params.toString()}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_message || 'Failed to fetch place details');
      }

      return this.formatPlaceDetails(data.result);
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error;
    }
  }

  // Get photo URL for a place
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    const params = new URLSearchParams({
      key: this.apiKey,
      photoreference: photoReference,
      maxwidth: maxWidth.toString(),
    });

    return `${this.baseUrl}/photo?${params.toString()}`;
  }

  // Helper method to format search results
  private formatSearchResults(data: any): SearchResult {
    return {
      places: data.results.map((place: any) => ({
        placeId: place.place_id,
        name: place.name,
        formattedAddress: place.formatted_address || place.vicinity,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        photos: place.photos?.map((photo: any) =>
          this.getPhotoUrl(photo.photo_reference),
        ),
        rating: place.rating,
        userRatingsTotal: place.user_ratings_total,
        priceLevel: place.price_level,
        types: place.types,
      })),
      nextPageToken: data.next_page_token,
    };
  }

  // Helper method to format place details
  private formatPlaceDetails(place: any): PlaceDetails {
    return {
      placeId: place.place_id,
      name: place.name,
      formattedAddress: place.formatted_address,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      photos: place.photos?.map((photo: any) =>
        this.getPhotoUrl(photo.photo_reference),
      ),
      rating: place.rating,
      userRatingsTotal: place.user_ratings_total,
      openingHours: place.opening_hours
        ? {
          openNow: place.opening_hours.open_now,
          periods: place.opening_hours.periods,
        }
        : undefined,
      phoneNumber: place.formatted_phone_number,
      website: place.website,
      priceLevel: place.price_level,
      types: place.types,
    };
  }
}

export const googlePlacesService = new GooglePlacesService();
export * from './types';
