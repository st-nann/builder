<template>
  <button class="circle-button" @click="doEmit">
    <i v-if="icon" :class="`mdi mdi-${icon}`"/>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class CircleButtonComponent extends BaseComponent {
  doEmit() {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
