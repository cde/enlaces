import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../store/actions/profile';

const Profiles = ( { getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return(
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className='large text-primary'>Profiles</h1>
                <p className='lead' >
                    <i className="fas fa-project-diagram">Browse an connect</i>
                </p>
                <div classNames='profiles'>
                    { profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                        ) : <h4>No profiles found ...</h4> }
                </div>
            </Fragment> }
        </Fragment>
    )
};

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, { getProfiles} )(Profiles);