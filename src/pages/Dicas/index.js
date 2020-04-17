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
import { FiX, FiSearch } from 'react-icons/fi'
import './styles.css';

export default class Dicas extends Component {
    state = {
        dicas: [],
        dicasFiltradas: [],
        categorias: [],
        totalRegistros: 0,
        pesquisa: '',
        pesquisaTotalRegistros: 0,
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
            this.setState({ dicas, categorias, totalRegistros, dicasFiltradas: dicas, pesquisaTotalRegistros: totalRegistros });
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
        this.setState({ dicasFiltradas: filtered });
    }
    
    handlePesquisaChange = (e) => {
        const value = e.target.value;
        this.setState({ pesquisa: value });

        let filtered = []

        this.state.dicas.map(dica => (
            (dica.descricao.toUpperCase().indexOf(value.toUpperCase()) !== -1 ||
             dica.titulo.toUpperCase().indexOf(value.toUpperCase()) !== -1 ||
             dica.categoria.toUpperCase().indexOf(value.toUpperCase()) !== -1 ||
             dica.subcategoria.toUpperCase().indexOf(value.toUpperCase()) !== -1
             ) ? filtered.push(dica) : null
        ))

        if (filtered.length > 0) {
            this.setState({ dicasFiltradas: filtered, pesquisaTotalRegistros: filtered.length })
        } else {
            this.setState({ dicasFiltradas: this.state.dicas, pesquisaTotalRegistros: 0 })
        }
    }

    handleLimparPesquisaClick = () => {
        this.setState({ dicasFiltradas: this.state.dicas, pesquisa: '', pesquisaTotalRegistros: 0 })
    }
 
    render() {
        const { dicasFiltradas, categorias, pesquisa, totalRegistros, pesquisaTotalRegistros, error } = this.state;

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
                    <div className="dicas-main-container">
                        {
                            dicasFiltradas.length > 0 ?
                            <>
                                <div className="dicas-container-nav">
                                    <div className="dicas-input-group">
                                        <input className="input-dicas" onChange={this.handlePesquisaChange} value={pesquisa} placeholder="O que faremos hoje?"/>
                                        {
                                            pesquisa ? <span className="dicas-input-span" onClick={this.handleLimparPesquisaClick}><FiX/></span> : <span><FiSearch/></span>
                                        }
                                    </div>
                                    {
                                        pesquisa ? 
                                            <div>
                                                <Typography variant="caption"><b>{pesquisaTotalRegistros}</b> itens encontrado(s).</Typography>
                                            </div> : null
                                    }
                                    
                                </div>
                                <Grid className="dicas-container" container spacing={4} >
                                    { 
                                        dicasFiltradas.map((dica, i) => (
                                            <Grid item key={i} className="dicas-main-card">
                                                <Card className="dicas-main-card-item" variant="outlined">
                                                    <CardContent>
                                                        <Typography variant="h5" className="dicas-main-title">
                                                            {dica.titulo}
                                                        </Typography>
                                                        <Typography color="textSecondary">
                                                            {dica.categoria}
                                                        </Typography>
                                                        <Typography paragraph className="dicas-main-card-description">{dica.descricao}</Typography>
                                                    </CardContent>
                                                    <CardActions className="dicas-main-card-action">
                                                        <a href={dica.link} target="blank" className="dicas-main-card-btn">Acessar</a>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </>
                        :
                            <div className="page-loading">
                                <CircularProgress />
                            </div>
                        }
                        
                    </div>
                </main>
                
            </>
        );
    }
};