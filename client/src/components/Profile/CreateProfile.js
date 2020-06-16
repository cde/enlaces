import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile} from '../../store/actions/profile';

import FormGroupField from "../Form/FormGroupField";

const CreateProfile = ({ createProfile, history } ) => {
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

    const [displaySocialInputs, setSocialInputs] = useState();

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
        createProfile(data, history);
    }
    return(
        <div >
            <p className="lead"><i className="fas fa-user"></i> Create Your Profile</p>
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
                    subText='Few words about you'
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
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin}/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram}/>
                        </div>
                    </Fragment>
                }
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </div>
    )
}

CreateProfile.propTyes = {
    createProfile: PropTypes.func.isRequired
}
export default connect(null, { createProfile })(withRouter(CreateProfile));