<template>
  <SliderComponent
    :name="`${name}-height-${elementId}`"
    :value="height"
    label="Height"
    min="80"
    max="240"
    @change="onUpdateHeight"
  />
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class HeightStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  height = '80'

  doAssignDefaultData() {
    this.height = '80'
  }

  doAssignPropData() {
    const haveHeight = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveHeight) {
      const props = _.cloneDeep(this.elementProps)
      this.height = props[this.customKeyValue].substring(0, props[this.customKeyValue].length - 2)
    } else {
      this.doAssignDefaultData()
    }
    return haveHeight
  }

  onUpdateHeight(height: any) {
    this.height = height
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', !_.isEmpty(this.height)
      ? { [this.customKeyValue]: `${this.height}px` }
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


