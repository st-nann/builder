<template>
  <ColorPickerComponent
    :name="`${name}-background-color-${elementId}`"
    :label="label"
    :value="background"
    @change="onUpdateBackground"
  />
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BackgroundStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  background = '#ffffff'

  doAssignDefaultData() {
    this.background = '#ffffff'
  }

  doAssignPropData() {
    const haveBackgroundColor = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveBackgroundColor) {
      const backgroundColor = _.cloneDeep(this.elementProps[this.customKeyValue])
      this.background = backgroundColor
    } else {
      this.doAssignDefaultData()
    }
    return haveBackgroundColor
  }

  onUpdateBackground(background: any) {
    this.background = background
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      [this.customKeyValue]: !_.isEmpty(this.background) ? this.background : undefined
    })
  }

  @Watch('management.edit')
  onEdit() {
    setTimeout(() => {
      if (this.management.edit) {
        this.doAssignPropData()
        this.onEmitData()
      }
    }, 10)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


