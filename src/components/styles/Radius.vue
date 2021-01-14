<template>
  <DropdownComponent
    :name="`${name}-radius-${elementId}`"
    :label="label"
    :value="borderRadius"
    :options="radiusOptions"
    width="50"
    @change="onUpdateRadius"
  />
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class RadiusStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  borderRadius = '1'

  get radiusOptions() {
    const lists: any = []
    for (let i = 0; i < 21; i++) {
      lists.push({ label: `${i}px`, value: `${i}` })
    }
    return lists
  }

  doAssignDefaultData() {
    this.borderRadius = '1'
  }

  doAssignPropData() {
    const haveRadius = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveRadius) {
      const props = _.cloneDeep(this.elementProps)
      this.borderRadius = props[this.customKeyValue].substring(0, props[this.customKeyValue].length - 2)
    } else {
      this.doAssignDefaultData()
    }
    return haveRadius
  }

  onUpdateRadius(radius: any) {
    this.borderRadius = radius
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      [this.customKeyValue]: !_.isEmpty(this.borderRadius) ? `${this.borderRadius}px` : undefined
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


