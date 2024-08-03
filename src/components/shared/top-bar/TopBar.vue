<template>
  <div :class="$style.topBar">
    <header>
      <h2 :class="$style.topBar__logo">MovieRama</h2>
    </header>
    <BaseInput placeholder="Search movies" v-model="moviesStore.searchText" />
  </div>
</template>

<script>
import { useMoviesDataStore } from '../../../stores/movies-data';
import { debounce } from '../../../helpers/debounce';
import { scrollToTop } from '../../../helpers/scroll';

export default {
  name: 'TopBar',
  setup() {
    const moviesStore = useMoviesDataStore();
    return { moviesStore };
  },

  created() {
    this.debouncedFetch = debounce(async (isFetchMovies, searchText, callback) => {
      if (isFetchMovies) {
        this.moviesStore.movies = await callback();
        this.moviesStore.isLoading = false;
        return;
      }
      await callback(searchText);
    }, 500);
  },

  mounted() {
    const searcInputEl = document.querySelector('.baseInput');
    searcInputEl.addEventListener('input', this.loadMoviesFromSearch);
  },

  beforeUnmount() {
    const searcInputEl = document.querySelector('.baseInput');
    searcInputEl.removeEventListener('input', this.loadMoviesFromSearch);
  },

  methods: {
    async loadMoviesFromSearch(e) {
      this.moviesStore.page = 1;
      this.moviesStore.isLoading = true;
      const searchText = e.target.value;
      if (searchText === '') {
        await this.debouncedFetch(true, searchText, this.moviesStore.fetchMovies);
      } else {
        await this.debouncedFetch(false, searchText, this.moviesStore.searchMovies);
      }
      scrollToTop(0, 'smooth');
    }
  }
};
</script>

<style module lang="scss">
@import './top-bar.scss';
</style>
