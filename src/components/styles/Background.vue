<template>
  <span>
    <SwitchComponent
      name="footer-panel-background"
      class="footer-panel-border-bottom"
      label="Background"
      @change="doGetData"
    />
    <span v-if="toggle">
      <ColorPickerComponent name="footer-panel-background-color" @change="onUpdateBackground" />
    </span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BackgroundStyleComponent extends BaseComponent {
  toggle = false
  background = '#ffffff'

  doGetData(value: any) {
    this.toggle = value
    if (this.toggle) {
      this.onEmitData()
    }
  }

  onUpdateBackground(background: any) {
    this.background = background
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', { 'background-color': this.background })
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


