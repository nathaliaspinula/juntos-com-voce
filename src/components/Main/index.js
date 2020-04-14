import React from 'react';
import HappyHourLogo from '../../assets/icon1.png';
import InfoLogo from '../../assets/icon2.png';
import DicasLogo from '../../assets/icon3.png';
import ChatBotLogo from '../../assets/icon4.png';
import "./styles.css";

const Main = () => (
    <main class="projetos">
      <h2 class="projetos__heading">Nossos Projetos</h2>
      <p class="projetos__description">
        A rede JuntosComVc está trabalhando em diversos projetos de impacto
        social, entre eles:
      </p>
      <div class="projetos__container">
        <div class="projetos__projeto">
          <a href="" class="projeto__link">
            <img src={HappyHourLogo} alt="Happy Hour Icon" class="projeto__image" />
            <p class="projeto__text">Web Happy Hours</p>
          </a>
        </div>
        <div class="projetos__projeto">
          <a href="" class="projeto__link">
            <img src={InfoLogo} alt="" class="projeto__image" />
            <p class="projeto__text">Informação Confiável</p>
          </a>
        </div>
        <div class="projetos__projeto">
          <a href="" class="projeto__link">
            <img src={DicasLogo} alt="" class="projeto__image" />
            <p class="projeto__text">Dicas para Quarentena</p>
          </a>
        </div>
        <div class="projetos__projeto">
          <a href="" class="projeto__link">
            <img src={ChatBotLogo} alt="" class="projeto__image" />
            <p class="projeto__text">Chatbot Covid-19</p>
            </a>
          </div>
      </div>
    </main>
);

export default Main;