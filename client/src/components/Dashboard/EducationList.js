import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from "react-moment";
import moment from 'moment';
import { deleteExperienceOrEducation } from '../../store/actions/profile';
import {Link} from "react-router-dom";

const EducationList = ({ education, deleteExperienceOrEducation }) => {
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
                <Link
                    className='btn btn-danger'
                    onClick={()=>deleteExperienceOrEducation(edu._id) }
                >
                    <i className="far fa-trash-alt"></i>
                </Link>
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
    education: PropTypes.array.isRequired,
    deleteExperienceOrEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteExperienceOrEducation })(EducationList);