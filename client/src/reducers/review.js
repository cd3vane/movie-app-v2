import {
  ADD_REVIEW,
  DELETE_REVIEW,
  GET_REVIEW,
  GET_REVIEWS,
  REVIEW_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
  error: {}
};

function reviewReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [payload, ...state.reviews],
        loading: false
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false
      };
    case GET_REVIEW:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === payload.id
            ? { ...review, likes: payload.likes }
            : review
        ),
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review._id !== payload),
        loading: false
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        review: { ...state.review, comments: payload },
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        review: {
          ...state.review,
          comments: state.review.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default reviewReducer;
