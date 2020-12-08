<template>
  <span style="width: 100%;">
    <BoxComponent
      :element="elementName"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="image-content">
        
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
      :modal="{ width: 1000, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <ImageToolbarPanel @change="getImageData" />
        <div :id="`image-preview-${elementId}`" class="image-preview">
          <div v-if="imageData.link" :id="`display-image-${elementId}`" />
          <div v-else class="no-image">
            <i class="mdi mdi-folder-multiple-image no-image-icon" />
            <div class="no-image-text">No Image</div>
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
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
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class ImagePage extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any

  management: any = {}
  previewData: any = {}
  footerData = {}
  imageData: any = {}

  getImageData(data: any) {
    this.imageData = data
  }

  doAssignStyle() {
    const previewStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      if (this.previewData['border-bottom']) {
        const border = this.previewData['border-bottom']
        previewStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}`
      }
      if (this.previewData['background-color']) {
        previewStyle['background-color'] = this.previewData['background-color']
      }
    }
    document.getElementById(`image-preview-${this.elementId}`)?.setAttribute(
      'style',
      JSON.stringify({...previewStyle})
        .substring(1, JSON.stringify({...previewStyle}).length - 1)
        .replaceAll(',', ';')
        .replaceAll('"', '')
    )
  }

  onUpdateManagement(data: any) {
    this.management = data
    this.doEmitData()
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
        props: { ...this.imageData, ...this.footerData }
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management', { deep: true})
  onEdit() {
    if (this.$refs[`modal-edit-${this.elementId}`]) {
      this.$refs[`modal-edit-${this.elementId}`].isOpenModal = this.management.edit
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
