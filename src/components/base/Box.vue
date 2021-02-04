<template>
  <span v-if="!management.edit" class="box">
    <div class="box-action">
      <CircleMenuButtonComponent
        v-if="isDisplayVertical"
        class="circle-button-top"
        icon="plus"
        :options="menu"
        @click="doEmitTop"
      />
      <CircleMenuButtonComponent
        v-if="isDisplayVertical"
        class="circle-button-bottom"
        icon="plus"
        :options="menu"
        @click="doEmitBottom"
      />
      <CircleMenuButtonComponent
        v-if="isDisplayHorizontal"
        class="circle-button-right"
        icon="plus"
        :options="menu"
        @click="doEmitRight"
      />
      <CircleMenuButtonComponent
        v-if="isDisplayHorizontal"
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
    </div>
    <slot name="content" />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { EMAIL_MENU, WEB_ATTENTION_MENU, FLEX_MESSAGE_MENU } from '../../constants/Base'
import { EMessageType, EElementPosition, EElementType } from '../../enum/Elements'

@Component
export default class BoxComponent extends BaseComponent {
  @Prop() readonly management!: any

  get menu() {
    switch (this.elementMessageType) {
      case EMessageType.EMAIL: return EMAIL_MENU
      case EMessageType.WEB_ATTENTION: return WEB_ATTENTION_MENU
      case EMessageType.FLEX_MESSAGE: return FLEX_MESSAGE_MENU
      default: return EMAIL_MENU
    }
  }

  get isDisplayVertical() {
    return this.elementMessageType === EMessageType.FLEX_MESSAGE
      ? _.upperCase(this.elementName) === EElementType.BUTTON && this.childrenElementButtonBox < 3
      : true
  }

  get isDisplayHorizontal() {
    return this.elementMessageType === EMessageType.FLEX_MESSAGE
      ? false
      : this.parent.quantityChildren < 6
  }

  doEmitTop(element: string) {
    this.$emit('click', { position: EElementPosition.TOP, element: _.toUpper(element) })
  }

  doEmitBottom(element: string) {
    this.$emit('click', { position: EElementPosition.BOTTOM, element: _.toUpper(element) })
  }

  doEmitRight(element: string) {
    this.$emit('click', { position: EElementPosition.RIGHT, element: _.toUpper(element) })
  }

  doEmitLeft(element: string) {
    this.$emit('click', { position: EElementPosition.LEFT, element: _.toUpper(element) })
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
