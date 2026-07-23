"use client";

import type { Venue } from "@/lib/types";
import {
  SINGAPORE_BOUNDARY,
  SINGAPORE_DEFAULT_ZOOM,
  SINGAPORE_MAX_BOUNDS,
  SINGAPORE_MAX_ZOOM,
  SINGAPORE_MASK_OPTIONS,
  SINGAPORE_MIN_ZOOM,
  SINGAPORE_OUTLINE_OPTIONS,
  WORLD_MASK_OUTER,
} from "@/lib/singapore-map";
import { SINGAPORE_CENTER } from "@/lib/venues";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

type JazzMapProps = {
  venues: Venue[];
  selectedSlug?: string | null;
  onMarkerSelect?: (slug: string) => void;
};

function createMarkerIcon(isSelected: boolean) {
  const size = isSelected ? 18 : 14;
  return L.divIcon({
    className: "",
    html: `<div class="jazz-marker" style="width:${size}px;height:${size}px;${isSelected ? "background:var(--brass-light);transform:scale(1.15);" : ""}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapController({
  venues,
  selectedSlug,
}: {
  venues: Venue[];
  selectedSlug?: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(SINGAPORE_MAX_BOUNDS);
    map.setMinZoom(SINGAPORE_MIN_ZOOM);
    map.setMaxZoom(SINGAPORE_MAX_ZOOM);
  }, [map]);

  useEffect(() => {
    if (selectedSlug) {
      const venue = venues.find((v) => v.slug === selectedSlug);
      if (venue) {
        map.flyTo([venue.lat, venue.lng], 15, { duration: 0.8 });
      }
    }
  }, [map, selectedSlug, venues]);

  return null;
}

function SingaporeRegionMask() {
  return (
    <>
      <Polygon
        positions={[WORLD_MASK_OUTER, SINGAPORE_BOUNDARY]}
        pathOptions={SINGAPORE_MASK_OPTIONS}
      />
      <Polygon positions={SINGAPORE_BOUNDARY} pathOptions={SINGAPORE_OUTLINE_OPTIONS} />
    </>
  );
}

export function JazzMap({
  venues,
  selectedSlug,
  onMarkerSelect,
}: JazzMapProps) {
  const icons = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    return (slug: string, isSelected: boolean) => {
      const key = `${slug}-${isSelected}`;
      if (!cache.has(key)) {
        cache.set(key, createMarkerIcon(isSelected));
      }
      return cache.get(key)!;
    };
  }, []);

  return (
    <MapContainer
      center={[SINGAPORE_CENTER.lat, SINGAPORE_CENTER.lng]}
      zoom={SINGAPORE_DEFAULT_ZOOM}
      minZoom={SINGAPORE_MIN_ZOOM}
      maxZoom={SINGAPORE_MAX_ZOOM}
      maxBounds={SINGAPORE_MAX_BOUNDS}
      maxBoundsViscosity={1}
      className="h-full w-full rounded-sm"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <SingaporeRegionMask />
      <MapController venues={venues} selectedSlug={selectedSlug} />
      {venues.map((venue) => {
        const isSelected = venue.slug === selectedSlug;
        return (
          <Marker
            key={venue.slug}
            position={[venue.lat, venue.lng]}
            icon={icons(venue.slug, isSelected)}
            eventHandlers={{
              click: () => onMarkerSelect?.(venue.slug),
            }}
          >
            <Popup>
              <div className="min-w-[160px] font-[family-name:var(--font-cormorant)]">
                <p className="font-[family-name:var(--font-playfair)] text-base font-semibold text-ink">
                  {venue.name}
                </p>
                <p className="mt-1 text-sm text-slate-blue">
                  {venue.neighborhood}
                </p>
                <Link
                  href={`/venues/${venue.slug}`}
                  className="mt-2 inline-block text-sm text-brass hover:underline"
                >
                  View details
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
