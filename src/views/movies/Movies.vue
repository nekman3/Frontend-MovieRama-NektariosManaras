<template>
  <main>
    <div :class="$style.movies" v-if="!moviesStore.isLoading && !hasNoMovies">
      <MovieCard v-for="(movie, index) in moviesStore.movies" :movie="movie" :index="index" />
    </div>
    <MoviesSkeletons v-else-if="moviesStore.isLoading" :size="10" />
    <div v-else-if="hasNoMovies">No movies found</div>
    <div v-show="!hasNoMovies" class="showMore">
      <MoviesSkeletons :size="2" />
    </div>
  </main>
</template>

<script>
import MovieCard from '../../components/shared/movie-card/MovieCard.vue';
import { useMoviesDataStore } from '../../stores/movies-data';
import MoviesSkeletons from '../movies/movies-skeletons/MoviesSkeletons.vue';
import { isNil } from '../../helpers/utils';

export default {
  name: 'Movies',

  components: {
    MovieCard,
    MoviesSkeletons
  },

  setup() {
    const moviesStore = useMoviesDataStore();
    return { moviesStore };
  },

  async created() {
    this.moviesStore.isLoading = true;
    await this.moviesStore.fetchGenres();
    this.moviesStore.movies = await this.moviesStore.fetchMovies(this.moviesStore.page);
  },

  mounted() {
    this.observePageBottom();
  },

  methods: {
    async loadMoreMovies(entries) {
      if (entries[0].intersectionRatio <= 0 || entries[0].intersectionRatio === 1) {
        return;
      }

      this.moviesStore.page += 1;
      if (this.moviesStore.searchText === '') {
        // Fetch now playing movies

        const updatedMovieList = await this.moviesStore.fetchMovies();
        this.moviesStore.movies = [...this.moviesStore.movies, ...updatedMovieList];
      } else {
        // Fetch searched movies
        this.moviesStore.searchMovies(this.moviesStore.searchText);
      }
    },

    // Observe page bottom in order to load/fetch more movies
    observePageBottom() {
      const moviesElement = document.querySelector('.showMore');
      if (!isNil(moviesElement)) {
        const intersectionObserver = new IntersectionObserver((entries) => {
          this.loadMoreMovies(entries);
        });
        // observe element
        intersectionObserver.observe(moviesElement);
      }
    }
  },

  computed: {
    hasNoMovies() {
      return this.moviesStore.searchText !== '' && this.moviesStore.movies.length === 0
        ? true
        : false;
    }
  }
};
</script>

<style module lang="scss">
@import './movies.scss';
</style>
