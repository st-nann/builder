<template>
  <span style="width: 100%;">
    <BoxComponent
      :elementName="elementName"
      :elementProps="elementProps"
      :action="management"
      @click="doEmitAddElement"
      :style="elementProps.flexbox ? { ...elementProps.flexbox } : ''"
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
  previewData: any = {}
  spacerData: any = {}
  footerData: any = {}

  getSpacerData(data: any) {
    this.spacerData = { ...data }
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.spacerData)
    const self = this
    const previewSpacerStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['background-color']
      const height = this.previewData.height
      if (border) { previewSpacerStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewSpacerStyle['background-color'] = backgroundColor }
      if (height) { previewSpacerStyle.height = height }
    }
    this.doSetAttributeStyle(`spacer-preview-${self.elementId}`, previewSpacerStyle)
  }

  onUpdateManagement(data: any) {
    this.management = data
    if (this.management.duplicate || this.management.delete) {
      this.doEmitData()
    }
  }

  onUpdatePreview(data: any) {
    this.previewData = {}
    this.previewData = data
    this.doAssignStyle()
  }

  onUpdateFooterPanelData(data: any) {
    this.footerData = data
    this.management.edit = false
    if (data) { this.doEmitData() }
  }

  doEmitData() {
    if (this.management.delete) {
      this.$emit('delete', this.elementId)
    } else if (this.management.duplicate) {
      this.$emit('duplicate', {
        id: this.elementId,
        position: this.management.position,
        duplicate: this.management.duplicate
      })
    } else {
      this.$emit('done', {
        id: this.elementId,
        props: { ...this.previewData }
      })
    }
  }
  
  @Watch('management', { deep: true })
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) {
      ref.isOpenModal = this.management.edit
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
