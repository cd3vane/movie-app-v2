import {
  CLEAR_MOVIES,
  GET_MOVIES,
  GET_MOVIE,
  MOVIE_ERROR
} from '../actions/types';

const initialState = {
  movie: null,
  movies: [],
  movieLoading: true,
  error: {}
};

function movieReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: payload,
        movieLoading: false
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
        movieLoading: false
      };
    case MOVIE_ERROR:
      return {
        ...state,
        movie: null,
        error: payload,
        movieLoading: false
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movie: null,
        movies: [],
        movieLoading: false
      };
    default:
      return state;
  }
}

export default movieReducer;
