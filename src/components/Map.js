// src/components/Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Ícone do marcador personalizado para o Leaflet
const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Componente para gerenciar o clique no mapa
const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng); // Passa a posição para o componente pai
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  );
};

const Map = ({ onLocationSelect }) => {
  return (
    <MapContainer
      center={[-21.5400000, -43.0105600]}
      zoom={15}
      style={{ height: '700px', width: '100%', borderRadius: '20px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default Map;
