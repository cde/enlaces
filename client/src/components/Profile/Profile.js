import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner/Spinner';
import { getProfileByUserId } from "../../store/actions/profile";

const Profile = ({ match, getProfileByUserId, profile: { profile, loading } , auth }) => {
    useEffect(()=> {
        getProfileByUserId(match.params.id)
    },[getProfileByUserId, match.params.id])
    return (
        <Fragment>
            { profile === null || loading ?( <Spinner/> ): (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    { auth.isAuthenticated && auth.loading == false && auth.user.id === profile.user.id &&
                        (<Link to='/edit-profile' className='btn btn-dark'> Edit Profile</Link>)
                    }
                </Fragment>
                )}
        </Fragment>
    );
}

Profile.propsType = {
    getProfileByUserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByUserId })(Profile);