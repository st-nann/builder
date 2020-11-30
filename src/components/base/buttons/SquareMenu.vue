<template>
  <span class="default-square-menu-button-layout">
    <span class="menu-button-container">
      <SquareButtonComponent v-bind="$props" class="default-square-menu-button" />
      <div class="menu-container">
        <div class="menu-links">
          <a
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            class="menu-link"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class SquareMenuButtonComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../../assets/scss/Components.scss';
</style>
