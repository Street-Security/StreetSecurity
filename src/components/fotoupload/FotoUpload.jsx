import './FotoUpload.css';
import React, { useState } from 'react';
import { BsTrash } from "react-icons/bs";

const FotoUpload = ({ setFotos }) => {
  const [fotoPreviews, setFotoPreviews] = useState([]);
  const [ampliadaFoto, setAmpliadaFoto] = useState(null);

  const handleFotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setFotoPreviews(prevPreviews => [...prevPreviews, ...files]);
      setFotos(prevFotos => [...prevFotos, ...files]);
    }
  };

  const handleRemoverFoto = (index) => {
    setFotos(prevFotos => prevFotos.filter((_, i) => i !== index));
    setFotoPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleAmpliarFoto = (index) => {
    setAmpliadaFoto(fotoPreviews[index]);
  };

  const handleFecharAmpliacao = () => {
    setAmpliadaFoto(null);
  };

  return (
    <div className="foto-upload">
      <label htmlFor="fotos" className="foto-upload-label">Enviar Fotos:</label>
      <input
        type="file"
        id="fotos"
        name="fotos"
        accept="image/*"
        multiple
        onChange={handleFotoChange}
        className="foto-upload-input"
      />
      {fotoPreviews.length > 0 && (
        <div id="fotoPreview" className="foto-preview">
          {fotoPreviews.map((file, index) => (
            <div key={index} className="foto-preview-item">
              <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="foto-preview-image" onClick={() => handleAmpliarFoto(index)} />
              <button className="remover-button" onClick={() => handleRemoverFoto(index)} title="Remover Foto">
                <BsTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      {ampliadaFoto && (
        <div className="ampliacao-overlay" onClick={handleFecharAmpliacao}>
          <div className="ampliacao-content">
            <img src={URL.createObjectURL(ampliadaFoto)} alt="Foto Ampliada" className="foto-ampliada" style={{ maxWidth: '800px', maxHeight: '600px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FotoUpload;
