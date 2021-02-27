import Axios from 'axios';
// import store from './index';
// store.commit('login/setToken', localStorage.getItem('token'));

const baseURL = process.env.VUE_APP_BASE_URL;

const request = () => {
  const req = Axios.create({
    baseURL,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  req.interceptors.response.use(
    (r) => r,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {}
      return Promise.reject(error);
    },
  );

  return req;
};

export default request;
