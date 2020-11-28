<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() readonly templates!: any
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
