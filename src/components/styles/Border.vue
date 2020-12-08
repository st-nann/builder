<template>
  <span>
    <SwitchComponent
      name="footer-panel-border-bottom"
      class="footer-panel-border-bottom"
      label="Border Bottom"
      :value="toggle"
      @change="doGetData"
    />
    <span v-if="toggle">
      <DropdownComponent
        name="footer-panel-border-bottom-width"
        :options="widthOptions"
        :value="borderWidth"
        width="50"
        @change="onUpdateWidth"
      />
      <DropdownComponent
        name="footer-panel-border-bottom-style"
        :options="borderStyles"
        :value="borderStyle"
        width="70"
        @change="onUpdateStyle"
      />
      <ColorPickerComponent
        name="footer-panel-border-bottom-color"
        :value="borderColor"
        @change="onUpdateColor"
      />
    </span>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { BORDER_STYLE } from '../../constants/Style'

@Component
export default class BorderStyleComponent extends BaseComponent {
  @Prop() elementProps!: any
  
  toggle = false
  borderWidth = '1'
  borderStyle = 'solid'
  borderColor = '#ffffff'

  created() {
    if (this.elementProps && this.elementProps['border-bottom']) {
      this.toggle = this.elementProps && this.elementProps['border-bottom']
      this.borderWidth = _.cloneDeep(this.elementProps['border-bottom']).width
      this.borderStyle = _.cloneDeep(this.elementProps['border-bottom']).style
      this.borderColor = _.cloneDeep(this.elementProps['border-bottom']).color
    }
  }

  get widthOptions() {
    const lists = []
    for (let i = 1; i < 16; i++) {
      lists.push({ label: `${i}px`, value: `${i}` })
    }
    return lists
  }

  get borderStyles() {
    return BORDER_STYLE
  }

  doGetData(value: any) {
    this.toggle = value
    if (this.toggle) {
      this.onEmitData()
    }
  }

  onUpdateWidth(width: any) {
    this.borderWidth = width
    this.onEmitData()
  }

  onUpdateStyle(style: any) {
    this.borderStyle = style
    this.onEmitData()
  }

  onUpdateColor(color: any) {
    this.borderColor = color
    this.onEmitData()
  }

  onEmitData() {
    console.log(this.borderWidth)
    this.$emit('change', {
      'border-bottom': {
        width: `${this.borderWidth}px`,
        style: this.borderStyle,
        color: this.borderColor
      }
    })
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


