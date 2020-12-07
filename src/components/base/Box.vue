<template>
  <span v-if="!action.edit" class="box">
    <div class="box-action">
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
      </div>
      <slot name="button-management" />
    </div>
    <slot name="text-content" />
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
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
