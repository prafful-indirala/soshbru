import { useCallback, useEffect, useMemo, useState } from 'react';
import { Cafe } from '@/data/useCafe';

export type FilterOption = {
  id: string;
  label: string;
};

const defaultFilterOptions: FilterOption[] = [
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

export interface UseFiltersOptions {
  initialFilters?: string[];
  cafes: Cafe[];
  searchQuery?: string;
}

export interface FilterResult {
  selectedFilters: string[];
  filteredCafes: Cafe[];
  handleToggleFilter: (filterId: string) => void;
  filterOptions: FilterOption[];
}

const validateFilter = (filterId: string, options: FilterOption[]): boolean => {
  return options.some(option => option.id === filterId);
};

const applySearchQuery = (cafe: Cafe, searchQuery: string): boolean => {
  const searchLower = searchQuery.toLowerCase();
  return (
    cafe.name.toLowerCase().includes(searchLower) ||
    cafe.description.toLowerCase().includes(searchLower)
  );
};

const applyFilter = (cafe: Cafe, filter: string): boolean => {
  switch (filter) {
    case 'open':
      return cafe.isOpen;
    case 'fastWifi':
      return cafe.wifiSpeed >= 100;
    case 'ultraFastWifi':
      return cafe.wifiSpeed >= 500;
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
    case 'budget':
      return cafe.priceLevel === '$';
    case 'premium':
      return cafe.priceLevel === '$$$';
    case '247':
      return (
        cafe.name.toLowerCase().includes('24/7') ||
        cafe.description.toLowerCase().includes('24/7')
      );
    case 'eco':
      return cafe.description.toLowerCase().includes('eco');
    default:
      return false;
  }
};

export function useFilters({
  initialFilters = ['all'],
  cafes = [],
  searchQuery = '',
}: UseFiltersOptions): FilterResult {
  const [filterOptions] = useState<FilterOption[]>(defaultFilterOptions);

  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    const validFilters = initialFilters.filter(id =>
      validateFilter(id, filterOptions),
    );
    return validFilters.length > 0 ? validFilters : ['all'];
  });

  const handleToggleFilter = useCallback(
    (filterId: string) => {
      console.log('Toggle filter called with:', filterId);
      console.log('Current filter options:', filterOptions);

      if (!validateFilter(filterId, filterOptions)) {
        console.warn(`Invalid filter ID: ${filterId}`);
        return;
      }

      setSelectedFilters(prevFilters => {
        console.log('Previous filters:', prevFilters);

        let newFilters;
        if (filterId === 'all') {
          newFilters = ['all'];
        } else {
          newFilters = prevFilters.includes('all')
            ? [filterId]
            : prevFilters.includes(filterId)
              ? prevFilters.filter(f => f !== filterId)
              : [...prevFilters, filterId];

          if (newFilters.length === 0) {
            newFilters = ['all'];
          }
        }

        console.log('New filters:', newFilters);
        return newFilters;
      });
    },
    [filterOptions],
  );

  // Debug filtered cafes calculation
  useEffect(() => {
    console.log('Filtering cafes with:', {
      selectedFilters,
      searchQuery,
      totalCafes: cafes.length,
    });
  }, [selectedFilters, searchQuery, cafes.length]);

  const filteredCafes = useMemo(() => {
    return cafes.filter(cafe => {
      // Apply search query filter
      if (searchQuery && !applySearchQuery(cafe, searchQuery)) {
        return false;
      }

      // If 'all' is selected, don't apply any other filters
      if (selectedFilters.includes('all')) return true;

      // Apply selected filters
      return selectedFilters.some(filter => applyFilter(cafe, filter));
    });
  }, [cafes, searchQuery, selectedFilters]);

  return {
    selectedFilters,
    filteredCafes,
    handleToggleFilter,
    filterOptions,
  };
}
