import React from "react";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import Sobre from "../sobre/Sobre";
import Faq from "../faq/Faq"; // Importando o componente Faq
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Banner />
      <section id="sobre" className="section_sobre">
        <Sobre />
      </section>
       <section id="faq">
         <Faq /> 
       </section>
     
      <Footer />
    </div>
  );
};

export default LandingPage;
