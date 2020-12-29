<template>
  <span>
    <SwitchComponent
      :name="`${name}-background-toggle-${elementId}`"
      :value="toggle"
      class="footer-panel-border-bottom"
      label="Background"
      @change="onUpdateToggle"
    />
    <ColorPickerComponent
      v-if="toggle"
      :name="`${name}-background-toggle-color-${elementId}`"
      :value="background"
      @change="onUpdateBackground"
    />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BackgroundToggleStyleComponent extends BaseComponent {
  @Prop() management!: any
  @Prop(Boolean) changeImage!: boolean
  
  toggle = false
  background = '#ffffff'

  doAssignDefaultData() {
    this.background = '#ffffff'
  }

  doAssignPropData() {
    const haveBackgroundColor = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveBackgroundColor) {
      const backgroundColor = _.cloneDeep(this.elementProps[this.customKeyValue])
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
      ? {
          [this.customKeyValue]: !_.isEmpty(this.background) ? this.background : undefined
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


