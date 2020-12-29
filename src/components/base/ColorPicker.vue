<template>
  <span>
    <span v-if="label" class="color-picker-label" :for="label">{{ label }}</span>
    <input
      :id="`color-picker-${name}`"
      :name="label"
      :value="value || '#ffffff'"
      type="color"
      class="color-picker-input"
      @input="doUpdateColorPicker"
    >
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ColorPickerComponent extends BaseComponent {
  doUpdateColorPicker() {
    const element: any = document.getElementById(`color-picker-${this.name}`)
    this.onInput(element.value)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
