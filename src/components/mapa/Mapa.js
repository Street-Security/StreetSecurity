import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';

const Mapa = ({ latitude, longitude, setLatitude, setLongitude, setEndereco }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const bounds = [
      [-21.5650, -43.0450], 
      [-21.5050, -42.9750]  
    ];

    const map = L.map('mapa', {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      minZoom: 13, // Definindo o zoom mínimo
      maxZoom: 16, // Definindo o zoom máximo
    }).setView([-21.535783, -43.014950], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapRef.current = map;

    getLocation();

    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      if (isWithinBounds(lat, lng, bounds)) {
        updateMarker(lat, lng);
        updateAddress(lat, lng);
      } else {
        alert("O marcador deve estar dentro dos limites de São João Nepomuceno.");
      }
    });

    return () => {
      map.off('click');
    };
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocalização não é suportada por este navegador.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    if (isWithinBounds(lat, lon, [
      [-21.5650, -43.0450],
      [-21.5050, -42.9750]
    ])) {
      mapRef.current.setView([lat, lon], 13);
      updateMarker(lat, lon);
      updateAddress(lat, lon);
    } else {
      alert("A localização atual está fora dos limites de São João Nepomuceno.");
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Usuário negou a solicitação de Geolocalização.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("As informações de localização não estão disponíveis.");
        break;
      case error.TIMEOUT:
        alert("A solicitação para obter a localização do usuário expirou.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Ocorreu um erro desconhecido.");
        break;
    }
  };

  const isWithinBounds = (lat, lon, bounds) => {
    const [sw, ne] = bounds;
    return lat >= sw[0] && lat <= ne[0] && lon >= sw[1] && lon <= ne[1];
  };

  const updateMarker = (latitude, longitude) => {
    if (markerRef.current) {
      mapRef.current.removeLayer(markerRef.current);
    }
    const marker = L.marker([latitude, longitude]).addTo(mapRef.current);
    markerRef.current = marker;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const updateAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }
      const data = await response.json();
      const addressComponents = data.address;
      const road = addressComponents.road || '';
      const city = addressComponents.city || addressComponents.town || addressComponents.village || addressComponents.city_district || 'São João Nepomuceno';
      const state = addressComponents.state || 'Minas Gerais';
      const postcode = addressComponents.postcode || '';
      const address = `${road}, ${city}, ${state}, ${postcode}`;
      setEndereco(address);
    } catch (error) {
      console.error('Erro ao obter o endereço:', error);
      alert('Ocorreu um erro ao obter o endereço. Por favor, tente novamente.');
    }
  };

  return <div id="mapa" style={{ height: '300px', marginBottom: '15px' }}></div>;
};

export default Mapa;
