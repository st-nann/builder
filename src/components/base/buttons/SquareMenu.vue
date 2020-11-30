<template>
  <fragment class="default-square-menu-button-layout">
    <fragment class="menu-button-container">
      <SquareButtonComponent v-bind="$props" class="default-square-menu-button"/>
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
    </fragment>
  </fragment>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class SquareMenuButtonComponent extends BaseComponent {}
</script>

<style lang="scss">
  @import '../../../assets/scss/button.scss';
</style>
