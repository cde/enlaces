import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile} from "../../store/actions/profile";
import Spinner from '../Layout/Spinner/Spinner';
import DashboardLinks from "./DashboardLinks";

const Dashboard = ( { getCurrentProfile, auth: { user }, profile: { profile, loading} }) => {
    const fullName = user ? `${user.first_name} ${user.last_name}` : ''

    useEffect(() => {
        getCurrentProfile();
    },[getCurrentProfile]);

    let content = ''
    if (profile === null) {
        content = (
            <div>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
            </div>
        )
    }else{
        content = <DashboardLinks />
    }

    return loading && profile === null ? (
        <Spinner />
        ) : (
            <Fragment>
                <p className="lead"><i className="fas fa-user"></i> Welcome { fullName }</p>
                { content }
            </Fragment>

    )
}

Dashboard.propTyes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile } )(Dashboard);