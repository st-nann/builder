<template>
  <button class="circle-button">
    <i v-if="icon" :class="`mdi mdi-${icon}`"/>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class CircleButtonComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../../assets/scss/button.scss';
</style>
