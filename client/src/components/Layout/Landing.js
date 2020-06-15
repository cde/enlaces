import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Landing = ( { isAuthenticated }) => {
    console.log('isAuthenticated ', isAuthenticated);
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Enlaces</h1>
                    <p className="lead">
                        Create a Professional profile/portfolio, share posts and get help from
                        other people
                    </p>
                    <div className="buttons">
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);
