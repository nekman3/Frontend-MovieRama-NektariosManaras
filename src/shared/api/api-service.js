import { $axios } from '../../plugins/axios';
const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';

export const fetchGenreList = async () => {
  try {
    return await $axios.get('/genre/movie/list', {
      params: {
        api_key: API_KEY
      }
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchMovieList = async (page) => {
  try {
    return await $axios.get('/movie/now_playing', {
      params: {
        api_key: API_KEY,
        page
      }
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const searchMovieList = async (title, page) => {
  try {
    return await $axios.get('/search/movie', {
      params: {
        query: title,
        page,
        api_key: API_KEY
      }
    });
  } catch (error) {
    console.error('Error searching movie:', error);
    throw error;
  }
};

export const fetchMovieReviewList = async (id) => {
  try {
    return await $axios.get(`/movie/${id}/reviews`, {
      params: {
        api_key: API_KEY
      }
    });
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

export const fetchMovieVideoList = async (id) => {
  try {
    return await $axios.get(`/movie/${id}/videos`, {
      params: {
        api_key: API_KEY
      }
    });
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};

export const fetchSimilarMovieList = async (id) => {
  try {
    return await $axios.get(`/movie/${id}/similar`, {
      params: {
        api_key: API_KEY
      }
    });
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};
