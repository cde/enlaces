import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner/Spinner';
import { getProfileByUserId } from "../../store/actions/profile";
import About from "./About";
import ProfileTop from "./ProfileTop";
import Experience from "./Experience";
import Education from "./Education";
import GithubRepos from "./GithubRepos";

const Profile = ({ match, getProfileByUserId, profile: { profile, loading } , auth }) => {
    useEffect(()=> {
        getProfileByUserId(match.params.id)
    },[getProfileByUserId, match.params.id]);
    return (
        <Fragment>
            { profile === null || loading ?( <Spinner/> ): (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    { auth.isAuthenticated && auth.loading === false && auth.user.id === profile.user.id &&
                        (<Link to='/edit-profile' className='btn btn-dark'> Edit Profile</Link>)
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <About profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            { profile.experience.length > 0 ? (
                                <Fragment>
                                    { profile.experience.map(exp=> <Experience key={exp._id} experience={exp} />)}
                                </Fragment>
                            ) : (<h4>No experience found</h4>)}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            { profile.education.length > 0 ? (
                                <Fragment>
                                    { profile.education.map(edu=> <Education key={edu._id} experience={edu} />)}
                                </Fragment>
                            ) : (<h4>No education found</h4>)}
                        </div>
                        { profile.github_username && <GithubRepos username={profile.github_username} /> }
                    </div>
                </Fragment>)
            }

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