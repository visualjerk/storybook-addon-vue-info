<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <label v-if="label" :class="$style.label">{{ label }}</label>
    <table :class="$style.table">
      <slot />
    </table>
  </div>
</template>

<style module src="./style.css" />
