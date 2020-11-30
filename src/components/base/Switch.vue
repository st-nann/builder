<template>
  <span>
    <label class="switch">
      <input type="checkbox" :checked="value">
      <span class="slider round"></span>
    </label>
    <span class="switch-label">{{ label }}</span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SwitchComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
