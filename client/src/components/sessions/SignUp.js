import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormGroupField from "../Form/FormGroupField";

import { setAlert } from "../../store/actions/alert"
import { signUp } from "../../store/actions/auth";

const SignUp = (props) => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { first_name, last_name, email, password, password_confirmation } = data;
    const handleOnChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password_confirmation){
            console.log("Password don't match");
            props.onSetAlert('Password do not match', 'danger');
        }else{
            console.log('reducer will be here');
            const newUser = { first_name, last_name, email, password}
            props.onSignUp(newUser);
        }
    }

    return (
        <div className='wrapper'>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <FormGroupField
                    placeholder = 'First name'
                    name='first_name'
                    value={first_name}
                    onChange={ e=> handleOnChange(e) }
                    // required='required'
                />
                <FormGroupField
                    placeholder = 'Last name'
                    name='last_name'
                    value={last_name}
                    onChange={ e=> handleOnChange(e) }
                    // required='required'
                />
                <FormGroupField
                    placeholder = 'Email'
                    name='email'
                    value={email}
                    onChange={ e=> handleOnChange(e) }
                    // required='required'
                    subText= 'This site uses Gravatar so if you want a profile image, use a Gravatar email'
                />

                <FormGroupField
                    type='password'
                    placeholder = 'Password'
                    name='password'
                    value={password}
                    onChange={ e=> handleOnChange(e) }
                    // required='required'
                    // minLength = '6'
                    subText = 'Minimum length 6 characters'
                />
                <FormGroupField
                    type='password'
                    placeholder = 'Confirm Password'
                    name='password_confirmation'
                    value={password_confirmation}
                    onChange={ e=> handleOnChange(e) }
                    // required='required'
                    // minLength = '6'
                    subText= 'Minimum length 6 characters'
                />
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

SignUp.propTypes = {
    onSetAlert: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAlert: (msg,alertType) => dispatch(setAlert(msg,alertType)),
        onSignUp:(newUser) => dispatch(signUp(newUser))
    }
}

export default connect(null, mapDispatchToProps )(SignUp);