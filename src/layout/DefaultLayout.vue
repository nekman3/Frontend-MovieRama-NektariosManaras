<template>
  <div>
    <TopBar />
    <slot />
  </div>
</template>

<script>
import TopBar from '../components/shared/top-bar/TopBar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    TopBar
  }
};
</script>
