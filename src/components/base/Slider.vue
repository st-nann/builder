<template>
  <span class="slider-container">
    <label v-if="label" class="slider-label">{{ label }}</label>
    <span class="slider-input">
      <div id="range-value" class="range-value" />
      <input
        :id="`slider-${this.name}`"
        class="slider-content"
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :style="style"
        @input="doUpdateInput"
      />
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SliderComponent extends BaseComponent {
  get style() {
    const lower = (this.value - parseInt(this.min)) * .625
    const upper = 0
    return {
      '--input-range-lower': `${lower}%`,
      '--input-range-upper': `${upper}%`
    }
  }

  doUpdateInput() {
    const element: any = document.getElementById(`slider-${this.name}`)
    const elementValue = document.getElementById('range-value'),
    setValue = () => {
      const newValue = Number((element.value - element.min) * 85 / (element.max - element.min))
      const newPosition = 22 - (newValue * 0.2)
      if (elementValue) {
        elementValue.innerHTML = `<span>${element.value}px</span>`
        elementValue.style.left = `calc(${newValue}% + (${newPosition}px))`
      }
    }
    if (setValue) {
      document.addEventListener("DOMContentLoaded", setValue)
      window.addEventListener('mouseover', setValue)
      element.addEventListener('input', setValue)
    }
    this.onInput(element.value)
  }

  @Watch('$parent.management.edit')
  onUpdateEdit() {
    if ((this.$parent as any).management.edit) {
      this.doUpdateInput()
    }
  }

}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
