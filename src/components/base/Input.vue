<template>
  <span>
    <label class="input-label">{{ label }}</label>
    <input
      :id="`input-${this.name}`"
      class="input"
      :placeholder="placeholder"
      :style="style"
      @input="doUpdateInput"
    />
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

  doUpdateInput() {
    const element: any = document.getElementById(`input-${this.name}`)
    this.onInput(element.value)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
