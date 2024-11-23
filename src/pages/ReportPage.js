import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Map from '../components/Map';
import ReportForm from '../components/ReportForm';
import ProblemList from '../components/ProblemList';
import '../styles/global.css';

const ReportPage = () => {
  const [problems, setProblems] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const navigate = useNavigate(); // Instanciar useNavigate

  const handleReportSubmit = (data) => {
    if (address) {
      const newProblem = { ...data, location: address };
      setProblems((prevProblems) => [...prevProblems, newProblem]);
    } else {
      alert('Por favor, selecione a localização no mapa antes de enviar o relatório.');
    }
  };

  const handleLocationSelect = async (latlng) => {
    setLocation(latlng);
    const { lat, lng } = latlng;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`);
      const data = await response.json();

      if (data && data.address) {
        const { road, neighbourhood, city, state, country } = data.address;
        const addressParts = [];
        if (road) addressParts.push(road);
        if (neighbourhood) addressParts.push(neighbourhood);
        if (city) addressParts.push(city);
        if (state) addressParts.push(state);
        if (country) addressParts.push(country);
        setAddress(addressParts.join(', '));
      } else {
        console.error("Endereço não encontrado");
        setAddress('');
      }
    } catch (error) {
      console.error('Erro ao obter endereço:', error);
    }
  };

  return (
    <div className="report-page-container">
      <button onClick={() => navigate('/')} className="back-button">
        Voltar para a Home
      </button>
      <h1 className="report-title">Reportar Problemas no Asfalto</h1>

      <div className="map-form-container">
        <Map onLocationSelect={handleLocationSelect} />
        <ReportForm onSubmit={handleReportSubmit} location={address} />
      </div>

      <ProblemList problems={problems} />
    </div>
  );
};

export default ReportPage;
