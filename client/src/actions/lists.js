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
export const getCurrentLists = (userId) => async (dispatch) => {
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

// Add Movie to Watchlist
export const addToList = (listId, movieId, history) => async (dispatch) => {
  try {
    const config = {
      baseURL: `https://api.themoviedb.org/3/movie/${movieId}?api_key=845024cb2f20a2bbaba2bd37eddadafc`
    };
    const movie = await movieApi.get('', config);

    const res = await api.put('/movie/watchlist', movie.data);

    dispatch({
      type: UPDATE_LIST,
      payload: res.data
    });

    history.push(`/movies/1`);
    dispatch(setAlert('Movie Added to Watchlist'));
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

// Remove movie from watchlist
export const removeFromList =
  (listId, movieId, history) => async (dispatch) => {
    try {
      await api.delete(`/movie/watchlist/${movieId}`);

      dispatch({
        type: REMOVE_FROM_LIST
      });

      history.push('/account/dashboard');
      dispatch(setAlert('Removed from Watchlist'));
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
