<template>
  <div id="app">
    <HTMLTemplate @change="doEmitTemplate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop() readonly templates!: any;

  doEmitTemplate(template: any) {
    this.$emit('change', template)
  }
}
</script>

<style lang="scss">
@import "./assets/scss/Main.scss";
</style>
