<template>
  <span>
    <label v-if="label" class="dropdown-label">{{ label }}</label>
    <span class="dropdown">
      <select :id="`select-${this.name}`" :style="style" @change="doUpdateDropdown">
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :style="`font-family: ${item.value}`"
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

  doUpdateDropdown() {
    const element: any = document.getElementById(`select-${this.name}`)
    this.onInput(element.value)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
