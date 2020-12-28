<template>
  <span>
    SCALE: {{ flexGrow }}
    <SquareButtonComponent
      icon="plus-thick"
      className="default-square-button"
      :disabled="flexGrow > 4"
      @click="doUpdateScaleUp"
    />
    <SquareButtonComponent
      icon="minus-thick"
      className="default-square-button"
      :disabled="flexGrow < 1"
      @click="doUpdateScaleDown"
    />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ScaleStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  flexGrow = 1

  doUpdateScaleUp() {
    if (this.flexGrow < 4) {
      this.flexGrow++
      this.onEmitData()
    }
  }

  doUpdateScaleDown() {
    if (this.flexGrow > 1) {
      this.flexGrow--
      this.onEmitData()
    }
  }

  doAssignDefaultData() {
    this.flexGrow = 1
  }

  doAssignPropData() {
    const haveFlexGrow = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveFlexGrow) {
      const props = _.cloneDeep(this.elementProps)
      this.flexGrow = props[this.customKeyValue]
    } else {
      this.doAssignDefaultData()
    }
    return haveFlexGrow
  }

  onUpdateHeight(flexGrow: any) {
    this.flexGrow = flexGrow
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', !_.isSet(this.flexGrow)
      ? { flexbox: { [this.customKeyValue]: this.flexGrow } }
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


