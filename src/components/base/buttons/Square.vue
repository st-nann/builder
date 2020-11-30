<template>
  <button :class="className" @click="doEmit">
    <i v-if="icon" :class="`mdi mdi-${icon}`"/>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonSquareComponent extends BaseComponent {
  doEmit() {
    this.$emit('clickAction')
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Components.scss';
</style>
