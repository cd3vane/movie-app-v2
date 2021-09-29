import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  profileLoading: true,
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
        profileLoading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        profileLoading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        error: payload,
        profileLoading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        profileLoading: false
      };
    default:
      return state;
  }
}

export default profileReducer;
