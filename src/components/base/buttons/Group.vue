<template>
  <span class="button-group">
    <button
      :id="`button-group-${name}`"
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      class="button-group-item"
      @click="doUpdateButtonGroup(item.value)"
    >
      <i v-if="item.icon" :class="`mdi mdi-${item.icon} button-group-icon`"/>
      <span v-if="item.label">{{ item.label }}</span>
    </button>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonGroupComponent extends BaseComponent {
  doUpdateButtonGroup(value?: any) {
    const self = this
    setTimeout(() => {
      const elements: any = document.querySelectorAll(`#button-group-${self.name}`)
      _.forEach(elements, node => {
        if (node && node.value === value) {
          node.setAttribute('style', 'background-color: #dddddd')
        } else {
          node.setAttribute('style', 'background-color: #ffffff')
        }
      })
    }, 10)
    this.onInput(value)
  }

  

  @Watch('$parent.management.edit')
  onUpdateValue() {
    if ((this.$parent as any).management.edit) {
      this.doUpdateButtonGroup(this.value[this.name])
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
