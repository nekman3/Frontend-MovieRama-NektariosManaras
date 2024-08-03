<template>
  <div :class="$style.movieCard__panel__skeleton">
    <div :class="$style['movieCard__panel__skeleton-top']">
      <div :class="$style['movieCard__panel__skeleton-top-left']"></div>
      <div :class="$style['movieCard__panel__skeleton-top-right']"></div>
    </div>
    <div :class="$style['movieCard__panel__skeleton-bottom']"></div>
  </div>
</template>

<script>
export default {
  name: 'MovieCardPanelSkeleton'
};
</script>

<style module lang="scss">
@import './movie-card-panel-skeleton.scss';
</style>
