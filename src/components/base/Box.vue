<template>
  <span class="box">
    <CircleMenuButtonComponent
      class="circle-button-top"
      icon="plus"
      :options="menu"
      @click="doEmitTop"
    />
    <CircleMenuButtonComponent
      class="circle-button-right"
      icon="plus"
      :options="menu"
      @click="doEmitRight"
    />
    <CircleMenuButtonComponent
      class="circle-button-bottom"
      icon="plus"
      :options="menu"
      @click="doEmitBottom"
    />
    <CircleMenuButtonComponent
      class="circle-button-left"
      icon="plus"
      :options="menu"
      @click="doEmitLeft"
    />
    <div class="text-box">
      <label class="text-box-label">{{ element }}</label>
      Start modify your message <TextButtonComponent class="text-link-box" label="click" /> here
    </div>
    <MainButtonComponent class="button-box"/>
    <slot/>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/Base'

@Component
export default class BoxComponent extends BaseComponent {

  elementType = ''

  get menu() {
    return MENU
  }

  doEmitTop(element: string) {
    this.$emit('click', { position: 'top', element: element })
  }

  doEmitRight(element: string) {
    this.$emit('click', { position: 'right', element: element })
  }

  doEmitBottom(element: string) {
    this.$emit('click', { position: 'bottom', element: element })
  }

  doEmitLeft(element: string) {
    this.$emit('click', { position: 'left', element: element })
  }

}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>
