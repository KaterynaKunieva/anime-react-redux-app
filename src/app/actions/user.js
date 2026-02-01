import axios from 'misc/requests';
import config from "../../config";
import {
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
} from '../constants/actionTypes';

const MOCK_USER_RESPONSE = {
  email: 'mock-user@gmail.com',
  name: 'Mock Google User (Offline Mode)',
};

const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const getProfile = () => {
  const {
    USERS_SERVICE,
  } = config;
  return axios.get(`${USERS_SERVICE}/api/profile`);
}

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getProfile()
    .then(user => {
      dispatch(receiveUser(user));
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch(fetchSignOut());
        return;
      }
      dispatch(receiveUser(MOCK_USER_RESPONSE));
    });
};

const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
};

const exportFunctions = {
  fetchSignOut,
  fetchUser,
};

export default exportFunctions;