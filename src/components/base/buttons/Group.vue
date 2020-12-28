<template>
  <span class="group-button">
    <button
      :id="`group-button-${name}`"
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      class="group-button-item"
      @click="doUpdateGroupButton(item.value, true)"
    >
      <i v-if="item.icon" :class="`mdi mdi-${item.icon} group-button-icon`"/>
      <span v-if="item.label">{{ item.label }}</span>
    </button>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class GroupButtonComponent extends BaseComponent {
  doUpdateGroupButton(value?: any, action?: boolean) {
    const self = this
    setTimeout(() => {
      const elements: any = document.querySelectorAll(`#group-button-${self.name}`)
      if (typeof self.transformValue === 'object') {
        self.transformValue = this.transformValue[this.name]
      }
      _.forEach(elements, node => {
        const isWhiteBg = _.includes(node.style.backgroundColor, 'rgb(255, 255, 255)')
        if (action && value === this.transformValue && !isWhiteBg) {
          node.setAttribute('style', 'background-color: #ffffff')
          value = ''
        } else {
          if (node && node.value === value) {
            node.setAttribute('style', 'background-color: #dddddd')
          } else {
            node.setAttribute('style', 'background-color: #ffffff')
          }
        }
      })
      self.onInput(value)
    }, 10)
  }

  @Watch('$parent.management.edit')
  onUpdateEdit() {
    if ((this.$parent as any).management.edit) {
      if (!_.isEmpty(this.value)) {
        this.doUpdateGroupButton(this.value[this.name])
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
