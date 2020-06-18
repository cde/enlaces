import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormGroupField from "../Form/FormGroupField";
import { updateExperience }  from '../../store/actions/profile';


const UpdateExperience = ({updateExperience, history}) => {
    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = experienceData;

    const handleOnclick = (e) => {
        setExperienceData({...experienceData, [e.target.name]: e.target.value })
    }
    const onSubmit =(e) => {
        console.log('Submit');
        e.preventDefault();
        updateExperience(experienceData, history);
    }
    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form onSubmit={(e) => onSubmit(e)} className="form">
                <FormGroupField
                    placeholder="* Title"
                    name="title"
                    value={title}
                    onChange={(e) => handleOnclick(e)}
                    required='required'
                />
                <FormGroupField
                    placeholder="* Company"
                    name="company"
                    value={company}
                    onChange={(e) => handleOnclick(e)}
                    required='required'
                />
                <FormGroupField
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={(e) => handleOnclick(e)}
                />

                <FormGroupField
                    type='date'
                    name="from"
                    value={from}
                    subText='From Date'
                    onChange={(e) => handleOnclick(e)}
                />

                <FormGroupField
                    type='checkbox'
                    name="current"
                    check={current}
                    value={current}
                    onChange={(e) =>{
                        setExperienceData({...experienceData, current: !current});
                        toggleDisabled(!toDateDisabled);
                    }}
                    text={' Current Position'}
                />
                {toDateDisabled ? null : (
                    <FormGroupField
                        type='date'
                        name="to"
                        value={to}
                        subText='To Date'
                        onChange={(e) => handleOnclick(e)}
                        disable={toDateDisabled ? 'disabled' : ''}
                    />) }


                <div className="form-group">
                  <textarea
                      placeholder="Job Description"
                      name="description"
                      cols="30"
                      rows="5"
                      value={description}
                      onChange={(e) => handleOnclick(e)}
                  />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
UpdateExperience.propTypes = {
    updateExperience: PropTypes.func.isRequired
}

export default connect(null,  { updateExperience } )(UpdateExperience);
