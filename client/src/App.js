import React, { Fragment, useEffect } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/sessions/SignUp";
import SignIn from "./components/sessions/SignIn";
import Alert from "./components/Layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser} from "./store/actions/auth";

//Redux
import { Provider } from 'react-redux';
import store from '../src/store/store';


if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(()=> {
       store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
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
            </Router>
        </Provider>
    )
    };
export default App;
