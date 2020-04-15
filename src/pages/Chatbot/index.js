import React, { useState, useEffect }from 'react';
import "./styles.css";

export default function() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [termos, setTermos] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [message, setMessage] = useState('');
  const [btnAutoExameTxt, setBtnAutoExameTxt] = useState('');
  const [btnAutoExame, setBtnAutoExame] = useState(false);
  const [autoExameOpen, setAutoExameOpen] = useState(false);
  const [chatBotEnable, setChatBotEnable] = useState(false);

  useEffect(() => {
    setMessage('Para mapearmos os casos de Coronavirus, precisamos acessar a sua localização');
    setBtnAutoExameTxt('Auto Exame');
  }, []);

  function handleAutoExameClick(e) {
    e.preventDefault();
    if(autoExameOpen) {
      setAutoExameOpen(false);
    } else {
      setAutoExameOpen(true);
    }
    if (window.innerWidth <= 430) {
      setBtnAutoExame(true);
      if (btnAutoExame !== "Auto Exame") {
        setBtnAutoExameTxt("Auto Exame");
      } else {
        setBtnAutoExameTxt("");
      }
    }
  }

  function handleChatbotClick(e) {
    e.preventDefault();
    
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitudeValue = position.coords.latitude;
        const longitudeValue = position.coords.longitude;

        setLatitude(latitudeValue);
        setLongitude(longitudeValue);
        
        setMessage('Para mapearmos os casos de Coronavirus, precisamos acessar a sua localização');
       
        validateData() === true ? sendPost() : setMessage('Favor preencher todos os campos.');;
      }, (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setMessage('É necessário que você permita o acesso à sua localização.');
            break;
          case error.POSITION_UNAVAILABLE:
            setMessage('Sua localização está indisponivel.');
            break;
          default:
            setMessage('Ocorreu um erro, tente novamente.');
        }
      });

    } else {
      setMessage("Este navegador não suporta geolocalização.");
    }
  }

  function validateData() {
    if(!(nome && telefone && latitude && longitude)) {
      return false;
    }
    return true;
  }

  async function sendPost() {
    setChatBotEnable(true);
    let response = await fetch("https://juntoscomvc.com.br/", {
      method: "POST",
      mode: "cors",
      body: {
        Nome: nome,
        Telefone: telefone,
        termos: termos
      },
    });
  
    let result = await response.json();
  }

  return(
    <div
      className={
        autoExameOpen ? 'frame frame--big' : 'frame'
      }
      id="frame">
      <div
      className={
        autoExameOpen ? 'frame__holder frame--active' : 'frame__holder'
      }
      id="chatFrame">
      {
        chatBotEnable ? 
          <iframe 
            title="chatbot" 
            src='https://webchat.botframework.com/embed/BotAgainstCorona?s=a0RXGz5wxTI.nrD9P3krB3QlYtuHXWcOCe8ut_SbLc4b5M72YU5Tpm0'>
          </iframe> :
          <form action="" method="post" className="chatform" id="chatform" name="chatform">
            <h2 className="chatbot__title">Antes de iniciar o chat, precisamos de algumas informações</h2>
            <div className="chatbot__container chatbot__container--vertical">
              <input 
                type="text"
                name="Nome"
                placeholder="Seu nome"
                id="name"
                className="chatbot__input--normal"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <label className="chatbot__label">Nome</label>
            </div>
            
            <div className="chatbot__container chatbot__container--vertical">
              <input
                type="tel"
                name="Telefone"
                id="tel"
                placeholder="11 9 9999-9999"
                className="chatbot__input--normal"
                required
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
              <label className="chatbot__label">Telefone</label>
            </div>
            
            <div className="chatbot__container ">
              <label className="chatbot__location" id="message">{ message }</label>
              <input type="hidden" name="localizacao" id="localizacao" className="chatbot__input chatbot__input--hidden" required />
            </div>
    
            <div className="chatbot__container chatbot__container--horizontal">
              <input type="checkbox" name="termos" id="aceito" className="chatbot__input" required />
              <label className="chatbot__label--checkbox">Li e aceito os <a href="http://">termos de uso de dados</a></label>
            </div>

            <button 
              type="submit"
              className="chatbot__submit"
              id="chatbotSubmit"
              onClick={handleChatbotClick}>Acessar o Chatbot</button>
        </form>
      }
      </div>
      <button
        className={btnAutoExame ? "frame__btn frame__btn--close" : "frame__btn"}
        id="chatBtn"
        onClick={handleAutoExameClick}>
          {btnAutoExameTxt}
      </button>
    </div>
  )
};