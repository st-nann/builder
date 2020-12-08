<template>
  <span>
    <SwitchComponent
      name="footer-panel-border-bottom"
      class="footer-panel-border-bottom"
      label="Border Bottom"
      :value="toggle"
      @change="onUpdateToggle"
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
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { BORDER_STYLE } from '../../constants/Style'

@Component
export default class BorderStyleComponent extends BaseComponent {
  @Prop() elementProps!: any
  @Prop() management!: any
  
  toggle = false
  borderWidth = '1'
  borderStyle = 'solid'
  borderColor = '#ffffff'

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

  doAssignDefaultData() {
    this.borderWidth = '1'
    this.borderStyle = 'solid'
    this.borderColor = '#ffffff'
  }

  onUpdateToggle(value: any) {
    this.toggle = value
    this.onEmitData()
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
    this.$emit('change', this.toggle
      ? {
          'border-bottom': {
            width: `${this.borderWidth}px`,
            style: this.borderStyle,
            color: this.borderColor
          }
        }
      : undefined
    )
  }

  @Watch('toggle')
  onToggleUpdate() {
    if (this.toggle) {
      if (this.elementProps && this.elementProps['border-bottom']) {
        this.toggle = this.elementProps && this.elementProps['border-bottom']
        this.borderWidth = _.cloneDeep(this.elementProps['border-bottom']).width
        this.borderStyle = _.cloneDeep(this.elementProps['border-bottom']).style
        this.borderColor = _.cloneDeep(this.elementProps['border-bottom']).color
      } else {
        this.doAssignDefaultData()
      }
    } else {
      this.doAssignDefaultData()
    }
    this.onEmitData()
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps && this.elementProps['border-bottom']) {
        this.toggle = this.elementProps && this.elementProps['border-bottom']
        this.borderWidth = _.cloneDeep(this.elementProps['border-bottom']).width
        this.borderStyle = _.cloneDeep(this.elementProps['border-bottom']).style
        this.borderColor = _.cloneDeep(this.elementProps['border-bottom']).color
      } else {
        this.toggle = false
        this.doAssignDefaultData()
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


