<template>
  <div id="app" class="container">
    <div class="container-header">
      <div class="container-title">
        <span class="product-name">PAM </span>
        <span class="project-name">Message Builder</span>
      </div>
      <div class="container-background">
        <ColorPickerComponent label="Background"/>
      </div>
    </div>
    <div class="container-body">
      <div class="content">
        <div class="title">Hello my customer :)</div>
        <BoxComponent/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() readonly templates!: any

  options = [
    { label: 'option1', value: 'opt1' },
    { label: 'option2', value: 'opt2' },
    { label: 'option3', value: 'opt3' }
  ]
}
</script>

<style lang="scss">
  @import './assets/scss/Main.scss';
</style>
