<template>
  <span class="text-menu-button-layout">
    <span class="menu-button-container">
      <TextButtonComponent v-bind="$props" />
      <div class="menu-container">
        <div class="menu-links">
          <a
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            class="menu-link"
            @click="doEmit(item.value)"
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
export default class TextMenuButtonComponent extends BaseComponent {
  doEmit(element: string) {
    this.$emit('click', element)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
