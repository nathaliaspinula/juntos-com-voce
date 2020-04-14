import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Help from './components/Help';
import Chatbot from './pages/Chatbot';
import Footer from './components/Footer';
import './global.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Help/>
      <Chatbot/>
      <Footer/>
    </div>
  );
}

export default App;
