import React from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Help from '../../components/Help';
import Chatbot from '../Chatbot';
import Footer from '../../components/Footer';

export default function() {
    return(
        <>
        <Header/>
        <Main/>
        <Help/>
        <Chatbot/>
        <Footer/>
        </>
    );
};