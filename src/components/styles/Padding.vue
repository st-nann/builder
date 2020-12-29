<template>
  <SliderComponent
    :name="`${name}-padding-${elementId}`"
    :value="padding"
    label="Padding"
    min="20"
    max="150"
    @change="onUpdatePadding"
  />
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class PaddingStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  padding = '20'

  doAssignDefaultData() {
    this.padding = '20'
  }

  doAssignPropData() {
    const havePadding = this.elementProps && this.elementProps[this.customKeyValue]
    if (havePadding) {
      const props = _.cloneDeep(this.elementProps)
      this.padding = props[this.customKeyValue].substring(0, props[this.customKeyValue].length - 2)
    } else {
      this.doAssignDefaultData()
    }
    return havePadding
  }

  onUpdatePadding(padding: any) {
    this.padding = padding
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', !_.isEmpty(this.padding)
      ? { [this.customKeyValue]: `${this.padding}px` }
      : undefined
    )
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      this.doAssignPropData()
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


