import {
  REMOVE_FROM_LIST,
  UPDATE_LIST,
  LIST_ERROR,
  GET_LIST,
  GET_LISTS
} from '../actions/types';

const initialState = {
  lists: [],
  list: null,
  listsLoading: true,
  error: {}
};

function listsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_LIST:
      return {
        ...state,
        list: payload,
        listsLoading: false
      };
    case REMOVE_FROM_LIST:
      return {
        ...state,
        list: {
          ...state.lists.listId,
          movies: state.list.movies.filter(
            (movie) => movie.movieId !== payload.movieId
          )
        },
        listsLoading: false
      };
    case GET_LISTS:
      return {
        ...state,
        lists: payload,
        listsLoading: false
      };
    case GET_LIST:
      return {
        ...state,
        list: payload,
        listsLoading: false
      };
    case LIST_ERROR:
      return {
        ...state,
        listsLoading: false,
        lists: [],
        error: payload
      };
    default:
      return state;
  }
}

export default listsReducer;
