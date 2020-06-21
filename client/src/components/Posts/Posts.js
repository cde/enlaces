import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../store/actions/post';
import PostItem from './PostItem';
import Spinner from '../Layout/Spinner/Spinner'

const Posts = ({getPosts, post: { posts, loading }}) => {
    useEffect(()=> {
        getPosts();
    },[getPosts])
    return( loading ?
            ( <Spinner /> ) : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <div className='posts'>
                {  posts.map(post => (<PostItem key={post._id} post={post} />))}
            </div>
        </Fragment>
            )


     )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array
}
const mapStatetoProps = state => ({
    post: state.post
})
export default connect(mapStatetoProps, { getPosts } )(Posts);