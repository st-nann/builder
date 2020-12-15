<template>
  <span style="width: 100%;">
    <BoxComponent
      :elementName="elementName"
      :elementProps="elementProps"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <img
          v-if="elementProps.url"
          :src="elementProps.url"
          :width="elementProps.width || '100%'"
        />
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
            v-show="changeImage"
            :changeImage="changeImage"
            :imageUrl="imageUrl"
            @click="onUpdateChangeImage"
          />
          <div v-show="!changeImage">
            <ImageToolbarPanel
              :elementId="elementId"
              :elementProps="elementProps"
              :management="management"
              :imageUrl="imageUrl"
              @change="getImageData"
            />
            <div :id="`image-container-preview-${elementId}`" class="image-preview-container">
              <img
                :id="`image-preview-${elementId}`"
                v-if="imageUrl"
                class="image-preview"
                :src="imageUrl"
              />
              <div v-else class="no-image">
                <i class="mdi mdi-image-plus no-image-icon" />
                <p class="no-image-text">click the below button to add image</p>
                <SquareButtonComponent
                  label="Browse"
                  className="no-image-button clickable"
                  @click="doAddImage"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-show="!changeImage"
          :elementId="elementId"
          :elementName="elementName"
          :elementProps="elementProps"
          :management="management"
          :imageUrl="imageUrl"
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
  imageData: any = {}
  footerData = {}
  changeImage = false
  imageUrl = ''

  getImageData(data: any) {
    this.imageData = { ...data }
    this.doAssignStyle()
  }

  onUpdateChangeImage(data: any) {
    this.changeImage = data.changeImage
    if (data.url) { this.imageUrl = data.url }
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.imageData)
    const self = this
    const previewContainerStyle: any = {}
    const previewImageStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['background-color']
      const width = this.previewData.width
      const justify = this.previewData.flexbox['justify-content']
      const align = this.previewData.flexbox['align-items']
      if (border) { previewContainerStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewContainerStyle['background-color'] = backgroundColor }
      if (width) { previewImageStyle.width = width }
      if (justify) { previewContainerStyle['justify-content'] = justify }
      if (align) { previewContainerStyle['align-items'] = align }
    }
    setTimeout(() => {
      this.doSetAttributeStyle(`image-container-preview-${self.elementId}`, previewContainerStyle)
      this.doSetAttributeStyle(`image-preview-${self.elementId}`, previewImageStyle)
    }, 10)
  }

  doSetAttributeStyle(id: string, lists: object) {
    document.getElementById(id)?.setAttribute(
      'style',
      JSON.stringify({...lists})
        .substring(1, JSON.stringify({...lists}).length - 1)
        .replaceAll(',', ';')
        .replaceAll('"', '')
    )
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
    this.changeImage = data.changeImage || false
    this.doAssignStyle()
  }

  onUpdateFooterPanelData(data: any) {
    this.footerData = data
    this.management.edit = false
    if (data) { this.doEmitData() }
  }

  doAddImage() {
    this.changeImage = true
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
        props: {
          url: this.imageUrl,
          ...this.previewData
        }
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management', { deep: true })
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) {
      ref.isOpenModal = this.management.edit
      if (ref.isOpenModal && this.elementProps) {
        this.imageUrl = this.elementProps.url
        if (this.elementProps.url) {
          this.changeImage = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
