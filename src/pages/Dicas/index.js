import React, { Component } from 'react';
import config from '../../config';
import { load } from '../../helpers/spreadsheet';
import Logo from '../../assets/LogoCompleta.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './styles.css';

export default class Dicas extends Component {
    state = {
        dicas: [],
        categorias: [],
        error: ''
    }
    componentDidMount() {
        window.gapi.load("client", this.initGoogleClient);
    }
    
    initGoogleClient = () => {
        window.gapi.client.init({
          apiKey: config.API_KEY,
          clientId: config.CLIENT_ID,
          discoveryDocs: config.DISCOVERY_DOCS,
          scope: config.SCOPE
        }).then(() => {
            load(this.onLoad)
        });
    }
    
    onLoad = (data, error) => {
        if (data) {
            const dicas = data.dicas;
            const categorias = data.categorias;
            this.setState({ dicas, categorias });
        } else {
            this.setState({ error });
        }
    };

    render() {
        const { dicas, categorias, error } = this.state;
        if (error) {
            return <div> {this.state.error} </div>;
        }
        return(
            <>
                <header className="dicas-header">
                    <div>
                        <img src={Logo} alt="Logo"/>
                    </div>
                    {
                        categorias.map((categoria,i) =>
                    <div key={i}>{categoria.titulo} - {categoria.total}</div>
                        )
                    }
                </header>
                <main className="dicas-main">
                    <Grid container spacing={4} className="dicas-main-container">
                        {
                            dicas.map((dica, i) => (
                                <Grid item key={i}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {dica.titulo}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {dica.categoria}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {dica.descricao}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </main>
            </>
        );
    }
};