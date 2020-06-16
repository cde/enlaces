import React, {Fragment} from 'react';
import FormGroupField from "../Form/FormGroupField";

const SocialLinks = (props) => {
    return (
        <Fragment>
            <FormGroupField
                className='social-input'
                placeholder = 'Twitter URL'
                name='twitter'
                value={twitter}
                onChange={ e=> props.handleOnChange(e) }
                iconClassName = 'fab fa-twitter fa-2x'
            />

            <FormGroupField
                className='social-input'
                placeholder = 'Facebook URL'
                name='facebook'
                value={facebook}
                onChange={ e=> handleOnChange(e) }
                iconClassName = 'fab fa-facebook fa-2x'
            />

            <FormGroupField
                className='social-input'
                placeholder = 'YouTube URL'
                name='youtube'
                value={youtube}
                onChange={ e=> handleOnChange(e) }
                iconClassName = 'fab fa-youtube fa-2x'
            />

            <FormGroupField
                className='social-input'
                placeholder = 'Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={ e=> handleOnChange(e) }
                iconClassName = 'fab fa-linkedin fa-2x'
            />

            <FormGroupField
                className='social-input'
                placeholder = 'Instagram URL'
                name='instagram'
                value={instagram}
                onChange={ e=> handleOnChange(e) }
                iconClassName = 'fab fa-instagram fa-2x'
            />

        </Fragment>
    )
}

export default SocialLinks;