import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const ReportForm = ({ onSubmit, location }) => {
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState('');
  const [image, setImage] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (location) {
      setLocationText(location);
    }
  }, [location]);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-reports');
      const result = await response.json();
      if (result.success) {
        setReports(result.reports);
      } else {
        alert('Erro ao carregar relatórios.');
      }
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  // Busca os relatórios
  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('location', locationText);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/submit-report', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert('Relatório enviado com sucesso!');
        setDescription('');
        setLocationText('');
        setImage(null);
        fetchReports(); // Atualiza a lista de relatórios após um novo envio
      } else {
        alert('Erro ao enviar relatório. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar relatório:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        <h2 className="formTitle">Reporte um Problema no Asfalto</h2>

        <div className="inputGroup">
          <label className="label">Descrição do Problema:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="inputGroup">
          <label className="label">Localização:</label>
          <input
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="inputGroup">
          <label className="label">Foto do Problema:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="fileInput"
          />
        </div>

        <button type="submit" className="submitButton">
          Reportar Problema
        </button>
      </form>

      {/* Exibindo os relatórios registrados */}
      <div className="reportList">
        <h3>Problemas Reportados</h3>
        <ul>
          {reports.map((report) => (
            <li key={report.id} className="reportItem">
              <h4>{report.description}</h4>
              <p><strong>Localização:</strong> {report.location}</p>
              {report.image && (
                <img
                  src={`http://localhost:3001/uploads/${report.image}`}
                  alt="Problema reportado"
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportForm;
