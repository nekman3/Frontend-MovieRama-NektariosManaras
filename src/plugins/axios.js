import axios from 'axios';

const $axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

const axiosPlugin = {
  install(app) {
    app.config.globalProperties.$axios = $axios;
  }
};

export { $axios };
export default axiosPlugin;
