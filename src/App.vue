<template>
  <HTMLTemplate
    :propTemplateJson="propTemplateJson"
    :propMessageType="propMessageType"
    @change="doEmitTemplate"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IMessageType } from './interfaces/Components'

@Component
export default class App extends Vue {
  @Prop() readonly propTemplateJson!: any
  @Prop() readonly propMessageType!: IMessageType
  
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
