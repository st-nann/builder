<template>
  <span>
    <SwitchComponent
      :name="`${name}-border-bottom-toggle-${elementId}`"
      :label="label"
      :value="toggle"
      class="footer-panel-border-bottom"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <DropdownComponent
        :name="`${name}-border-bottom-width-toggle-${elementId}`"
        :value="borderWidth"
        :options="widthOptions"
        width="50"
        @change="onUpdateWidth"
      />
      <DropdownComponent
        :name="`${name}-border-bottom-style-toggle-${elementId}`"
        :value="borderStyle"
        :options="borderStyles"
        width="70"
        @change="onUpdateStyle"
      />
      <ColorPickerComponent
        :name="`${name}-border-bottom-color-toggle-${elementId}`"
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
export default class BorderToggleStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  toggle = false
  borderWidth = '1'
  borderStyle = 'solid'
  borderColor = '#ffffff'

  get widthOptions() {
    const lists: any = []
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
    const haveBorderBottom = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveBorderBottom) {
      const borderBottom = _.cloneDeep(this.elementProps[this.customKeyValue])
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
          [this.customKeyValue]: {
            width: !_.isEmpty(this.borderWidth) && this.toggle ? `${this.borderWidth}px` : undefined,
            style: !_.isEmpty(this.borderStyle) && this.toggle ? this.borderStyle : undefined,
            color: !_.isEmpty(this.borderColor) && this.toggle ? this.borderColor : undefined
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
    setTimeout(() => {
      if (this.management.edit) {
        const haveProps = this.doAssignPropData()
        if (!haveProps) { this.toggle = false }
        this.onEmitData()
      }
    }, 10)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


