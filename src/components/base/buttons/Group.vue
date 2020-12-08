<template>
  <span class="button-group">
    <button
      v-for="(item, index) in options"
      :key="index"
      class="button-group-item"
      @click="doUpdateButtonGroup(item.value)"
    >
      <i v-if="item.icon" :class="`mdi mdi-${item.icon} button-group-icon`"/>
      <span v-if="item.label">{{ item.label }}</span>
    </button>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonGroupComponent extends BaseComponent {
  doUpdateButtonGroup(value: any) {
    this.onInput(value)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
