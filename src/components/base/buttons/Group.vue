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
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonGroupComponent extends BaseComponent {
  created () {
    this.doUpdateButtonGroup(this.value)
  }

  doUpdateButtonGroup(value: any) {
    const self = this
    this.onInput(value)
    setTimeout(() => {
      const elements: any = document.querySelectorAll(`#button-group-${self.name}`)
      _.forEach(elements, node => {
        if (node && node.value === value) {
          node.setAttribute('style', 'background-color: #dddddd')
        } else {
          node.setAttribute('style', 'background-color: #ffffff')
        }
      })
    }, 100)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
