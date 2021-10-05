import { api, movieApi } from '../utils/api';
import { setAlert } from './alert';
import {
  UPDATE_LIST,
  REMOVE_FROM_LIST,
  LIST_ERROR,
  GET_LISTS,
  GET_LIST,
  DELETE_LIST
} from './types';

// Get current lists
export const getListsByUser = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/lists/user/${userId}`);

    dispatch({
      type: GET_LISTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get list by Id
export const getListById = (listId) => async (dispatch) => {
  try {
    const res = await api.get(`/lists/list/${listId}`);

    dispatch({
      type: GET_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Movie to list
export const addToList = (listId, movieId) => async (dispatch) => {
  try {
    console.log('getting movie from api');
    const config = {
      baseURL: `https://api.themoviedb.org/3/movie/${movieId}?api_key=845024cb2f20a2bbaba2bd37eddadafc`
    };

    const movie = await movieApi.get('', config);
    const body = {
      title: movie.data.title,
      movieId: movie.data.id,
      poster_path: movie.data.poster_path
    };

    const res = await api.put(`/lists/list/${listId}`, body);

    dispatch({
      type: UPDATE_LIST,
      payload: { listId, movie: res.data }
    });

    dispatch(setAlert('Movie Added to list'));
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
};

// Add Movie to list
export const addList = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/lists', formData);

    dispatch({
      type: UPDATE_LIST,
      payload: res.data
    });

    dispatch(setAlert('List created'));
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
};

// Remove entire list
export const removeList = (listId) => async (dispatch) => {
  try {
    await api.delete(`/lists/${listId}`);

    dispatch({
      type: DELETE_LIST
    });

    dispatch(setAlert('Deleted list'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove movie from list
export const removeFromList = (listId, movieId) => async (dispatch) => {
  try {
    const res = await api.get(`/lists/list/${listId}`);
    dispatch({
      type: GET_LIST,
      payload: res.data
    });

    await api.delete(`/lists/list/${listId}/${movieId}`);
    dispatch({
      type: REMOVE_FROM_LIST,
      payload: movieId
    });

    dispatch(setAlert('Removed this movie from list'));
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
};
