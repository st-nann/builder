<template>
  <span>
    <SwitchComponent
      :name="`${name}-width-toggle-${elementId}`"
      :value="toggle"
      label="Custom Width"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <InputComponent
        :name="`${name}-width-toggle-${elementId}`"
        :value="imageWidth"
        width="40"
        @change="onUpdateWidth"
      />
      <span class="toolbar-panel-width-text">px</span>
    </span>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class WidthToggleStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  toggle = false
  imageWidth = '350'

  doAssignDefaultData() {
    this.imageWidth = '350'
  }

  doAssignPropData() {
    const haveWidth = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveWidth) {
      const props = _.cloneDeep(this.elementProps)
      this.toggle = haveWidth
      this.imageWidth = props[this.customKeyValue].substring(0, props[this.customKeyValue].length - 2)
    } else {
      this.doAssignDefaultData()
    }
    return haveWidth
  }

  onUpdateToggle(value: any) {
    this.toggle = value
    this.onEmitData()
  }

  onUpdateWidth(width: any) {
    this.imageWidth = width
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', this.toggle
      ? {
          [this.customKeyValue]: !_.isEmpty(this.imageWidth )? `${this.imageWidth}px` : undefined
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


