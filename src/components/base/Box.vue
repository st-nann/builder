<template>
  <span class="box">
    <CircleMenuButtonComponent
      v-if="!action.edit"
      class="circle-button-top"
      icon="plus"
      :options="menu"
      @click="doEmitTop"
    />
    <CircleMenuButtonComponent
      v-if="!action.edit"
      class="circle-button-right"
      icon="plus"
      :options="menu"
      @click="doEmitRight"
    />
    <CircleMenuButtonComponent
      v-if="!action.edit"
      class="circle-button-bottom"
      icon="plus"
      :options="menu"
      @click="doEmitBottom"
    />
    <CircleMenuButtonComponent
      v-if="!action.edit"
      class="circle-button-left"
      icon="plus"
      :options="menu"
      @click="doEmitLeft"
    />
    <div v-if="!action.edit" class="text-box">
      <label class="text-box-label">{{ element }}</label>
    </div>
    <slot v-if="!action.edit" name="button-management" />
    <slot v-if="action.edit" name="footer-panel" />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/Base'
import { EElementPosition } from '../../enum/Elements'

@Component
export default class BoxComponent extends BaseComponent {
  @Prop() readonly action!: any

  elementType = ''

  get menu() {
    return MENU
  }

  doEmitTop(element: string) {
    this.$emit('click', { position: EElementPosition.TOP, element: _.toUpper(element) })
  }

  doEmitRight(element: string) {
    this.$emit('click', { position: EElementPosition.RIGHT, element: _.toUpper(element) })
  }

  doEmitBottom(element: string) {
    this.$emit('click', { position: EElementPosition.BOTTOM, element: _.toUpper(element) })
  }

  doEmitLeft(element: string) {
    this.$emit('click', { position: EElementPosition.LEFT, element: _.toUpper(element) })
  }

  @Watch('action.edit')
  onEdit() {
    document.getElementsByClassName('box')[0].setAttribute(
      'style', `justify-content: ${this.action.edit ? 'start' : 'center'};`
    )
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
