import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import moment from 'moment';

const Education = ( { education: { school, degree, field_of_study, from, to, description }}) => (
    <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
            {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
        </p>
        <p>
            <strong>Degree: </strong> {degree}
        </p>
        <p>
            <strong>Field Of Study: </strong> {field_of_study}
        </p>
        { description &&  <p>
            <strong>Description: </strong> {description}
        </p>}

    </div>
)
Education.propTypes = {
    education: PropTypes.object.isRequired
};

export default Education;