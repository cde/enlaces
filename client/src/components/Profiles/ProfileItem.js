import React from "react";
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: {_id, first_name, last_name, avatar },
        current_position,
        headline,
        skills,
        company,
        location

    }
}) => {
    const fullName = `${first_name} ${last_name}`
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img'/>
            <div>
                <h2>{fullName} </h2>
                <p>{headline}</p>
                <p>{current_position} {company && <span>at {company}</span>}</p>
                <p>{location}</p>
                <Link to={`/profile/${_id}`} > View Profile</Link>
            </div>
            <ul>
                { skills.map((skill, index)=> (
                    <li key={index} className='text-primary'>
                        <i className="fas fa-check"></i>
                        {skill}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileItem;