<template>
  <button :class="className">
    <i v-if="icon" :class="`mdi mdi-${icon}`"/>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonSquareComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../../assets/scss/button.scss';
</style>
