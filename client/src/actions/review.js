import { api } from '../utils/api';
import { setAlert } from './alert';
import {
  GET_REVIEWS,
  REVIEW_ERROR,
  UPDATE_LIKES,
  DELETE_REVIEW,
  ADD_REVIEW,
  GET_REVIEW,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types';

// Get reviews by user
export const getReviesByUser = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/user/${userId}`);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get reviews by user
export const getReviewsByMovie = (movieId) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/movie/${movieId}`);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/reviews/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete review
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: id
    });

    dispatch(setAlert('Review Removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add review
export const addReview = (movieId, formData, history) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/${movieId}`, formData);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data
    });

    history.push(`/movie-details/${movieId}`);
    dispatch(setAlert('Review Created', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getReview = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/${id}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (reviewId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/comment/${reviewId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (reviewId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/reviews/comment/${reviewsId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
