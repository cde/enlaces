import React from 'react';

const FormGroupField = (props) => {
    const { className, placeholder, name, value, required, minLength } = props
    let type = props.type ? props.type  : 'text';
    let subText = null;
    if(props.subText){
        subText = (
            <small className="form-text">
                { props.subText }
        </small>)
    }
    let icons = null;
    if(props.iconClassName){
        icons = ( <i className={props.iconClassName}></i>)
    }
    return (
        <div className={`form-group ${className}`}>
            {/*<label>From</label>*/}
            {icons}
            <input
                type={type}
                placeholder={placeholder}
                name= {name}
                value={value}
                onChange={ props.onChange }
                required = {required}
                minLength={minLength}
            /> { " " }
            {  props.text }
            { subText }
        </div>
    )
}

export default FormGroupField;