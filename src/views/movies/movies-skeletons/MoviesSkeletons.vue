<template>
  <div :class="$style.moviesSkeletons">
    <div :class="$style.movieCard__skeleton" v-for="n in size">
      <div :class="$style.movieCard__skeleton__poster">
        <div :class="$style['movieCard__skeleton__poster-img']"></div>
      </div>
      <div :class="$style.movieCard__skeleton__details">
        <div :class="$style.movieCard__skeleton__content">
          <span :class="$style.movieCard__skeleton__title"></span>
          <div :class="$style.movieCard__skeleton__overview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviesSkeletons',
  props: {
    size: {
      type: Number,
      required: true
    }
  }
};
</script>

<style module lang="scss">
@import './movies-skeletons.scss';
</style>
