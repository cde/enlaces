import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLinks = () => {

    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/update-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> + Experience
            </Link>
            <Link to="/update-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> + Education
            </Link>
        </div>
    )
};

export default DashboardLinks;