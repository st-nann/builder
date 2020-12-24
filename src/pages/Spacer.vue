<template>
  <span style="width: 100%;">
    <BoxComponent
      :elementName="elementName"
      :elementProps="elementProps"
      :management="management"
      :style="elementProps.flexbox ? { ...elementProps.flexbox } : ''"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <div :style="{ ...elementProps }" />
      </template>
      <template slot="button-management">
        <MainButtonComponent
          class="button-box"
          :elementId="elementId"
          @click="onUpdateManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 900, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <div class="modal-content-spacer">
          <SpacerToolbarPanel
            :elementId="elementId"
            :elementProps="elementProps"
            :management="management"
            @change="getSpacerData"
          />
          <div :id="`spacer-preview-${elementId}`" class="spacer-preview-container" />
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          :elementId="elementId"
          :elementName="elementName"
          :elementProps="elementProps"
          :management="management"
          @change="onUpdatePreview"
          @click="onUpdateFooterPanelData"
        />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class SpacerPage extends BaseComponent {
  management: any = {}
  spacerData: any = {}

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
