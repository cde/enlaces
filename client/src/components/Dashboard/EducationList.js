import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import moment from 'moment';

const EducationList = ({ education }) => {
    const educationRows = education.map(edu => (
        <tr key={edu._id} >
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> - {' '}
                {edu.to === null ? (
                    ' Now'
                ) : (
                    <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
                )}
            </td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>

    ))
    return (
        <div>
            <h2>Education</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className=' hide-sm'>Years</th>
                </tr>
                </thead>
                <tbody>
                { educationRows }
                </tbody>
            </table>
        </div>
    )
}
EducationList.propTypes = {
    education: PropTypes.array.isRequired
}

export default EducationList;