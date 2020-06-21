import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut} from "../../store/actions/auth";
import PropTypes from 'prop-types';

const Navbar = (props) => {
    const { signOut, auth } = props

    const userLinks = (
        <ul>
            <li><Link to="/profiles">Profiles</Link></li>
            <li>
                <Link to="/dashboard">
                    <i className='fas fa-user'></i> {' '}
                    <span className='hide-sm'> Dashboard </span>
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    <i className='fas fa-user'></i> {' '}
                    <span className='hide-sm'> Posts </span>
                </Link>
            </li>
            <li>
                <Link to='#!' onClick={signOut}>
                    <i className='fas fa-sign-out-alt'></i> {' '}
                    <span className='hide-sm'> Sign Out </span>
                </Link>
            </li>
        </ul>
    )

    const guessLinks = (
        <ul>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-link"></i> Enlaces</Link>
            </h1>
            { !auth.loading &&
                <Fragment>
                    {auth.isAuthenticated ? userLinks : guessLinks }
                </Fragment>
            }
        </nav>
    )
}
Navbar.propTypes = {
    signOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { signOut } )(Navbar);
