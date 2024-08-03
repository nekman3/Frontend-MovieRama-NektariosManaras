<template>
  <div :class="[$style.movieCard, extraClass]" @click="toggleMovieCard">
    <div :class="$style.movieCard__poster">
      <img
        :class="$style['movieCard__poster-img']"
        :src="`https://image.tmdb.org/t/p/original${movie.poster}`"
        alt="poster"
        loading="lazy"
      />
    </div>
    <section :class="$style.movieCard__details">
      <article :class="$style.movieCard__content">
        <header>
          <h3 :class="$style.movieCard__title">{{ movie.title }} ({{ movie.releaseDate }})</h3>
        </header>
        <div :class="$style.movieCard__overview">{{ movie.overview }}</div>
      </article>
      <footer :class="$style.movieCard__footer">
        <span :class="$style['movieCard__footer-left']">{{ movie.genres }}</span>
        <div :class="$style['movieCard__footer-right']">Rating: {{ movie.voteAverage }}</div>
      </footer>
    </section>
  </div>

  <MovieCardPanel
    :isDisplayed="isPanelDisplayed"
    :movieIndex="index"
    :movie="movie"
  ></MovieCardPanel>
</template>

<script>
import MovieCardPanel from '../movie-card-panel/MovieCardPanel.vue';
import { useMoviesDataStore } from '../../../stores/movies-data';

export default {
  name: 'MovieCard',
  components: {
    MovieCardPanel
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  setup() {
    const moviesStore = useMoviesDataStore();
    return { moviesStore };
  },

  data() {
    return {
      isPanelDisplayed: false
    };
  },

  methods: {
    toggleMovieCard() {
      return (this.isPanelDisplayed = !this.isPanelDisplayed);
    }
  },

  computed: {
    extraClass() {
      return this.isPanelDisplayed ? this.$style['movieCard--active'] : null;
    }
  }
};
</script>

<style module lang="scss">
@import './movie-card.scss';
</style>
