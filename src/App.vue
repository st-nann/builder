<template>
  <HTMLTemplate
    id="builder"
    data-id="builder"
    :propTemplateJson="propTemplateJson"
    @change="doEmitTemplate"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() propTemplateJson!: any

  doEmitTemplate(template: any) {
    this.$emit('change', template)
  }
}
</script>

<style lang="scss">
@import "./assets/scss/Main.scss";
@import './assets/css/quill.core.css';
@import './assets/css/quill.snow.css';
</style>
