import React, { useState } from "react";
import "./Faq.css";
import { FaArrowAltCircleDown } from "react-icons/fa";

const Faq = () => {
  const [estaAberto, setEstaAberto] = useState(Array(3).fill(false));

  const alternarResposta = (index) => {
    const novosEstados = [...estaAberto];
    novosEstados[index] = !novosEstados[index];
    setEstaAberto(novosEstados);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-titulo">Perguntas frequentes</h1>
      <div className="faq">
        <div className="faq-pergunta" onClick={() => alternarResposta(0)}>
          <span>1. Há um limite de solicitações que posso fazer?</span>
          <i className={`seta-icon ${estaAberto[0] ? "openfaq" : "closed"}`}>
            <FaArrowAltCircleDown />
          </i>
        </div>
        {estaAberto[0] && (
          <div className="faq-resposta">
            <p>
              Não, atualmente não há um limite de solicitações que você pode
              fazer através do nosso aplicativo. No entanto, pedimos que você
              faça solicitações de maneira responsável e evite duplicar pedidos
              para a mesma rua ou área. Isso nos ajuda a processar todas as
              solicitações de forma eficiente e justa.
            </p>
          </div>
        )}
      </div>
      <div className="faq">
        <div className="faq-pergunta" onClick={() => alternarResposta(1)}>
          <span>
            2. Como faço para reportar uma rua que precisa de pavimentação?
          </span>

          <i className={`seta-icon ${estaAberto[1] ? "openfaq" : "closed"}`}>
            <FaArrowAltCircleDown />
          </i>
        </div>
        {estaAberto[1] && (
          <div className="faq-resposta">
            <p>
              Para reportar uma rua que precisa de pavimentação, você pode usar
              nosso aplicativo ou site. Selecione a opção 'Reportar Problema',
              escolha 'Pavimentação' e preencha o formulário com as informações
              necessárias, incluindo a localização e uma descrição detalhada do
              problema.
            </p>
          </div>
        )}
      </div>
      <div className="faq">
        <div className="faq-pergunta" onClick={() => alternarResposta(2)}>
          <span>
            3. Quais informações são necessárias para fazer uma solicitação de
            pavimentação?
          </span>
          <i className={`seta-icon ${estaAberto[2] ? "openfaq" : "closed"}`}>
            <FaArrowAltCircleDown />
          </i>
        </div>
        {estaAberto[2] && (
          <div className="faq-resposta">
            <ul>
              <h2>
                Para reportar um problema, você precisará fornecer as seguintes
                informações:
              </h2>
              <li>
                1º Passo:Indique o endereço completo da rua que necessita de
                pavimentação.
              </li>
              <li>
                2º Passo:Forneça uma descrição detalhada do problema:. Por
                favor,inclua informações específicas sobre o tipo do problema na
                pavimentação(ex: buracos, rachaduras, etc).Quanto mais detalhada
                for a descrição, melhor será a compreensão do problema relatado.
              </li>
              <li>
                3º Passo:Tire fotos da área afetada. Embora essa etapa seja
                opcional, é altamente recomendado, pois fornece evidências
                visuais que ajudam a compreender a extensão do problema.
                Certifique-se de capturar imagens claras e abrangentes que
                mostrem claramente a condição da pavimentação.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
