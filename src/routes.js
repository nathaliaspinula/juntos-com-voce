import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dicas from './pages/Dicas';

const Routes = () =>
(
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/dicas" component={Dicas}></Route>
    </Switch>
);

export default Routes;
