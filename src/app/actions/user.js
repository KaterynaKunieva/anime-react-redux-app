import axios from 'misc/requests';
import config from "../../config";
import storage from '../../misc/storage';
import {
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
} from '../constants/actionTypes';

const MOCK_USER_RESPONSE = {
  email: 'mock-user@gmail.com',
  name: 'Mock Google User (Offline Mode)',
};

const MOCK_LOGOUT_RESPONSE = {
  email: '',
  name: '',
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

const postSignOut = () => {
  const { USERS_SERVICE } = config;
  return axios.post(`${USERS_SERVICE}/api/signout`);
};

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getProfile()
    .then(data => {
      dispatch(receiveUser(data));
    })
    .catch((err) => {
      if (err.status === 401) {
        dispatch(fetchSignOut());
        return;
      }
      dispatch(receiveUser(MOCK_USER_RESPONSE));
    });
};

const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return postSignOut()
    .catch(() => {
      dispatch(receiveUser(MOCK_LOGOUT_RESPONSE));
    })
    .finally(() => {
      window.location.href = '/';
    });
};

const exportFunctions = {
  fetchSignOut,
  fetchUser,
};

export default exportFunctions;