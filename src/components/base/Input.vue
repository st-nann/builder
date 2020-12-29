<template>
  <span class="input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :id="`input-${this.name}`"
      :value="value"
      :placeholder="placeholder"
      :class="{
        'input': !search,
        'input-search': search
      }"
      :style="style"
      @input="doUpdateInput"
    />
    <i v-if="search" class="mdi mdi-magnify input-append-icon" />
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class InputComponent extends BaseComponent {
  get style() {
    return {
      '--input-width': this.width ? `${this.width}px` : '-webkit-fill-available'
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
