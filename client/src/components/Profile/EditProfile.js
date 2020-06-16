import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createOrUpdateProfile, getCurrentProfile } from '../../store/actions/profile';

import FormGroupField from "../Form/FormGroupField";

const EditProfile = ({ profile: { profile, loading },
                         createOrUpdateProfile, getCurrentProfile, history } ) => {

    const [data, setData] = useState({
        current_position: '',
        skills: '',
        headline: '',
        company: '',
        location: '',
        website: '',
        bio: '',
        github_username: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        facebook: ''
    });

    const [displaySocialInputs, setSocialInputs] = useState(false);
    useEffect(() => {
        getCurrentProfile();
        setData({
            current_position: loading || !profile.current_position ? '' : profile.current_position,
            skills: loading || !profile.skills ? '' : profile.skills,
            headline: loading || !profile.headline ? '' : profile.headline,
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            github_username: loading || !profile.github_username ? '' : profile.github_username,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' :profile.social.twitter,
            facebook: loading || !profile.social ? '' :profile.social.facebook,
            linkedin: loading || !profile.social ? '' :profile.social.linkedin,
            youtube: loading || !profile.social ? '' :profile.social.youtube,
            instagram: loading || !profile.social ? '' :profile.social.instagram
        });
    },[loading]);

    const {
        current_position,
        skills,
        headline,
        company,
        location,
        website,
        bio,
        github_username,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
    } = data

    const handleOnChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const onSubmit =(e) => {
        console.log('Submit');
        e.preventDefault();
        createOrUpdateProfile(data, history, false);
    }
    return(
        <div >
            <p className="lead"><i className="fas fa-user"></i> Edit Your Profile</p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <FormGroupField
                    placeholder = '* Current Position'
                    name='current_position'
                    value={current_position}
                    onChange={ e=> handleOnChange(e) }
                    subText='Give us an idea of where you are at in your career'
                />
                <FormGroupField
                    placeholder = '* Skills'
                    name='skills'
                    value={skills}
                    onChange={ e=> handleOnChange(e) }
                    subText='Please use comma separated values (eg. Ruby, Go, Python, Javascript)'
                />
                <FormGroupField
                    placeholder = 'Your Headline'
                    name='headline'
                    value={headline}
                    onChange={ e=> handleOnChange(e) }
                    subText='How you introduce yourself'
                />
                <FormGroupField
                    placeholder = 'Company'
                    name='company'
                    value={company}
                    onChange={ e=> handleOnChange(e) }
                    subText='Could be your own company or one you work for'
                />
                <FormGroupField
                    placeholder = 'Website'
                    name='website'
                    value={website}
                    onChange={ e=> handleOnChange(e) }
                    subText='Could be your own or a company website'
                />
                <FormGroupField
                    placeholder = 'Location'
                    name='location'
                    value={location}
                    onChange={ e=> handleOnChange(e) }
                    subText='City & state suggested (eg. San Francisco, CA)'
                />


                <FormGroupField
                    placeholder = 'Github Username'
                    name='github_username'
                    value={github_username}
                    onChange={ e=> handleOnChange(e) }
                    iconClassName = 'fab fa-github fa-2x'
                    subText='If you want your latest repos and a Github link, include your username'
                />
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={ e=> handleOnChange(e) }>
                    </textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={ () => setSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                { displaySocialInputs &&
                <Fragment>
                    <FormGroupField
                        className='social-input'
                        placeholder = 'Twitter URL'
                        name='twitter'
                        value={twitter}
                        onChange={ e=> handleOnChange(e) }
                        iconClassName = 'fab fa-twitter fa-2x'
                    />

                    <FormGroupField
                        className='social-input'
                        placeholder = 'Facebook URL'
                        name='facebook'
                        value={facebook}
                        onChange={ e=> handleOnChange(e) }
                        iconClassName = 'fab fa-facebook fa-2x'
                    />

                    <FormGroupField
                        className='social-input'
                        placeholder = 'YouTube URL'
                        name='youtube'
                        value={youtube}
                        onChange={ e=> handleOnChange(e) }
                        iconClassName = 'fab fa-youtube fa-2x'
                    />

                    <FormGroupField
                        className='social-input'
                        placeholder = 'Linkedin URL'
                        name='linkedin'
                        value={linkedin}
                        onChange={ e=> handleOnChange(e) }
                        iconClassName = 'fab fa-linkedin fa-2x'
                    />

                    <FormGroupField
                        className='social-input'
                        placeholder = 'Instagram URL'
                        name='instagram'
                        value={instagram}
                        onChange={ e=> handleOnChange(e) }
                        iconClassName = 'fab fa-instagram fa-2x'
                    />

                </Fragment>
                }
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </div>
    )
}

EditProfile.propTyes = {
    createOrUpdateProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps,
    { createOrUpdateProfile, getCurrentProfile }
    )(withRouter(EditProfile));