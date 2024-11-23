import React from "react";
import "./Banner.css";
import BannerImage from "./image.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <img src={BannerImage} alt="Banner" className="banner-image" />
      <div className="banner-text">
        <p className="banner-titulo">Street Security</p>
        <p className="banner-descricao">Viu um buraco? Avise a prefeitura de SJN!</p>
        {/* <p className="info_btn">Clique no botão abaixo para informar seu problema</p> */}
        <Link className="btnHome" to="/report"><button>Reportar</button></Link>
      </div>
    </div>
  );
};

export default Banner;
