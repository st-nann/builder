<template>
  <a class="link-text" href="#">{{ label }}</a>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class ButtonTextComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../../assets/scss/Components.scss';
</style>
