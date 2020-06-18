import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from "../../store/actions/profile";
import Spinner from '../Layout/Spinner/Spinner';
import DashboardLinks from "./DashboardLinks";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";

const Dashboard = ({ getCurrentProfile,
                       deleteAccount,
                       auth: { user },
                       profile: { profile, loading} }) => {

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
        content = (
            <Fragment>
                <DashboardLinks />
                { profile.experience && profile.experience.length > 0 && <ExperienceList experience={profile.experience}/>}
                { profile.education && profile.education.length > 0 && <EducationList education={profile.education}/> }
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus" /> Delete My Account
                    </button>
                </div>
            </Fragment>
            )
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
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount } )(Dashboard);