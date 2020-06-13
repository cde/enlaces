import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/sessions/Signup";
import Signin from "./components/sessions/Signin";
import Alert from "./components/Layout/Alert";

const App = () => (
    <Fragment>
        <Navbar/>
        <Route exact path='/' component={Landing} />
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/signup' component={Register} />
                <Route exact path='/login' component={Signin} />
            </Switch>
        </section>
    </Fragment>
);
export default App;
