import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/sessions/SignUp";
import SignIn from "./components/sessions/SignIn";
import Alert from "./components/Layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser} from "./store/actions/auth";
import store from '../src/store/store';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(()=> {
       store.dispatch(loadUser());
    }, []);
    return (
        <Fragment>
            <Navbar/>
            <Route exact path='/' component={Landing} />
            <section className='container'>
                <Alert />
                <Switch>
                    <Route exact path='/signup' component={Register} />
                    <Route exact path='/login' component={SignIn} />
                </Switch>
            </section>
        </Fragment>
    )
    };
export default App;
