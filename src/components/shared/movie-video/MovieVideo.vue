<template>
  <iframe
    loading="lazy"
    width="100%"
    height="100%"
    :src="movieVideo"
    v-if="movieVideo !== ''"
    :class="`video${movieIndex}`"
  >
  </iframe>
  <div v-else :class="$style.movieVideo__empty">No video to display</div>
</template>

<script>
export default {
  name: 'MovieVideo',
  props: {
    movieVideo: {
      type: String,
      required: true
    },
    isDisplayed: {
      type: Boolean,
      required: true
    },
    movieIndex: {
      type: Number,
      required: true
    }
  },

  watch: {
    isDisplayed(newVal) {
      // replace the same video url to stop video when closing panel
      let videoEl = document.querySelector(`.video${this.movieIndex}`);
      if (videoEl !== null && !newVal) {
        let temp = videoEl.src;
        videoEl.src = temp;
      }
    }
  }
};
</script>

<style module lang="scss">
@import './movie-video.scss';
</style>
