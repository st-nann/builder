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
      :modal="{ width: changeImage ? 900 : 1000, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <div class="modal-content-image">
          <ImageAssetContent
            v-if="changeImage"
            @click="onUpdateImageLink"
          />
          <div v-else>
            <ImageToolbarPanel @change="getImageData" />
            <div :id="`image-preview-${elementId}`" class="image-preview-container">
              <img
                v-if="imageData && imageData.imageUrl"
                class="image-preview"
                :src="imageData.imageUrl"
              />
              <div v-else class="no-image">
                <i class="mdi mdi-folder-multiple-image no-image-icon" />
                <div class="no-image-text">No Image</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-if="!changeImage"
          :elementProps="elementProps"
          :elementName="elementName"
          :management="management"
          @change="onUpdatePreview"
          @changeImage="onUpdateChangeImage"
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
  changeImage = true
  previewData: any = {}
  footerData = {}
  imageData: any = {}

  getImageData(data: any) {
    this.imageData = data
  }

  onUpdateImageLink(data: any) {
    this.changeImage = data.changeImage
    this.imageData.imageUrl = data.url
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

  onUpdateChangeImage(change: boolean) {
    this.changeImage = change
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
