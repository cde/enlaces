import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from "react-moment";
import moment from 'moment';
import { deleteExperienceOrEducation } from '../../store/actions/profile';

const ExperienceList = ({ experience, deleteExperienceOrEducation  }) => {
    console.log(experience)
    const experienceRows = experience.map(exp => (
        <tr key={exp._id} >
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
                {exp.to === null ? (' Now') : (
                    <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
                )}
            </td>
            <td>
                <button
                    className='btn btn-danger'
                    onClick={()=>deleteExperienceOrEducation(exp._id) }
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </td>
        </tr>

    ))
    return (
        <div>
            <h2>Experiences</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className=' hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experienceRows}
                </tbody>
            </table>
        </div>
    );
}
ExperienceList.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func
}

export default connect(null, { deleteExperienceOrEducation } )(ExperienceList);