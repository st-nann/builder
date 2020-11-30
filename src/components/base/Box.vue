<template>
  <span class="box">
    <CircleMenuButtonComponent class="circle-button-top" icon="plus" :options="menu"/>
    <CircleMenuButtonComponent class="circle-button-right" icon="plus" :options="menu"/>
    <CircleMenuButtonComponent class="circle-button-bottom" icon="plus" :options="menu"/>
    <CircleMenuButtonComponent class="circle-button-left" icon="plus" :options="menu"/>
    <div class="text-box">
      Start modify your message <TextButtonComponent class="text-link-box" label="click" /> here
    </div>
    <MainButtonComponent class="button-box"/>
    <slot/>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/base'

@Component
export default class BoxComponent extends BaseComponent {
  get menu() {
    return MENU
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
