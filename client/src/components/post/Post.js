import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <Fragment>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/posts' class='btn'>
            Back To Posts
          </Link>
          <div class='post bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${post.user}`}>
                <img class='round-img' src={post.avatar} alt='' />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p class='my-1'>{post.text}</p>
              <p class='post-date'>
                Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
              </p>
            </div>
          </div>
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))
            ) : (
              <h4>No comments found, start a discussion now!</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
