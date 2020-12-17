<template>
  <span class="slider-container">
    <label v-if="label" class="slider-label">{{ label }}</label>
    <input
      :id="`slider-${this.name}`"
      type="range"
      min="80"
      max="240"
      @input="doUpdateInput"
    >
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SliderComponent extends BaseComponent {
  doUpdateInput() {
    const element: any = document.getElementById(`slider-${this.name}`)
    this.onInput(element.value)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
