import React, {Fragment,  useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormGroupField from "../Form/FormGroupField";
import { updateEducation }  from '../../store/actions/profile';

const UpdateEducation = ({updateEducation, history}) => {
    const [educationData, setEducationData] = useState({
        school: '',
        degree: '',
        field_of_study: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const {
        school,
        degree,
        field_of_study,
        from,
        to,
        current,
        description
    } = educationData;

    const [toDateDisabled, toggleDisabled] = useState(false);

    const handleOnclick = (e) => {
        setEducationData({...educationData, [e.target.name]: e.target.value })
    }
    const onSubmit =(e) => {
        e.preventDefault();
        updateEducation(educationData,history);
    }
    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, online classes, bootcamp etc that you have attended
            </p>
            <small>* = required field</small>
            <form onSubmit={(e) => onSubmit(e)} className="form">
                <FormGroupField
                    placeholder="* School or Classes"
                    name="school"
                    value={school}
                    onChange={(e) => handleOnclick(e)}
                    required='required'
                />
                <FormGroupField
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={degree}
                    onChange={(e) => handleOnclick(e)}
                    required='required'
                />
                <FormGroupField
                    placeholder="Field Of Study"
                    name="field_of_study"
                    value={field_of_study}
                    onChange={(e) => handleOnclick(e)}
                />

                <FormGroupField
                    type='date'
                    name="from"
                    value={from}
                    onChange={(e) => handleOnclick(e)}
                    subText='From Date'
                />

                <FormGroupField
                    type='checkbox'
                    name="current"
                    value={current}
                    onChange={(e) =>{
                        setEducationData({...educationData, current: !current});
                        toggleDisabled(!toDateDisabled);
                    }}
                    text='Current School or Classes'
                    subText='From Date'
                />
                {!toDateDisabled &&
                    <FormGroupField
                        type='date'
                        name="to"
                        value={to}
                        onChange={(e) => handleOnclick(e)}
                        disable={toDateDisabled ? 'disabled' : null}
                        subText='To Date'
                    />
                }


                <div className="form-group">
                  <textarea
                      placeholder="Program Description"
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
UpdateEducation.propTypes = {
    updateEducation: PropTypes.func.isRequired
}

export default connect(null,  { updateEducation } )(UpdateEducation);
