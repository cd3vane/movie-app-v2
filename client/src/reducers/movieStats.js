import {
  REMOVE_FROM_WATCHLIST,
  UPDATE_WATCHLIST,
  MOVIE_ERROR,
  GET_MOVIE_STATS
} from '../actions/types';

const initialState = {
  movieStats: [],
  loading: true,
  error: {}
};

function movieStatsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_WATCHLIST:
      let watchlist = [...state.movieStats.watchlist];
      watchlist.push(payload);
      return {
        ...state,
        movieStats: { watchlist }
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        movieStats: {
          watchlist: state.movieStats.watchlist.filter(
            (movie) => movie.id !== payload
          )
        },
        loading: false
      };
    case GET_MOVIE_STATS:
      return {
        ...state,
        movieStats: payload,
        loading: false
      };
    case MOVIE_ERROR:
      return {
        ...state,
        loading: false,
        movieStats: [],
        error: payload
      };
    default:
      return state;
  }
}

export default movieStatsReducer;
