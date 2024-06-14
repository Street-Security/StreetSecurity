import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";  // Instale o pacote @fortawesome/free-brands-svg-icons para funcionar: npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtendo o ano corrente

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Street Security. Todos os direitos reservados.</p>
        <p>
          <a href="/politica-de-privacidade">Política de Privacidade</a> | 
          <a href="/termos-de-uso">Termos de Uso</a>
        </p>
        <p>
          <a href="https://www.instagram.com/streetsecurityprojeto?igsh=MWwwMWRtdXgzYmJ2dA==" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
