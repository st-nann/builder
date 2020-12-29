<template>
  <div class="footer-panel">
    <div class="footer-panel-switch">
      <BorderToggleStyleComponent
        v-bind="$props"
        :name="`footer-panel-border-bottom-${elementId}`"
        :management="management"
        label="Border Bottom"
        customKeyValue="border-bottom"
        @change="onUpdateBorderButton"
      />
      <BackgroundToggleStyleComponent
        v-bind="$props"
        :name="`footer-panel-background-${elementId}`"
        :management="management"
        :changeImage="changeImage"
        customKeyValue="background-color"
        @change="onUpdateBackground"
      />
    </div>
    <div class="footer-panel-button">
      <SwitchComponent
        v-if="isImage"
        :name="`footer-panel-compress-image-${elementId}`"
        :value="toggleCompressFile"
        class="footer-panel-compress-image"
        label="Compressed File"
        @change="onUpdateCompressFile"
      />
      <SquareButtonComponent
        v-if="isImage"
        icon="rotate-right"
        label="Change Image"
        className="change-image-square-button"
        @click="onUpdateChangeImage"
      />
      <SquareButtonComponent
        label="Cancel"
        className="cancel-square-button"
        @click="doEmitCancel"
      />
      <SquareButtonComponent
        label="Done"
        className="done-square-button"
        @click="doEmitDone"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class FooterPanel extends BaseComponent {
  @Prop() management!: any
  @Prop(String) imageUrl!: string
  
  borderBottom = {}
  background = {}
  toggleCompressFile = false
  changeImage = false

  get isImage() {
    return this.elementName === 'Image' && (this.imageUrl && this.imageUrl !== '')
  }

  get transformEmitData() {
    const data: any = { ...this.borderBottom, ...this.background }
    if (this.elementName === 'Image') {
      data['compress'] = this.toggleCompressFile
      if (this.changeImage) {
        data.changeImage = this.changeImage
      }
    }
    return data
  }

  doAssignDefaultData() {
    this.toggleCompressFile = false
  }

  doAssignPropsDataCompressFile() {
    const compress = this.elementProps && this.elementProps['compress']
    if (compress) { this.toggleCompressFile = compress }
    else { this.doAssignDefaultData() }
  }

  onUpdateBorderButton(value: any) {
    this.borderBottom = value
    this.onEmitPreview()
  }

  onUpdateBackground(value: any) {
    this.background = value
    this.onEmitPreview()
  }

  onUpdateCompressFile() {
    this.toggleCompressFile = !this.toggleCompressFile
    this.onEmitPreview()
  }

  onUpdateChangeImage() {
    this.changeImage = true
    this.onEmitPreview()
    this.changeImage = false
  }

  onEmitPreview() {
    const data = this.transformEmitData
    this.$emit('change', { ...data })
  }

  doEmitDone() {
    const data = this.transformEmitData
    this.$emit('click', { ...data })
  }

  doEmitCancel() {
    this.$emit('click')
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      this.doAssignPropsDataCompressFile()
      this.onEmitPreview()
    }
  }
}
</script>
