<template>
  <span>
    <SwitchComponent
      name="footer-panel-background"
      class="footer-panel-border-bottom"
      label="Background"
      :value="toggle"
      @change="doGetData"
    />
    <span v-if="toggle">
      <ColorPickerComponent
        name="footer-panel-background-color"
        :value="background"
        @change="onUpdateBackground"
      />
    </span>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BackgroundStyleComponent extends BaseComponent {
  @Prop() elementProps!: any
  
  toggle = false
  background = '#ffffff'

  created() {
    if (this.elementProps && this.elementProps['border-bottom']) {
      this.toggle = this.elementProps && this.elementProps['background-color']
      this.background = _.cloneDeep(this.elementProps['background-color'])
    }
  }

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


