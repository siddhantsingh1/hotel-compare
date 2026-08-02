import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FILTER_CATEGORIES, Hotel, HOTELS, SORT_OPTIONS } from '../data/mock';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const DEFAULT_CHECK_IN = '2026-08-12';
export const DEFAULT_CHECK_OUT = '2026-08-15';

export function formatDay(iso: string | null) {
  if (!iso) return 'Select date';
  const [, month, day] = iso.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]}`;
}

export function nightsBetween(checkIn: string | null, checkOut: string | null) {
  if (!checkIn || !checkOut) return 0;
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

type Search = {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  rooms: number;
  adults: number;
  children: number;
  tripType: string | null;
};

type Selection = {
  hotelId: string | null;
  roomIndex: number;
  packageIndex: number;
};

type Ctx = {
  search: Search;
  setSearch: (patch: Partial<Search>) => void;
  /** Fills date defaults and commits the search, returning the destination used. */
  commitSearch: (destination?: string) => string;

  filters: Record<string, string[]>;
  toggleFilter: (category: string, option: string) => void;
  setFilters: (next: Record<string, string[]>) => void;
  clearFilters: () => void;
  appliedFilterCount: number;
  appliedFilterLabels: string[];

  sort: string;
  setSort: (next: string) => void;

  selection: Selection;
  setSelection: (patch: Partial<Selection>) => void;

  hotels: Hotel[];
  selectedHotel: Hotel | null;

  stayLabel: string;
  guestsLabel: string;
  roomsLabel: string;
  destinationHasResults: boolean;
};

const BookingContext = createContext<Ctx | null>(null);

const NO_RESULT_DESTINATIONS = ['Zuluk'];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearchState] = useState<Search>({
    destination: '',
    checkIn: null,
    checkOut: null,
    rooms: 1,
    adults: 2,
    children: 0,
    tripType: null,
  });
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [selection, setSelectionState] = useState<Selection>({
    hotelId: null,
    roomIndex: 0,
    packageIndex: 0,
  });

  const setSearch = useCallback((patch: Partial<Search>) => {
    setSearchState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setSelection = useCallback((patch: Partial<Selection>) => {
    setSelectionState((prev) => ({ ...prev, ...patch }));
  }, []);

  const commitSearch = useCallback(
    (destination?: string) => {
      const resolved = destination || search.destination || 'Goa, India';
      setSearchState((prev) => ({
        ...prev,
        destination: resolved,
        checkIn: prev.checkIn ?? DEFAULT_CHECK_IN,
        checkOut: prev.checkOut ?? DEFAULT_CHECK_OUT,
      }));
      return resolved;
    },
    [search.destination]
  );

  const toggleFilter = useCallback((category: string, option: string) => {
    setFilters((prev) => {
      const current = prev[category] ?? [];
      const next = current.includes(option)
        ? current.filter((x) => x !== option)
        : [...current, option];
      return { ...prev, [category]: next };
    });
  }, []);

  const clearFilters = useCallback(() => setFilters({}), []);

  const appliedFilterLabels = useMemo(
    () => FILTER_CATEGORIES.flatMap((category) => filters[category.label] ?? []),
    [filters]
  );

  const value = useMemo<Ctx>(() => {
    const destinationHasResults = !NO_RESULT_DESTINATIONS.some((name) =>
      search.destination.startsWith(name)
    );

    // Star-rating filters are the ones the mock inventory can actually answer;
    // any other combination is treated as matching everything.
    const starFilters = filters['Hotel rating'] ?? [];
    const hotels = destinationHasResults
      ? HOTELS.filter((hotel) => {
          if (starFilters.length === 0) return true;
          return starFilters.includes(`${hotel.starCount} star`);
        }).filter(() => !(filters['Price range'] ?? []).includes('Under ₹2,000'))
      : [];

    const guestParts = [`${search.adults} ${search.adults > 1 ? 'adults' : 'adult'}`];
    if (search.children > 0) {
      guestParts.push(`${search.children} ${search.children > 1 ? 'children' : 'child'}`);
    }
    const roomsLabel = `${search.rooms} ${search.rooms > 1 ? 'rooms' : 'room'}`;
    const dateLabel =
      search.checkIn && search.checkOut
        ? `${formatDay(search.checkIn)} – ${formatDay(search.checkOut)}`
        : 'Select dates';

    return {
      search,
      setSearch,
      commitSearch,
      filters,
      toggleFilter,
      setFilters,
      clearFilters,
      appliedFilterCount: appliedFilterLabels.length,
      appliedFilterLabels,
      sort,
      setSort,
      selection,
      setSelection,
      hotels,
      selectedHotel: HOTELS.find((h) => h.id === selection.hotelId) ?? null,
      stayLabel: `${dateLabel} · ${roomsLabel} · ${guestParts.join(' · ')}`,
      guestsLabel: guestParts.join(' · '),
      roomsLabel,
      destinationHasResults,
    };
  }, [
    search,
    setSearch,
    commitSearch,
    filters,
    toggleFilter,
    clearFilters,
    appliedFilterLabels,
    sort,
    selection,
    setSelection,
  ]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
