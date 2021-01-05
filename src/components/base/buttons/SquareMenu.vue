<template>
  <span :class="`${className}-layout` || 'default-square-menu-button-layout'">
    <span class="menu-button-container">
      <SquareButtonComponent v-bind="$props" />
      <div class="menu-container-square-hidden">
        <div class="menu-container">
          <div class="menu-links">
            <div class="menu-scroll">
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
        </div>
      </div>
    </span>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'

@Component
export default class SquareMenuButtonComponent extends BaseComponent {
  doEmit(value: any) {
    this.$emit('click', value)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
