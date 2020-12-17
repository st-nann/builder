<template>
  <span>
    <SwitchComponent
      :name="`footer-panel-background-${elementId}`"
      class="footer-panel-border-bottom"
      label="Background"
      :value="toggle"
      @change="onUpdateToggle"
    />
    <span v-if="toggle">
      <ColorPickerComponent
        :name="`footer-panel-background-color-${elementId}`"
        :value="background"
        @change="onUpdateBackground"
      />
    </span>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BackgroundStyleComponent extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop() elementProps!: any
  @Prop() management!: any
  @Prop(Boolean) changeImage!: boolean
  
  toggle = false
  background = '#ffffff'

  doAssignDefaultData() {
    this.background = '#ffffff'
  }

  doAssignPropData() {
    const haveBackgroundColor = this.elementProps && this.elementProps['background-color']
    if (haveBackgroundColor) {
      const backgroundColor = _.cloneDeep(this.elementProps['background-color'])
      this.toggle = haveBackgroundColor
      this.background = backgroundColor
    } else {
      this.doAssignDefaultData()
    }
    return haveBackgroundColor
  }

  onUpdateToggle(value: any) {
    this.toggle = value
    this.onEmitData()
  }

  onUpdateBackground(background: any) {
    this.background = background
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', this.toggle
      ? { 'background-color': this.background }
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


