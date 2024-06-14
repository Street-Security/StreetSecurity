import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapa from '../mapa/Mapa';
import FotoUpload from '../fotoupload/FotoUpload';
import './Formulario.css';

// Componente Popup
const Popup = ({ message, onClose, autoClose = 5500, onAutoClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAutoClose();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, onAutoClose]);

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>X</button>
      <p>{message}</p>
      <div className="progress-bar">
        <div className="progress" style={{ animationDuration: `${autoClose}ms` }}></div>
      </div>
    </div>
  );
};

const Formulario = () => {
  const navigate = useNavigate(); // Hook para redirecionar
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se o e-mail é válido
    if (!emailIsValid(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('endereco', endereco);
      formData.append('pontoReferencia', pontoReferencia);
      formData.append('descricao', descricao);
      fotos.forEach((foto) => {
        formData.append('fotos', foto);
      });
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o problema.');
      }

      // Limpar os campos após o envio bem-sucedido
      setNome('');
      setEmail('');
      setEndereco('');
      setPontoReferencia('');
      setDescricao('');
      setFotos([]);
      setLatitude('');
      setLongitude('');

      // Exibir pop-up de sucesso
      setShowPopup(true);

    } catch (error) {
      // Exibir alerta de erro
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar o problema.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupAutoClose = () => {
    setShowPopup(false);
    navigate('/');
  };

  return (
    <div className='container_relatar'>
      <div className="container_form_problema">
        <h1 className='h1_problema'>Relatar Problema</h1>
        <form id="problemaForm" onSubmit={handleSubmit}>
          <label className='label_form' htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          // required
          />

          <label className='label_form' htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label className='label_form' htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          // required
          />

          <label htmlFor="pontoReferencia">Ponto de Referência:</label>
          <input
            type="text"
            id="pontoReferencia"
            name="pontoReferencia"
            value={pontoReferencia}
            onChange={(e) => setPontoReferencia(e.target.value)}
          // required
          />

          <label htmlFor="descricao">Descrição do Problema:</label>
          <textarea
            id="descricao"
            name="descricao"
            rows="4"
            className="descricao-textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            // required
            maxLength="1000"
          ></textarea>

          <FotoUpload setFotos={setFotos} />

          <label className="mapa_localizacao" htmlFor="mapa">Selecionar Localização no Mapa:</label>
          <Mapa
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setEndereco={setEndereco}
          />

          <input type="hidden" id="latitude" name="latitude" value={latitude} />
          <input type="hidden" id="longitude" name="longitude" value={longitude} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" className='btn_enviar_form'>Enviar</button>
            <button type="button" className='btn_cancelar_form' onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
        {showPopup && (
          <Popup message="Problema enviado com sucesso!" onClose={handlePopupClose} onAutoClose={handlePopupAutoClose} />
        )}
      </div>
    </div>

  );
};

export default Formulario;
