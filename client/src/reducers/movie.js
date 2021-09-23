import {
  CLEAR_MOVIES,
  GET_MOVIES,
  GET_MOVIE,
  MOVIE_ERROR
} from '../actions/types';

const initialState = {
  movie: null,
  movies: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: payload,
        loading: false
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
        loading: false
      };
    case MOVIE_ERROR:
      return {
        ...state,
        movie: null,
        error: payload,
        loading: false
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movie: null,
        movies: [],
        loading: false
      };
    default:
      return state;
  }
}
