import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const About = ({profile: {bio,skills,user: { first_name, last_name }}}) => (
    <div className='profile-about bg-light p-2'>
        { bio && (
            <Fragment>
                <h2 className='text-primary'>{first_name}'s bio</h2>
                <p>{bio}</p>
                <div className='line' />
            </Fragment>
        )}
        <h2 className='text-primary'>Skill Set</h2>
        <div className='skills'>
            {skills.map((skill, index) => (
                <div key={index} className='p-1'>
                    <i className='fas fa-check' /> {skill}
                </div>
            ))}
        </div>
    </div>
);

About.propTypes = {
    profile: PropTypes.object.isRequired
};

export default About;
