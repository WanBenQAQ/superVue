<template>
  <div class="countbutton">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: "CountButton",
    props: {
      count: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      reduce() {

      }
    }
  }
</script>

<style scoped>
  .countbutton {
    display: flex;
  }
</style>
