<template>
  <span>
    <SwitchComponent
      :name="`toolbar-panel-width-${elementId}`"
      label="Custom Width"
      :value="toggle"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <InputComponent
        :name="`toolbar-panel-width-${elementId}`"
        width="40"
        :value="imageWidth"
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
export default class WidthStyleComponent extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop() elementProps!: any
  @Prop() management!: any
  
  toggle = false
  imageWidth = '500'

  doAssignDefaultData() {
    this.imageWidth = '500'
  }

  doAssignPropData() {
    const haveWidth = this.elementProps && this.elementProps.width
    if (haveWidth) {
      const props = _.cloneDeep(this.elementProps)
      this.toggle = haveWidth
      this.imageWidth = props.width.substring(0, props.width.length - 2)
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
    this.$emit('change', this.toggle && !_.isEmpty(this.imageWidth)
      ? { width: `${this.imageWidth}px` }
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


