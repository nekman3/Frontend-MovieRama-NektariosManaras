import { defineStore } from 'pinia';
import {
  fetchMovieList,
  fetchGenreList,
  searchMovieList,
  fetchMovieReviewList,
  fetchMovieVideoList,
  fetchSimilarMovieList
} from '../shared/api/api-service';
import {
  adaptMovieList,
  adaptReviewList,
  adaptMovieVideos,
  adaptSimilarMovies
} from '../shared/adapters/moviesDataAdapter';

const STATUS = {
  SUCCESS: 200
};

export const useMoviesDataStore = defineStore('movies-store', {
  state: () => ({
    genres: [],
    movies: [],
    searchText: '',
    isLoading: false,
    isLoadingPanel: false,
    page: 1
  }),
  getters: {},
  actions: {
    async fetchGenres() {
      this.isLoading = true;
      const { data } = await fetchGenreList();
      this.genres = data?.genres;
    },

    async fetchMovies() {
      const { status, data } = await fetchMovieList(this.page);
      const adaptedData = adaptMovieList(data?.results, this.genres);
      if (status === STATUS.SUCCESS) {
        this.isLoading = false;
      }
      return adaptedData;
    },

    async searchMovies(searchText) {
      const { status, data } = await searchMovieList(searchText, this.page);
      if (this.page === 1) {
        this.movies = []; // When starting a search empty the now playing movie list to display the searched movies comming from different endpoint
      }
      this.movies = [...this.movies, ...adaptMovieList(data?.results, this.genres)];
      if (status === STATUS.SUCCESS) {
        this.isLoading = false;
      }
    },

    async fetchMovieReviews(id) {
      this.isLoadingPanel = true;
      const { status, data } = await fetchMovieReviewList(id);
      const adaptedData = adaptReviewList(data?.results);
      return adaptedData;
    },

    async fetchMovieVideos(id) {
      const { status, data } = await fetchMovieVideoList(id);
      const adaptedData = adaptMovieVideos(data?.results);
      return adaptedData;
    },

    async fetchSimilarMovies(id) {
      const { status, data } = await fetchSimilarMovieList(id);
      const adaptedData = adaptSimilarMovies(data?.results);
      if (status === STATUS.SUCCESS) {
        this.isLoadingPanel = false;
      }
      return adaptedData;
    }
  }
});
