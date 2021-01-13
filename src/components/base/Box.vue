<template>
  <span v-if="!management.edit" class="box">
    <div class="box-action">
      <CircleMenuButtonComponent
        class="circle-button-top"
        icon="plus"
        :options="menu"
        @click="doEmitTop"
      />
      <CircleMenuButtonComponent
        v-if="isDisplay"
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
        v-if="isDisplay"
        class="circle-button-left"
        icon="plus"
        :options="menu"
        @click="doEmitLeft"
      />
      <label class="text-element-label">{{ elementName }}</label>
      <div v-if="elementName === 'Image' && elementProps && elementProps.link" class="text-link-container">
        <label class="text-link">{{ elementProps.link }}</label>
      </div>
      <slot name="button-management" />
      <div class="button-scale-container">
        <ScaleStyleComponent
          v-bind="$props"
          :management="management"
          customKeyValue="flex-grow"
          @click="onUpdateScale"
        />
      </div>
    </div>
    <slot name="content" />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/Base'
import { EElementPosition } from '../../enum/Elements'

@Component
export default class BoxComponent extends BaseComponent {
  @Prop() readonly management!: any

  get menu() {
    return MENU
  }

  get isDisplay() {
    return this.parent.quantityChildren < 4
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

  onUpdateScale(scale: any) {
    this.$emit('change', scale)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
