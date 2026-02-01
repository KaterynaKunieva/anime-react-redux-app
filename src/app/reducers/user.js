import {
  RECEIVE_USER,
  REQUEST_USER,
  ERROR_RECEIVE_USER,
  REQUEST_SIGN_OUT,
} from '../constants/actionTypes';

const initialState = {
  id: '',
  email: '',
  firstName: '',
  isAuthorized: false,
  isFetchingUser: false,
  errors: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isFetchingUser: true,
      };

    case RECEIVE_USER: {
      const user = action.payload;
      return {
        ...state,
        isAuthorized: true,
        isFetchingUser: false,
        id: user.id || user.sub || state.id,
        email: user.email || state.email,
        firstName: user.name || user.firstName || state.firstName,
        errors: [],
      };
    }

    case ERROR_RECEIVE_USER:
    case REQUEST_SIGN_OUT:
      return initialState;

    default:
      return state;
  }
}