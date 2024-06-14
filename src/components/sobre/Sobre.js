import React from 'react';
import './Sobre.css';
import sobreImage from './prancheta.png'; // Importe a imagem aqui
import ComoFuncionaImg from './ComoFunciona.png'
import parceirosImg from './Parceiros.png'
// import LogoPrefeitura from './LogoPrefeitura.png'

const Sobre = () => {
  return (
    <div className='container_sobre'>
      {/* <img className='LogoPrefeitura' src={LogoPrefeitura}/> */}
      <h1 className='titulosection'>Sobre Nós</h1>
      <div className='cards_sobre'>
        <div className='card_conteudo'>
          <h1 className='titulo_card'>Objetivos<img src={sobreImage} /></h1>
          <span className='text_card'>
            Nosso objetivo é tornar São João de Nepomuceno uma cidade com ruas mais seguras e bem conservadas. Através do nosso site, queremos garantir que os problemas de pavimentação sejam relatados e resolvidos de forma rápida e eficiente.
          </span>
        </div>
        <div className='card_conteudo'>
          <h1 className='titulo_card'>Como Funciona<img src={ComoFuncionaImg} /></h1>
          <span className='text_card'>
            Para reportar um problema de pavimentação, basta acessar nossa página inicial e preencher o formulário com as informações necessárias, como a localização e uma descrição do problema. Nossa equipe encaminhará o relato para a prefeitura, que tomará as medidas necessárias. </span>
        </div>
        <div className='card_conteudo'>
          <h1 className='titulo_card'>Parceiros<img src={parceirosImg} /></h1>
          <span className='text_card'>
            Street Security é um projeto de extensão da Uniacademia em parceria com a prefeitura de São João de Nepomuceno, que tem como objetivo desenvolver soluções inovadoras para os desafios urbanos da cidade. A colaboração entre a academia e o governo local é essencial para a eficácia do projeto.</span>
        </div>
      </div>

    </div>
  );
};

export default Sobre;
