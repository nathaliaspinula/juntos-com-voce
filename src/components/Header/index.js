import React from 'react';
import logo from '../../assets/LogoCompleta.png';
import "./styles.css";

const Header = () => (
    <header id="headerNavigation">
         <nav className="navigator">
            <a href="#headerNavigation" className="navigator__logo_link">
                <img
                    src={logo}
                    alt="Juntos Com Você Logo"
                    className="navigator__logo"
                />
            </a>
            <button className="hamburger hamburger--vortex" type="button">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
            </button>
            <ul className="navigator__list" id="navlist">
            <li className="navigator__item">
                <a href="#headerNavigation" className="navigator__link">Inicio</a>
            </li>
            <li className="navigator__item">
                <a href="#projetosNavigation" className="navigator__link">Projeto</a>
            </li>
            <li className="navigator__item">
                <a href="#helpNavigation" className="navigator__link">Participe</a>
            </li>
            <li className="navigator__item">
                <a href="#headerNavigation" className="navigator__link">Sobre</a>
            </li>
            </ul>
        </nav>
        <div className="main">
        <h1 className="main__heading">JuntosComVc</h1>
        <p className="main__text">
          Estar junto por quem precisa é possível mesmo sem estar perto.
          JuntosComVc é uma iniciativa criada por voluntários de diversas áreas
          do conhecimento com um único propósito: criar soluções de impacto para
          conter os danos causados pela pandemia e o distanciamento social.
        </p>
        <button className="main__btn">Saiba Mais</button>
      </div>
    </header>
);

export default Header;