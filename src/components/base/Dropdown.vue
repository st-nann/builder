<template>
  <span>
    <label class="dropdown-label">{{ label }}</label>
    <span class="dropdown">
      <select :style="style">
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
    </span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class DropdownComponent extends BaseComponent {
  get style() {
    return {
      '--dropdown-width': `${this.width}px`
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
