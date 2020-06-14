import React, {Fragment, useState} from 'react';
import FormGroupField from "../Form/FormGroupField";
import {Link} from "react-router-dom";

const SignIn = () => {
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
        console.log('reducer will be here');
    }

    return (
        <Fragment>
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
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Don't you have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default SignIn;