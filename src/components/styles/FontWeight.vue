<template>
  <DropdownComponent
    :name="`${name}-font-weight-${elementId}`"
    :label="label"
    :value="fontWeight"
    :options="weightOptions"
    width="100"
    @change="onUpdateFontWeight"
  />
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { FONT_WEIGHT } from '../../constants/Style'

@Component
export default class FontWeightStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  fontWeight = 'normal'

  get weightOptions() {
    return FONT_WEIGHT
  }

  doAssignDefaultData() {
    this.fontWeight = 'normal'
  }

  doAssignPropData() {
    const haveRadius = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveRadius) {
      const props = _.cloneDeep(this.elementProps)
      this.fontWeight = props[this.customKeyValue]
    } else {
      this.doAssignDefaultData()
    }
    return haveRadius
  }

  onUpdateFontWeight(weight: any) {
    this.fontWeight = weight
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      [this.customKeyValue]: !_.isEmpty(this.fontWeight) ? this.fontWeight : undefined
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


