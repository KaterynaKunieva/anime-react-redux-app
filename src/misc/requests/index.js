import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

const addAxiosInterceptors = ({
  onSignOut,
}) => {
  axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const { status } = error.response || {};

      if (status === 401) {
        onSignOut();
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }

      return Promise.reject(error.response?.data || error);
    }
  );
};

export {
  addAxiosInterceptors,
};

export default axios;
