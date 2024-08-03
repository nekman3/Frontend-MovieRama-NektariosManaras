<template>
  <div :class="$style.movieReview">
    <div :class="$style.movieReview__top">
      <header>
        <h3 :class="$style.movieReview__title">Review by {{ review.author }}</h3>
      </header>
      <div v-if="review.authorRating" :class="$style['movieReview__title__author-rating']">
        &#9734 {{ review.authorRating }}%
      </div>
    </div>
    <div :class="$style.movieReview__details">Written on {{ review.createdAt }}</div>
    <article :class="$style.movieReview__content"></article>
  </div>
</template>

<script>
export default {
  name: 'MovieReview',
  props: {
    review: {
      type: Object,
      required: true
    },
    reviewIndex: {
      type: Number,
      required: true
    },
    movieIndex: {
      type: Number,
      required: true
    }
  },
  mounted() {
    const cardPanelEl = document.getElementsByClassName('movieCard__panel')[this.movieIndex];
    const reviewContentEl =
      cardPanelEl.getElementsByClassName('movieReview__content')[this.reviewIndex];
    reviewContentEl.innerHTML = this.review.content;
  }
};
</script>

<style module lang="scss">
@import './movie-review.scss';
</style>
