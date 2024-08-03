<template>
  <input
    :class="$style.baseInput"
    :placeholder="placeholder"
    :value="modelValue"
    :type="type"
    @input="updateValue"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: { String, default: 'text' },
    modelValue: { type: String, required: true },
    placeholder: { type: String, default: '' }
  },
  emits: ['update:modelValue'],

  methods: {
    updateValue($event) {
      this.$emit('update:modelValue', $event.target.value);
    }
  }
};
</script>

<style module lang="scss">
@import './base-input.scss';
</style>
