import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
  const expected = error.response && error.response.status >= 400 && error.response.status < 500;
  if(!expected) {
    // Log exception using somthing like sentry.io
    alert('An unexpected error occurred.');
  }

  return Promise.reject(error);
})

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete
};