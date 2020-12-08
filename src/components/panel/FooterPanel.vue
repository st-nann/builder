<template>
  <div class="footer-panel">
    <div class="footer-panel-switch">
      <BorderStyleComponent
        name="footer-panel-border-bottom"
        :elementProps="elementProps"
        :management="management"
        @change="onUpdateBorderButton"
      />
      <BackgroundStyleComponent
        name="footer-panel-background"
        :elementProps="elementProps"
        :management="management"
        @change="onUpdateBackground"
      />
    </div>
    <div class="footer-panel-button">
      <SwitchComponent
        v-if="elementName === 'Image'"
        name="footer-panel-compress-image"
        class="footer-panel-compress-image"
        label="Compressed File"
        :value="toggleCompressFile"
        @change="onUpdateCompressFile"
      />
      <SquareButtonComponent
        v-if="elementName === 'Image'"
        icon="rotate-right"
        label="Change Image"
        className="change-image-square-button"
        @click="onChangeImage"
      />
      <SquareButtonComponent
        label="Cancel"
        className="cancel-square-button"
        @click="onEmitCancel"
      />
      <SquareButtonComponent
        label="Done"
        className="done-square-button"
        @click="onEmitDone"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class FooterPanel extends BaseComponent {
  @Prop(String) elementName!: string
  @Prop() elementProps!: any
  @Prop() management!: any
  
  borderBottom = {}
  background = {}
  toggleCompressFile = false
  changeImage = true

  get emitData() {
    const data: any = {
      ...this.borderBottom,
      ...this.background,
    }
    if (this.elementName === 'Image') {
      data['compress-file'] = this.toggleCompressFile
    }
    return data
  }

  created() {
    if (this.elementProps && this.elementProps['compress-file']) {
      this.toggleCompressFile = this.elementProps['compress-file']
    }
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

  onChangeImage() {
    this.changeImage = true
    this.doEmitChangeImage()
  }

  onEmitPreview() {
    const data = this.emitData
    this.$emit('change', { ...data })
  }

  doEmitChangeImage() {
    this.$emit('changeImage', this.changeImage)
  }

  onEmitDone() {
    const data = this.emitData
    this.$emit('click', { ...data })
  }

  onEmitCancel() {
    this.$emit('click')
  }
}
</script>
