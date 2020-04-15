import React from 'react';
import HappyHourLogo from '../../assets/icon1.png';
import InfoLogo from '../../assets/icon2.png';
import DicasLogo from '../../assets/icon3.png';
import ChatBotLogo from '../../assets/icon4.png';
import "./styles.css";

const Main = () => (
    <main id="projetosNavigation" className="projetos">
      <h2 className="projetos__heading">Nossos Projetos</h2>
      <p className="projetos__description">
        A rede JuntosComVc está trabalhando em diversos projetos de impacto
        social, entre eles:
      </p>
      <div className="projetos__container">
        <div className="projetos__projeto">
          <a href="#" className="projeto__link">
            <img src={HappyHourLogo} alt="Happy Hour Icon" className="projeto__image" />
            <p className="projeto__text">Web Happy Hours</p>
          </a>
        </div>
        <div className="projetos__projeto">
          <a href="#" className="projeto__link">
            <img src={InfoLogo} alt="" className="projeto__image" />
            <p className="projeto__text">Informação Confiável</p>
          </a>
        </div>
        <div className="projetos__projeto">
          <a href="#" className="projeto__link">
            <img src={DicasLogo} alt="" className="projeto__image" />
            <p className="projeto__text">Dicas para Quarentena</p>
          </a>
        </div>
        <div className="projetos__projeto">
          <a href="#" className="projeto__link">
            <img src={ChatBotLogo} alt="" className="projeto__image" />
            <p className="projeto__text">Chatbot Covid-19</p>
            </a>
          </div>
      </div>
    </main>
);

export default Main;