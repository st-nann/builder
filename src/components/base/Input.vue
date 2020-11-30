<template>
  <span>
    <label class="input-label">{{ label }}</label>
    <input class="input" :style="style"/>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class InputComponent extends BaseComponent {
  get style() {
    return {
      '--input-width': `${this.width}px`
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
