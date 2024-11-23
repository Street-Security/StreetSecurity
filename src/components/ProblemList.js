// src/components/ProblemList.js
import React from 'react';

const ProblemList = ({ problems }) => {
  if (!problems || problems.length === 0) {
    return <p></p>;
  }

  return (
    <div>
      <h2>Problemas Reportados</h2>
      <ul>
        {problems.map((problem, index) => (
          <li key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <p><strong>Descrição:</strong> {problem.description}</p>
            <p><strong>Localização:</strong> {problem.location?.lat}, {problem.location?.lng}</p>
            {problem.image && (
              <div>
                <strong>Foto:</strong>
                <img
                  src={URL.createObjectURL(problem.image)}
                  alt="Imagem do problema"
                  style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
