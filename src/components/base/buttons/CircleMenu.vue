<template>
  <span class="circle-menu-button-layout">
    <span class="menu-button-container">
      <CircleButtonComponent v-bind="$props" class="circle-menu-button"/>
      <div class="menu-container">
        <div class="menu-links">
          <a
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            class="menu-link"
            @click="doEmit(item.value)"
          >
            <i v-if="item.icon" :class="`mdi mdi-${item.icon} menu-icon`" />
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
export default class CircleMenuButtonComponent extends BaseComponent {
  doEmit(element: string) {
    this.$emit('click', element)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
