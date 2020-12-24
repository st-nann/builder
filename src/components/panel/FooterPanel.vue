<template>
  <div class="footer-panel">
    <div class="footer-panel-switch">
      <BorderToggleStyleComponent
        :name="`footer-panel-border-bottom-${elementId}`"
        label="Border Bottom"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        customKeyValue="border-bottom"
        @change="onUpdateBorderButton"
      />
      <BackgroundToggleStyleComponent
        :name="`footer-panel-background-${elementId}`"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        :changeImage="changeImage"
        customKeyValue="background-color"
        @change="onUpdateBackground"
      />
    </div>
    <div class="footer-panel-button">
      <SwitchComponent
        v-if="elementName === 'Image' && (imageUrl && imageUrl !== '')"
        name="footer-panel-compress-image"
        class="footer-panel-compress-image"
        label="Compressed File"
        :value="toggleCompressFile"
        @change="onUpdateCompressFile"
      />
      <SquareButtonComponent
        v-if="elementName === 'Image' && (imageUrl && imageUrl !== '')"
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
