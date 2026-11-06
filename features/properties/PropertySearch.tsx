"use client";

import { useMemo, useState } from "react";
import { Button, Checkbox, Drawer, Group, RangeSlider, Select, Stack, Text } from "@mantine/core";
import { Sliders, SlidersHorizontal } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SearchBar } from "@/components/search/SearchBar";
import { properties } from "@/data/properties";

const PAGE_SIZE = 6;
type FilterProps = { roomType: string | null; setRoomType: (value: string | null) => void; gender: string | null; setGender: (value: string | null) => void; range: [number, number]; setRange: (value: [number, number]) => void; amenities: string[]; setAmenities: (value: string[]) => void; onReset: () => void };

function Filters({ roomType, setRoomType, gender, setGender, range, setRange, amenities, setAmenities, onReset }: FilterProps) {
  return <Stack gap="lg"><Group justify="space-between"><Text fw={700}>Filter by</Text><Button variant="subtle" size="compact-sm" color="silong" onClick={onReset}>Clear all</Button></Group><Select label="Room type" placeholder="Any room type" clearable data={["Private room", "Shared room", "Bedspace"]} value={roomType} onChange={setRoomType} /><div><Text size="sm" fw={600} mb="sm">Monthly budget</Text><RangeSlider min={3000} max={20000} step={500} value={range} onChange={setRange} label={(value) => `₱${value.toLocaleString()}`} /><Group justify="space-between" mt="xs"><Text size="xs" c="dimmed">₱3,000</Text><Text size="xs" c="dimmed">₱20,000+</Text></Group></div><Select label="Gender policy" placeholder="Any policy" clearable data={["Any gender", "Female only", "Male only"]} value={gender} onChange={setGender} /><div><Text size="sm" fw={600} mb="sm">Amenities</Text><Checkbox.Group value={amenities} onChange={setAmenities}><Stack gap="xs"><Checkbox value="Wi-Fi" label="Wi-Fi" /><Checkbox value="Air conditioning" label="Air conditioning" /><Checkbox value="Laundry area" label="Laundry area" /><Checkbox value="Study area" label="Study area" /></Stack></Checkbox.Group></div></Stack>;
}

export function PropertySearch() {
  const params = useSearchParams();
  const queryLocation = params.get("location");
  const location = queryLocation ?? "Taguig City";
  const [roomType, setRoomType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [range, setRange] = useState<[number, number]>([3000, 20000]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const updateRoomType = (value: string | null) => { setRoomType(value); setVisibleCount(PAGE_SIZE); };
  const updateGender = (value: string | null) => { setGender(value); setVisibleCount(PAGE_SIZE); };
  const updateRange = (value: [number, number]) => { setRange(value); setVisibleCount(PAGE_SIZE); };
  const updateAmenities = (value: string[]) => { setAmenities(value); setVisibleCount(PAGE_SIZE); };
  const updateSort = (value: string | null) => { setSort(value ?? "recommended"); setVisibleCount(PAGE_SIZE); };

  const filtered = useMemo(() => properties.filter((property) => {
    const searchableLocation = `${property.city} ${property.barangay} ${property.address}`.toLowerCase();
    const roomMatchesLocation = !queryLocation || searchableLocation.includes(location.toLowerCase());
    const rooms = property.rooms.filter((room) => (!roomType || room.type === roomType) && (!gender || room.genderPolicy === "Any gender" || room.genderPolicy === gender) && room.price >= range[0] && room.price <= range[1] && amenities.every((amenity) => property.amenities.includes(amenity)));
    return roomMatchesLocation && rooms.length > 0;
  }), [amenities, gender, location, queryLocation, range, roomType]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => sort === "price-low" ? a.monthlyFrom - b.monthlyFrom : 0), [filtered, sort]);
  const visibleProperties = sorted.slice(0, visibleCount);
  const reset = () => { setRoomType(null); setGender(null); setRange([3000, 20000]); setAmenities([]); setSort("recommended"); };

  return <><section className="listingIntro"><div className="container"><p className="sectionKicker">Explore Taguig and beyond</p><h1>Find a place to call home.</h1><p>Browse comfortable spaces in neighborhoods that keep you close to the things that matter.</p><SearchBar compact initialValue={queryLocation ?? ""} /></div></section><section className="container resultsLayout"><aside className="filtersDesktop"><Filters roomType={roomType} setRoomType={updateRoomType} gender={gender} setGender={updateGender} range={range} setRange={updateRange} amenities={amenities} setAmenities={updateAmenities} onReset={reset} /></aside><div className="resultsContent"><Group justify="space-between" align="end" mb="lg"><div><Text size="sm" c="dimmed">{filtered.length} places in</Text><h2 className="resultsHeading">{location}</h2></div><Button hiddenFrom="md" variant="light" color="silong" leftSection={<SlidersHorizontal size={18} />} onClick={() => setMobileFiltersOpen(true)}>Filters</Button><Select className="sortSelect" aria-label="Sort results" value={sort} onChange={updateSort} data={[{ value: "recommended", label: "Recommended" }, { value: "price-low", label: "Price: low to high" }]} /></Group>{filtered.length > 0 ? <><div className="propertyGrid">{visibleProperties.map((property) => <PropertyCard key={property.id} property={property} />)}</div>{visibleCount < sorted.length && <div className="loadMoreWrap"><Button variant="light" color="silong" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load more places</Button></div>}</> : <div className="emptyState"><Sliders size={34} /><h3>No places match those filters</h3><p>Try widening your search or clearing one of the filters.</p><Button color="silong" onClick={reset}>Clear filters</Button></div>}</div></section><Drawer opened={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filter places" padding="lg" position="right"><Filters roomType={roomType} setRoomType={updateRoomType} gender={gender} setGender={updateGender} range={range} setRange={updateRange} amenities={amenities} setAmenities={updateAmenities} onReset={reset} /></Drawer></>;
}
