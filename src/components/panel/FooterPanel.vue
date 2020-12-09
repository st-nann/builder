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
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class FooterPanel extends BaseComponent {
  @Prop(String) elementName!: string
  @Prop() elementProps!: any
  @Prop() management!: any
  @Prop(String) imageUrl!: string
  
  borderBottom = {}
  background = {}
  toggleCompressFile = false
  changeImage = true

  get transformEmitData() {
    const data: any = { ...this.borderBottom, ...this.background }
    if (this.elementName === 'Image') {
      data['compress'] = this.toggleCompressFile
    }
    return data
  }

  doAssignDefaultData() {
    this.toggleCompressFile = false
  }

  doAssignPropsDataCompressFile() {
    if (this.elementProps && this.elementProps['compress']) {
      this.toggleCompressFile = this.elementProps && this.elementProps['compress']
    } else {
      this.doAssignDefaultData()
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

  onEmitPreview() {
    const data = this.transformEmitData
    this.$emit('change', { ...data })
  }

  onChangeImage() {
    this.changeImage = true
    this.doEmitChangeImage()
  }

  doEmitChangeImage() {
    this.$emit('changeImage', { changeImage: this.changeImage })
  }

  onEmitDone() {
    const data = this.transformEmitData
    this.$emit('click', { ...data })
  }

  onEmitCancel() {
    this.$emit('click')
  }

  @Watch('toggleCompressFile')
  onToggleUpdate() {
    if (this.toggleCompressFile) { this.doAssignPropsDataCompressFile() }
    else { this.doAssignDefaultData() }
    this.onUpdateCompressFile()
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      this.doAssignPropsDataCompressFile()
      this.onUpdateCompressFile()
    }
  }
}
</script>
