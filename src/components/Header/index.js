import React from 'react';
import logo from '../../assets/LogoCompleta.png';
import "./styles.css";

const Header = () => (
    <header>
         <nav class="navigator">
            <a href="" class="navigator__logo_link">
                <img
                    src={logo}
                    alt="Juntos Com Você Logo"
                    class="navigator__logo"
                />
            </a>
            <button class="hamburger hamburger--vortex" type="button">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
            </button>
            <ul class="navigator__list" id="navlist">
            <li class="navigator__item">
                <a href="" class="navigator__link">Inicio</a>
            </li>
            <li class="navigator__item">
                <a href="" class="navigator__link">Projeto</a>
            </li>
            <li class="navigator__item">
                <a href="" class="navigator__link">Participe</a>
            </li>
            <li class="navigator__item">
                <a class="navigator__link">Sobre</a>
            </li>
            </ul>
        </nav>
        <div class="main">
        <h1 class="main__heading">JuntosComVc</h1>
        <p class="main__text">
          Estar junto por quem precisa é possível mesmo sem estar perto.
          JuntosComVc é uma iniciativa criada por voluntários de diversas áreas
          do conhecimento com um único propósito: criar soluções de impacto para
          conter os danos causados pela pandemia e o distanciamento social.
        </p>
        <button class="main__btn">Saiba Mais</button>
      </div>
    </header>
);

export default Header;