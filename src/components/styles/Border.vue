<template>
  <span>
    <SwitchComponent
      :name="`footer-panel-border-bottom-${elementId}`"
      class="footer-panel-border-bottom"
      label="Border Bottom"
      :value="toggle"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <DropdownComponent
        :name="`footer-panel-border-bottom-width-${elementId}`"
        :options="widthOptions"
        :value="borderWidth"
        width="50"
        @change="onUpdateWidth"
      />
      <DropdownComponent
        :name="`footer-panel-border-bottom-style-${elementId}`"
        :options="borderStyles"
        :value="borderStyle"
        width="70"
        @change="onUpdateStyle"
      />
      <ColorPickerComponent
        :name="`footer-panel-border-bottom-color-${elementId}`"
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
  @Prop(String) elementId!: string
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

  doAssignPropData() {
    const haveBorderBottom = this.elementProps && this.elementProps['border-bottom']
    if (haveBorderBottom) {
      const borderBottom = _.cloneDeep(this.elementProps['border-bottom'])
      this.toggle = haveBorderBottom
      this.borderWidth = borderBottom.width.substring(0, borderBottom.width.length - 2)
      this.borderStyle = borderBottom.style
      this.borderColor = borderBottom.color
    } else {
      this.doAssignDefaultData()
    }
    return haveBorderBottom
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
    if (this.toggle) { this.doAssignPropData() }
    else { this.doAssignDefaultData() }
    this.onEmitData()
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      const haveProps = this.doAssignPropData()
      if (!haveProps) { this.toggle = false }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


