<template>
  <span>
    <SwitchComponent
      name="toolbar-panel-image-width"
      label="Custom Width"
      :value="toggle"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <InputComponent
        name="image-width"
        width="30"
        @change="onUpdateWidth"
      />
      <span class="toolbar-panel-image-width-text">px</span>
    </span>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class WidthStyleComponent extends BaseComponent {
  @Prop() elementProps!: any
  @Prop() management!: any
  
  toggle = false
  imageWidth = '100'

  doAssignDefaultData() {
    this.imageWidth = '100'
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
    this.$emit('change', this.toggle ? { width: `${this.imageWidth}px` } : undefined)
  }

  @Watch('toggle')
  onToggleUpdate() {
    if (this.toggle) {
      if (this.elementProps && this.elementProps.width) {
        this.toggle = this.elementProps && this.elementProps.width
        this.imageWidth = _.cloneDeep(this.elementProps).width
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
      if (this.elementProps && this.elementProps.width) {
        this.toggle = this.elementProps && this.elementProps.width
        this.imageWidth = _.cloneDeep(this.elementProps).width
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


