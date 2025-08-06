/* eslint-disable */

"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Merchant } from "@/libs/interfaces";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultLocations = [
  {
    id: "1",
    lat: 9.03,
    lng: 38.74,
    name: "Addis Ababa, Ethiopia",
    link: "https://example.com/addis-ababa",
  },
  {
    id: "2",
    lat: 8.98,
    lng: 38.79,
    name: "Bole, Ethiopia",
    link: "https://example.com/bole",
  },
  {
    id: "3",
    lat: 9.01,
    lng: 38.76,
    name: "Megenagna, Ethiopia",
    link: "https://example.com/megenagna",
  },
];

interface Location {
  id: string;
  lat: number;
  lng: number;
  name: string;
  link?: string;
  // eslint-disable-next-line
  [key: string]: any;
}

interface MapViewProps {
  fullWidth?: boolean;
  locations?: Location[];
  onSelect?: (id: Merchant) => void;
}

const MapView: React.FC<MapViewProps> = ({
  fullWidth = false,
  locations = defaultLocations,
  onSelect,
}) => {
  useEffect(() => {
    const mapElement = document.querySelector(
      ".leaflet-container"
    ) as HTMLElement | null;
    if (mapElement) {
      mapElement.style.height = "100%";
    }
  }, []);

  const handleMarkerClick = (merchant: Merchant | Location) => {
    if (onSelect) {
      onSelect(merchant as any);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          fullWidth ? "w-full" : "md:w-5/6"
        } w-full h-[400px] md:p-4 rounded-3xl`}
      >
        <MapContainer
          center={[9.03, 38.74]}
          zoom={13}
          className="w-full h-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(loc),
              }}
            >
              <Popup>
                <div
                  className="cursor-pointer"
                  onClick={() => handleMarkerClick(loc)}
                >
                  {loc.link ? (
                    <a
                      href={loc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {loc.name}
                    </a>
                  ) : (
                    <span>{loc.name}</span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
