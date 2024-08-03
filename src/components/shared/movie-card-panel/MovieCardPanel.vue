<template>
  <div :class="[$style.movieCard__panel, extraClass]">
    <div v-show="!moviesStore.isLoadingPanel" :class="$style['movieCard__panel-details']">
      <div :class="$style['movieCard__panel-top']">
        <div :class="$style['movieCard__panel-top-left']">
          <MovieVideo
            :movieVideo="movieVideo"
            :isDisplayed="isDisplayed"
            :movieIndex="movieIndex"
          />
        </div>
        <section :class="$style['movieCard__panel-top-right']">
          <MovieReview
            v-for="(review, index) in reviews"
            :review="review"
            :reviewIndex="index"
            :movieIndex="movieIndex"
            v-if="reviews.length > 0"
          />
          <div :class="$style['movieCard__panel-top__empty']" v-else>No reviews to display</div>
        </section>
      </div>
      <footer :class="$style['movieCard__panel-bottom']">
        <MovieRecommendations :similarMovies="similarMovies" />
      </footer>
    </div>

    <MovieCardPanelSkeleton v-show="moviesStore.isLoadingPanel" />
  </div>
</template>

<script>
import { useMoviesDataStore } from '../../../stores/movies-data';
import MovieReview from '../movie-review/MovieReview.vue';
import MovieVideo from '../movie-video/MovieVideo.vue';
import MovieRecommendations from '../movie-recommendations/MovieRecommendations.vue';
import MovieCardPanelSkeleton from './movie-card-panel-skeleton/MovieCardPanelSkeleton.vue';

export default {
  name: 'MovieCardPanel',
  components: {
    MovieReview,
    MovieRecommendations,
    MovieVideo,
    MovieCardPanelSkeleton
  },
  props: {
    isDisplayed: {
      type: Boolean,
      required: true
    },
    movieIndex: {
      type: Number,
      required: true
    },
    movie: {
      type: Object,
      required: true
    }
  },
  setup() {
    const moviesStore = useMoviesDataStore();
    return { moviesStore };
  },
  data() {
    return {
      reviews: [],
      movieVideo: '',
      similarMovies: []
    };
  },

  watch: {
    isDisplayed(newVal) {
      const panelEl = document.getElementsByClassName('movieCard__panel')[this.movieIndex];
      if (newVal) {
        panelEl.style.height = '700px';
        panelEl.style.maxHeight = '700px';
        panelEl.style.border = '1px solid #d1d0d0';
        this.fetchPanelDetails();
      } else {
        panelEl.style.maxHeight = null;
        panelEl.style.border = 'none';
      }
    }
  },

  methods: {
    async fetchPanelDetails() {
      this.reviews = await this.moviesStore.fetchMovieReviews(this.movie.id);
      this.similarMovies = await this.moviesStore.fetchSimilarMovies(this.movie.id);
      this.movieVideo = await this.moviesStore.fetchMovieVideos(this.movie.id);
    }
  },
  computed: {
    extraClass() {
      return this.isDisplayed ? this.$style['movieCard__panel--open'] : null;
    }
  }
};
</script>

<style module lang="scss">
@import './movie-card-panel.scss';
</style>
