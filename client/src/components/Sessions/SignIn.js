import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FormGroupField from "../Form/FormGroupField";
import { signIn } from "../../store/actions/auth";
import PropTypes from "prop-types";

const SignIn = ( props) => {
    const { signIn, isAuthenticated } = props;
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = data;
    const handleOnChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        signIn(email, password);
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className='wrapper'>
            <p className="lead"><i className="fas fa-user"></i> Log In </p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <FormGroupField
                    placeholder = 'Email'
                    name='email'
                    value={email}
                    onChange={ e=> handleOnChange(e) }
                    required='required'
                    subText= 'This site uses Gravatar so if you want a profile image, use a Gravatar email'
                />

                <FormGroupField
                    type='password'
                    placeholder = 'Password'
                    name='password'
                    value={password}
                    onChange={ e=> handleOnChange(e) }
                    required='required'

                    subText = 'Minimum length 6 characters'
                />
                <input type="submit" className="btn btn-primary" value="Sign In"/>
            </form>
            <p className="my-1">
                Don't you have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    )
}

SignIn.propsTypes = {
    signIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps, { signIn } )(SignIn);