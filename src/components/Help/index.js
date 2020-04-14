import React from 'react';
import HappyHourLogo from '../../assets/icon1.png';
import InfoLogo from '../../assets/icon2.png';
import DicasLogo from '../../assets/icon3.png';
import ChatBotLogo from '../../assets/icon4.png';
import "./styles.css";

const Help = () => (
    <section class="help">
      <h2 class="help__heading">Como posso ajudar?</h2>
      <p class="help__desc">
        São diversas as formas de ajudar. A primeira delas é divulgando esta
        plataforma para que mais pessoas possam ter acesso ao conteúdo. Possui
        algum talento? Que tal usar eles neste momento? Você também pode nos
        ajudar patrocinando este projeto que hoje formado 100% por volutários
        dispostos a ajudar na luta contra o COVID-19. Entre em contato conosco e
        faça parte dessa corrente do bem
      </p>
      <button class="help__btn">Fale Conosco</button>
    </section>
);

export default Help;