import { movieApi } from '../utils/api';
import { CLEAR_MOVIES, GET_MOVIES, GET_MOVIE, MOVIE_ERROR } from './types';

// Get all profiles
export const getPopularMovies = (pageNumber) => async (dispatch) => {
  dispatch({ type: CLEAR_MOVIES });
  try {
    const config = {
      baseURL:
        'https://api.themoviedb.org/3/movie/popular?api_key=845024cb2f20a2bbaba2bd37eddadafc&language=en-US&page=' +
        `${pageNumber}`
    };

    const res = await movieApi.get('', config);

    dispatch({
      type: GET_MOVIES,
      payload: res.data.results
    });
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by id
export const getMovieById = (id) => async (dispatch) => {
  try {
    const config = {
      baseURL: `https://api.themoviedb.org/3/movie/${id}?api_key=845024cb2f20a2bbaba2bd37eddadafc`
    };
    const res = await movieApi.get('', config);

    dispatch({
      type: GET_MOVIE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
