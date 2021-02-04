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
        <div class="checkbox-content">
          <input
            :name="elementProps.name"
            :type="elementProps.type"
            :value="elementProps.value"
            :required="elementProps.required"
            :checked="elementProps.checked"
            :style="[{ 'height': elementProps.height || 'max-content;' }]"
          />
          <span
            v-if="elementProps.label && elementProps.label.name"
            :style="propsLabelStyle"
          >
            {{ elementProps.label.name }}
          </span>
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
        <div class="modal-content-checkbox">
          <CheckboxToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getCheckboxData"
          />
          <div class="checkbox-preview-container">
            <div class="checkbox-preview-input-container">
              <input :id="`checkbox-preview-${elementId}`" type="checkbox" class="checkbox-preview" />
              <span :id="`checkbox-label-preview-${elementId}`" />
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
export default class CheckboxPage extends BaseComponent {
  management: any = {}
  checkboxData: any = {}

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

  getCheckboxData(data: any) {
    this.checkboxData = { ...data }
    Object.assign(this.data, { ...this.checkboxData })
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.checkboxData)
    const previewLabelStyle: any = {}
    const labelName = this.previewData.label && this.previewData.label.name ? this.previewData.label.name : ''
    if (JSON.stringify(this.previewData) !== '{}') {
      const name = this.previewData.name
      const type = this.elementProps.type
      const value = this.previewData.value
      const required = this.previewData.required
      const checked = this.previewData.checked
      const labelFont = this.previewData.label && this.previewData.label.font
      const labelFontFamily = labelFont && this.previewData.label.font['font-family'] ? this.previewData.label.font['font-family'] : ''
      const labelFontSize = labelFont && this.previewData.label.font['font-size'] ? this.previewData.label.font['font-size'] : ''
      const labelFontWeight = labelFont && this.previewData.label.font['font-weight'] ? this.previewData.label.font['font-weight'] : ''
      const labelFontColor = labelFont && this.previewData.label.font.color ? this.previewData.label.font.color : ''
      if (name) { this.doSetAttribute(`checkbox-preview-${this.elementId}`, 'name', name) }
      if (type) { this.doSetAttribute(`checkbox-preview-${this.elementId}`, 'type', type) }
      if (value) { this.doSetAttribute(`checkbox-preview-${this.elementId}`, 'value', value) }
      if (required) { this.doSetAttribute(`checkbox-preview-${this.elementId}`, 'required', required) }
      if (checked) { this.doSetAttribute(`checkbox-preview-${this.elementId}`, 'checked', checked) }
      if (labelFontFamily) { previewLabelStyle['font-family'] = labelFontFamily }
      if (labelFontSize) { previewLabelStyle['font-size'] = labelFontSize }
      if (labelFontWeight) { previewLabelStyle['font-weight'] = labelFontWeight }
      if (labelFontColor) { previewLabelStyle['color'] = labelFontColor }
    }
    this.doSetAttributeStyle(`checkbox-label-preview-${this.elementId}`, previewLabelStyle)
    const label = document.getElementById(`checkbox-label-preview-${this.elementId}`)
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
