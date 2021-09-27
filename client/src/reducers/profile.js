import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_WATCHLIST,
  REMOVE_FROM_WATCHLIST
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case UPDATE_WATCHLIST:
      let watchlist = [...state.profile.watchlist];
      watchlist.push(payload);
      return {
        ...state,
        profile: { watchlist }
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        profile: {
          watchlist: state.profile.watchlist.filter(
            (movie) => movie.id !== payload
          )
        },
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}

export default profileReducer;
