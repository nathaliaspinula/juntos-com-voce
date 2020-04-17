import React, { Component } from 'react';
import config from '../../config';
import Logo from '../../assets/LogoCompleta.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { load } from '../../helpers/spreadsheet';
import { Link } from 'react-router-dom'
import './styles.css';

export default class Dicas extends Component {
    state = {
        dicas: [],
        dicasFiltered: [],
        categorias: [],
        totalRegistros: 0,
        error: '',
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
            const totalRegistros = data.totalRegistros;
            this.setState({ dicas, categorias, totalRegistros, dicasFiltered: dicas });
        } else {
            this.setState({ error });
        }
    };
    
    handleCategoriaClick = (titulo) => {
        let filtered = []
        if (titulo === 'total')
        {
            filtered = this.state.dicas;
        } else {
            filtered = this.state.dicas.filter(item => item.categoria === titulo);
        }
        this.setState({ dicasFiltered: filtered });
    }
    
    render() {
        const { dicasFiltered, categorias, totalRegistros, error } = this.state;

        if (error) {
            return <div> {this.state.error} </div>;
        }
        return(
            <>
                <header className="dicas-header">
                    <Link to="/">
                        <img src={Logo} alt="Logo"/>
                    </Link>
                    {
                        totalRegistros ?
                        <div className="dicas-header-items" key={Math.random()} onClick={() => this.handleCategoriaClick('total')}>
                            <span className="dicas-header-items-titulo">Total</span>
                            <div className="dicas-header-items-badge">
                                <Badge badgeContent={totalRegistros} color="primary"/>
                            </div>
                        </div> : null
                    }
                    {
                        categorias.map((categoria,i) =>     
                        <div className="dicas-header-items" key={i} onClick={() => this.handleCategoriaClick(categoria.titulo)}>
                            <span className="dicas-header-items-titulo">{categoria.titulo}</span>
                            <div className="dicas-header-items-badge">
                                <Badge badgeContent={categoria.total} color="primary"/>
                            </div>
                        </div>
                        )
                    }
                </header>
                <main className="dicas-main">
               
                    <Grid container spacing={4} className="dicas-main-container">
                    {
                        dicasFiltered.length > 0 ?
                            dicasFiltered.map((dica, i) => (
                                <Grid item key={i} className="dicas-main-card">
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5" className="dicas-main-title">
                                                {dica.titulo}
                                            </Typography>
                                            <Typography paragraph className="dicas-main-card-description">{dica.descricao}</Typography>
                                        </CardContent>
                                        <CardActions className="dicas-main-card-action">
                                            <a href={dica.link} target="blank" className="dicas-main-card-btn">Acessar</a>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                    
                    :
                        <div className="page-loading">
                            <CircularProgress />
                        </div>
                    }
                    </Grid>
                </main>
                
            </>
        );
    }
};