import React, { Fragment, useEffect } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import SignUp from "./components/Sessions/SignUp";
import SignIn from "./components/Sessions/SignIn";
import Alert from "./components/Layout/Alert";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/Profile/CreateOrUpdateProfile";
import EditProfile from "./components/Profile/CreateOrUpdateProfile";
import UpdateExperience from "./components/Profile/UpdateExperience";
import UpdateEducation from "./components/Profile/UpdateEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";

import setAuthToken from "./utils/setAuthToken";
import { loadUser} from "./store/actions/auth";
import PrivateRoute from "./components/Routing/PrivateRoute";

//Redux
import { Provider } from 'react-redux';
import store from '../src/store/store';
//=============

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
                            <Route exact path='/signup' component={SignUp} />
                            <Route exact path='/signin' component={SignIn} />
                            <Route exact path='/profiles' component={Profiles} />
                            <Route exact path='/profile/:id' component={Profile} />
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                            <PrivateRoute exact path='/update-experience' component={UpdateExperience} />
                            <PrivateRoute exact path='/update-education' component={UpdateEducation} />
                            <PrivateRoute exact path='/posts' component={Posts} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
    };
export default App;
