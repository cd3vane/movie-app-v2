import { api, movieApi } from '../utils/api';
import { setAlert } from './alert';
import {
  UPDATE_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  MOVIE_ERROR,
  GET_MOVIE_STATS
} from './types';

// Get current movie stats
export const getCurrentMovieStats = () => async (dispatch) => {
  try {
    const res = await api.get('/movie');

    dispatch({
      type: GET_MOVIE_STATS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Movie to Watchlist
export const addToWatchlist = (movieId, history) => async (dispatch) => {
  try {
    const config = {
      baseURL: `https://api.themoviedb.org/3/movie/${movieId}?api_key=845024cb2f20a2bbaba2bd37eddadafc`
    };
    const movie = await movieApi.get('', config);

    const res = await api.put('/movie/watchlist', movie.data);

    dispatch({
      type: UPDATE_WATCHLIST,
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
export const removeFromWatchlist = (movieId, history) => async (dispatch) => {
  try {
    await api.delete(`/movie/watchlist/${movieId}`);

    dispatch({
      type: REMOVE_FROM_WATCHLIST
    });

    history.push('/account/dashboard');
    dispatch(setAlert('Removed from Watchlist'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
