<template>
  <span
    :style="`
      width: ${elementScreen.mobile ? 'calc(100%)' : 'calc(0%)'};
      flex-grow: ${elementProps.flexbox && elementProps.flexbox['flex-grow'] ? elementProps.flexbox['flex-grow'] : 1 };
    `"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="containerStyle"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <div class="input-content">
          <div
            v-if="elementProps.label && elementProps.label.name"
            :style="propsLabelStyle"
          >
            {{ elementProps.label.name }}
          </div>
          <input
            :name="elementProps.name"
            :type="elementProps.type"
            :placeholder="elementProps.placeholder"
            :required="elementProps.required"
            :style="[
              propsInputStyle,
              { 'height': elementProps.height || 'max-content;' }
            ]"
          />
        </div>
      </template>
      <template slot="button-management">
        <MainButtonComponent
          v-bind="$props"
          :management="management"
          class="button-box"
          @click="onUpdateManagement"
          @change="onUpdateScale"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 60, height: 50, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="modal-content-input">
          <InputToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getInputData"
          />
          <div class="input-preview-container">
            <div class="input-preview-input-container">
              <div :id="`input-label-preview-${elementId}`" />
              <input :id="`input-preview-${elementId}`" class="input-preview" />
            </div>
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-bind="$props"
          :isFooterStyle="false"
          :management="management"
          @click="onUpdateFooterPanelData"
          @cancel="onUpdateCancel"
        />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class InputPage extends BaseComponent {
  management: any = {}
  inputData: any = {}

  get containerStyle() {
    const style = {}
    if (this.elementProps.name) {
      Object.assign(style, { 'min-height': 'auto' })
    }
    return style
  }

  get propsLabelStyle() {
    const style = {}
    if (this.elementProps.label && this.elementProps.label.font) {
      if (this.elementProps.label.font['font-family']) {
        Object.assign(style, { 'font-family': this.elementProps.label.font['font-family'] })
      }
      if (this.elementProps.label.font['font-size']) {
        Object.assign(style, { 'font-size': this.elementProps.label.font['font-size'] })
      }
      if (this.elementProps.label.font['font-weight']) {
        Object.assign(style, { 'font-weight': this.elementProps.label.font['font-weight'] })
      }
      if (this.elementProps.label.font.color) {
        Object.assign(style, { 'color': this.elementProps.label.font.color })
      }
    }
    return style
  }

  get propsInputStyle() {
    const style = {}
    if (this.elementProps) {
      if (this.elementProps.width) {
        Object.assign(style, { 'width': this.elementProps.width })
      }
      if (this.elementProps.height) {
        Object.assign(style, { 'height': this.elementProps.height })
      }
      if (this.elementProps['border-radius']) {
        Object.assign(style, { 'border-radius': this.elementProps['border-radius'] })
      }
    }
    return style
  }

  getInputData(data: any) {
    this.inputData = { ...data }
    Object.assign(this.data, { ...this.inputData })
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.inputData)
    const previewLabelStyle: any = {}
    const previewInputStyle: any = {}
    const labelName = this.previewData.label && this.previewData.label.name ? this.previewData.label.name : ''
    if (JSON.stringify(this.previewData) !== '{}') {
      const name = this.previewData.name
      const type = this.previewData.type
      const width = this.previewData.width
      const height = this.elementProps.height
      const required = this.previewData.required
      const placeholder = this.previewData.placeholder
      const labelFont = this.previewData.label && this.previewData.label.font
      const labelFontFamily = labelFont && this.previewData.label.font['font-family'] ? this.previewData.label.font['font-family'] : ''
      const labelFontSize = labelFont && this.previewData.label.font['font-size'] ? this.previewData.label.font['font-size'] : ''
      const labelFontWeight = labelFont && this.previewData.label.font['font-weight'] ? this.previewData.label.font['font-weight'] : ''
      const labelFontColor = labelFont && this.previewData.label.font.color ? this.previewData.label.font.color : ''
      const borderRadiusInput = this.previewData['border-radius'] || ''
      if (name) { this.doSetAttribute(`input-preview-${this.elementId}`, 'name', name) }
      if (type) { this.doSetAttribute(`input-preview-${this.elementId}`, 'type', type) }
      if (required) { this.doSetAttribute(`input-preview-${this.elementId}`, 'required', required) }
      if (placeholder) { this.doSetAttribute(`input-preview-${this.elementId}`, 'placeholder', placeholder) }
      if (width) { previewInputStyle.width = width }
      if (height) { previewInputStyle.height = height }
      if (labelFontFamily) { previewLabelStyle['font-family'] = labelFontFamily }
      if (labelFontSize) { previewLabelStyle['font-size'] = labelFontSize }
      if (labelFontWeight) { previewLabelStyle['font-weight'] = labelFontWeight }
      if (labelFontColor) { previewLabelStyle['color'] = labelFontColor }
      if (borderRadiusInput) { previewInputStyle['border-radius'] = borderRadiusInput }
    }
    this.doSetAttributeStyle(`input-label-preview-${this.elementId}`, previewLabelStyle)
    this.doSetAttributeStyle(`input-preview-${this.elementId}`, previewInputStyle)
    const label = document.getElementById(`input-label-preview-${this.elementId}`)
    if (label) { label.innerHTML = labelName }
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
