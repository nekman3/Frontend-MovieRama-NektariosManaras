<template>
  <header>
    <h3 :class="$style['movieRecommendations__label']">Recommendations</h3>
  </header>
  <div :class="$style['movieRecommendations--scroll']" v-if="similarMovies.length > 0">
    <div :class="$style['movieRecommendations__poster']" v-for="similar in similarMovies">
      <img
        :class="$style['movieRecommendations__poster-img']"
        :src="`https://image.tmdb.org/t/p/original${similar?.poster}`"
        alt="poster"
        loading="lazy"
      />
    </div>
  </div>
  <div v-else :class="$style['movieRecommendations__empty']">No Recommendations to display</div>
</template>

<script>
export default {
  name: 'MovieRecommendations',
  props: {
    similarMovies: {
      type: Array,
      required: true
    }
  }
};
</script>

<style module lang="scss">
@import './movie-recommendations.scss';
</style>
