<template>
  <div id="app">
    ljljlkjkljlkjljljljljljl
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() readonly templates!: any
}
</script>

<style lang="scss">
// @import './assets/style';
</style>
