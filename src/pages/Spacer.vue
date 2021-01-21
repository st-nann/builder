<template>
  <span
    :style="elementProps.flexbox && elementProps.flexbox
      ? `
        ${elementProps.flexbox['flex-grow']} ? flex-grow: ${elementProps.flexbox['flex-grow']}; : ''
        ${elementProps.flexbox['flex-basis']} ? flex-basis: ${elementProps.flexbox['flex-basis']}; : ''
        ${elementProps.flexbox['max-width']} ? flex-grow: ${elementProps.flexbox['max-width']}; : ''
        height: 100%;
      `
      : ''"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="containerStyle"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <div :style="{ ...elementProps }" />
      </template>
      <template slot="button-management">
        <MainButtonComponent
          v-bind="$props"
          :management="management"
          class="button-box"
          @click="onUpdateManagement"
          @change="onUpdateScale"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 50, height: 40, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="modal-content-spacer">
          <SpacerToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getSpacerData"
          />
          <div :id="`spacer-preview-${elementId}`" class="spacer-preview-container" />
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-bind="$props"
          :management="management"
          @change="onUpdatePreview"
          @click="onUpdateFooterPanelData"
        />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class SpacerPage extends BaseComponent {
  management: any = {}
  spacerData: any = {}

  get containerStyle() {
    const style = {}
    if (!_.isEmpty(this.elementProps.height)) {
      Object.assign(style, { 'min-height': 'auto' })
    }
    if (this.elementProps.flexbox) {
      Object.assign(style, { ...this.elementProps.flexbox })
    }
    return style
  }

  getSpacerData(data: any) {
    this.spacerData = { ...data }
    Object.assign(this.data, this.spacerData)
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.spacerData)
    const previewSpacerStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['background-color']
      const height = this.previewData.height
      if (border) { previewSpacerStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewSpacerStyle['background-color'] = backgroundColor }
      if (height) { previewSpacerStyle.height = height }
    }
    this.doSetAttributeStyle(`spacer-preview-${this.elementId}`, previewSpacerStyle)
  }

  @Watch('previewData', { deep: true })
  onPreviewDataUpdate() {
    this.doAssignStyle()
  }
  
  @Watch('action', { deep: true })
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) {
      this.management = this.action
      ref.isOpenModal = this.management.edit
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
