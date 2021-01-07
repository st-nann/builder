<template>
  <span
    :style="elementProps.flexbox && elementProps.flexbox['flex-grow']
      ? `flex-grow: ${elementProps.flexbox['flex-grow']} height: max-content;`
      : ''"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="containerStyle"
      @click="doEmitAddElement"
      @change="onUpdateScale"
    >
      <template slot="content">
        <button
          v-if="elementProps.name"
          class="button-content"
          :style="propsStyle"
        >
          {{ elementProps.name }}
        </button>
      </template>
      <template slot="button-management">
        <MainButtonComponent
          v-bind="$props"
          class="button-box"
          @click="onUpdateManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 900, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="modal-content-button">
          <ButtonToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getButtonData"
          />
          <div :id="`button-container-preview-${elementId}`" class="button-preview-container">
            <button :id="`button-preview-${elementId}`" />
          </div>
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
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class ButtonPage extends BaseComponent {
  management: any = {}
  buttonData: any = {}

  get containerStyle() {
    const style = {}
    if (this.elementProps.name) {
      Object.assign(style, { 'min-height': 'auto' })
    }
    if (this.elementProps.flexbox) {
      Object.assign(style, { ...this.elementProps.flexbox })
    }
    return style
  }

  get propsStyle() {
    return {
      ...this.elementProps,
      ['font-family']: this.elementProps.font && this.elementProps.font['font-family']
        ? this.elementProps.font['font-family']
        : undefined,
      ['font-size']: this.elementProps.font && this.elementProps.font['font-size']
        ? this.elementProps.font['font-size']
        : undefined,
      color: this.elementProps.font && this.elementProps.font.color
        ? this.elementProps.font.color
        : undefined,
      border: this.elementProps.border
        ? `${this.elementProps.border.width} ${this.elementProps.border.style} ${this.elementProps.border.color}`
        : undefined
    }
  }

  getButtonData(data: any) {
    this.buttonData = { ...data }
    Object.assign(this.data, { ...this.buttonData, padding: '10px 30px' })
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.buttonData)
    const previewContainerStyle: any = {}
    const previewButtonStyle: any = {}
    const previewButtonInnerHTMLStyle = this.previewData.name || ''
    if (JSON.stringify(this.previewData) !== '{}') {
      const borderBottom = this.previewData['border-bottom']
      const font = this.previewData.font
      const backgroundColor = this.previewData['background-color']
      const background = this.previewData['background']
      const fontFamily = font ? font['font-family'] : ''
      const fontSize = font ? font['font-size'] : ''
      const fontColor = font ? font.color : ''
      const border = this.previewData.border
      const borderRadiusButton = this.previewData['border-radius']
      const justify = this.previewData.flexbox ? this.previewData.flexbox['justify-content'] : ''
      if (borderBottom) { previewContainerStyle['border-bottom'] = `${borderBottom.width} ${borderBottom.style} ${borderBottom.color}` }
      if (backgroundColor) { previewContainerStyle['background-color'] = backgroundColor }
      if (background) { previewButtonStyle.background = background }
      if (fontFamily) { previewButtonStyle['font-family'] = fontFamily }
      if (fontSize) { previewButtonStyle['font-size'] = fontSize }
      if (fontColor) { previewButtonStyle.color = fontColor }
      if (border) { previewButtonStyle.border = `${border.width} ${border.style} ${border.color}` }
      if (borderRadiusButton) { previewButtonStyle['border-radius'] = borderRadiusButton }
      if (justify) { previewContainerStyle['justify-content'] = justify }
    }
    this.doSetAttributeStyle(`button-container-preview-${this.elementId}`, previewContainerStyle)
    this.doSetAttributeStyle(`button-preview-${this.elementId}`, { ...previewButtonStyle, padding: '10px 30px' })
    const button = document.getElementById(`button-preview-${this.elementId}`)
    if (button) { button.innerHTML = previewButtonInnerHTMLStyle }
  }

  @Watch('previewData', { deep: true })
  onUpdatePreviewData() {
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
