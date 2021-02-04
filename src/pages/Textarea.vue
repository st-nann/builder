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
        <div>
          <div
            v-if="elementProps.label && elementProps.label.name"
            :style="propsLabelStyle"
          >
            {{ elementProps.label.name }}
          </div>
          <textarea
            :name="elementProps.name"
            :placeholder="elementProps.placeholder"
            :required="elementProps.required"
            :cols="elementProps.cols"
            :rows="elementProps.rows"
            :style="[
              propsTextareaStyle,
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
        <div class="modal-content-textarea">
          <TextareaToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getTextareaData"
          />
          <div class="textarea-preview-container">
            <div class="textarea-preview-input-container">
              <div :id="`textarea-label-preview-${elementId}`" />
              <textarea :id="`textarea-preview-${elementId}`" class="textarea-preview" />
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
export default class TextareaPage extends BaseComponent {
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

  get propsTextareaStyle() {
    const style = {}
    if (this.elementProps) {
      if (this.elementProps['border-radius']) {
        Object.assign(style, { 'border-radius': this.elementProps['border-radius'] })
      }
      if (this.elementProps.resize) {
        Object.assign(style, { 'resize': this.elementProps.resize })
      }
    }
    return style
  }

  getTextareaData(data: any) {
    this.inputData = { ...data }
    Object.assign(this.data, { ...this.inputData })
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.inputData)
    const previewLabelStyle: any = {}
    const previewTextareaStyle: any = {}
    const labelName = this.previewData.label && this.previewData.label.name ? this.previewData.label.name : ''
    if (JSON.stringify(this.previewData) !== '{}') {
      const name = this.previewData.name
      const cols = this.previewData.cols
      const rows = this.previewData.rows
      const resize = this.elementProps.resize
      const required = this.previewData.required
      const placeholder = this.previewData.placeholder
      const labelFont = this.previewData.label && this.previewData.label.font
      const labelFontFamily = labelFont && this.previewData.label.font['font-family'] ? this.previewData.label.font['font-family'] : ''
      const labelFontSize = labelFont && this.previewData.label.font['font-size'] ? this.previewData.label.font['font-size'] : ''
      const labelFontWeight = labelFont && this.previewData.label.font['font-weight'] ? this.previewData.label.font['font-weight'] : ''
      const labelFontColor = labelFont && this.previewData.label.font.color ? this.previewData.label.font.color : ''
      const borderRadiusInput = this.previewData['border-radius'] || ''
      if (name) { this.doSetAttribute(`textarea-preview-${this.elementId}`, 'name', name) }
      if (required) { this.doSetAttribute(`textarea-preview-${this.elementId}`, 'required', required) }
      if (placeholder) { this.doSetAttribute(`textarea-preview-${this.elementId}`, 'placeholder', placeholder) }
      if (cols) { this.doSetAttribute(`textarea-preview-${this.elementId}`, 'cols', cols) }
      if (rows) { this.doSetAttribute(`textarea-preview-${this.elementId}`, 'rows', rows) }
      if (labelFontFamily) { previewLabelStyle['font-family'] = labelFontFamily }
      if (labelFontSize) { previewLabelStyle['font-size'] = labelFontSize }
      if (labelFontWeight) { previewLabelStyle['font-weight'] = labelFontWeight }
      if (labelFontColor) { previewLabelStyle['color'] = labelFontColor }
      if (borderRadiusInput) { previewTextareaStyle['border-radius'] = borderRadiusInput }
      if (resize) { previewTextareaStyle.resize = resize }
    }
    this.doSetAttributeStyle(`textarea-label-preview-${this.elementId}`, previewLabelStyle)
    this.doSetAttributeStyle(`textarea-preview-${this.elementId}`, previewTextareaStyle)
    const label = document.getElementById(`textarea-label-preview-${this.elementId}`)
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
