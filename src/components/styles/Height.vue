<template>
  <SliderComponent
    name="image-link"
    class="toolbar-panel-spacer-height"
    label="Height"
    :value="spacerHeight"
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
  
  spacerHeight = '80'

  doAssignDefaultData() {
    this.spacerHeight = '80'
  }

  doAssignPropData() {
    const haveHeight = this.elementProps && this.elementProps.height
    if (haveHeight) {
      const props = _.cloneDeep(this.elementProps)
      this.spacerHeight = props.height.substring(0, props.height.length - 2)
    } else {
      this.doAssignDefaultData()
    }
    return haveHeight
  }

  onUpdateHeight(height: any) {
    this.spacerHeight = height
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', !_.isEmpty(this.spacerHeight)
      ? { height: `${this.spacerHeight}px` }
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


