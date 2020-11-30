<template>
  <span>
    <span class="color-picker-label" :for="label">{{ label }}</span>
    <input
      class="color-picker-input"
      type="color"
      :name="label"
      :value="value"
      @input="onInput"
    >
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ColorPickerComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
