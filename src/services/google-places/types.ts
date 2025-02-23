export interface PlaceDetails {
  placeId: string;
  name: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  photos?: string[];
  rating?: number;
  userRatingsTotal?: number;
  openingHours?: {
    openNow?: boolean;
    periods?: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
  };
  phoneNumber?: string;
  website?: string;
  priceLevel?: number; // 0-4, representing price range
  types?: string[];
}

export interface SearchResult {
  places: PlaceDetails[];
  nextPageToken?: string;
}

export interface SearchOptions {
  query?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  radius?: number; // in meters
  type?: string;
  pageToken?: string;
}

export interface NearbySearchOptions {
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  type?: string;
  pageToken?: string;
}
