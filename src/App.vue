<template>
  <HTMLTemplate
    :propTemplateJson="propTemplateJson"
    :isMobile="isMobile"
    :isDesktop="isDesktop"
    @change="doEmitTemplate"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() propTemplateJson!: any
  @Prop(Boolean) isMobile!: boolean
  @Prop(Boolean) isDesktop!: boolean
  
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
