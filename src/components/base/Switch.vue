<template>
  <span>
    <label class="switch" @change="doSwitch">
      <input :id="`switch-${name}`" :checked="value" type="checkbox">
      <span class="slider round"></span>
    </label>
    <span class="switch-label">{{ label }}</span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SwitchComponent extends BaseComponent {
  doSwitch() {
    const element: any = document.getElementById(`switch-${this.name}`)
    this.onInput(element.checked)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
