<template>
  <span :class="[className, 'link-text']" @click="doEmit">{{ label }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonTextComponent extends BaseComponent {
  doEmit() {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
