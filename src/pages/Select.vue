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
        <div class="select-content">
          <div
            v-if="elementProps.label && elementProps.label.name"
            :style="propsLabelStyle"
          >
            {{ elementProps.label.name }}
          </div>
          <select
            :name="elementProps.name"
            :required="elementProps.required"
            :style="[
              propsSelectStyle,
              { 'height': elementProps.height || 'max-content;' }
            ]"
          >
            <option
              v-for="(item, index) in doMapOptions(elementProps.options)"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
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
        <div class="modal-content-select">
          <SelectToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getInputData"
          />
          <div class="select-preview-container">
            <div class="select-preview-input-container">
              <div :id="`select-label-preview-${elementId}`" />
              <select
                :id="`select-preview-${elementId}`"
                class="select-preview"
              >
                <option
                  v-for="(item, index) in previewOptions"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
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
import _ from 'lodash'
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'
import { IDropdownOption } from '../interfaces/Components'

@Component
export default class SelectPage extends BaseComponent {
  management: any = {}
  selectData: any = {}
  previewOptions: IDropdownOption[] = [{ label: '', value: '' }]

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

  get propsSelectStyle() {
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
    this.selectData = { ...data }
    Object.assign(this.data, { ...this.selectData })
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.selectData)
    const previewLabelStyle: any = {}
    const previewSelectStyle: any = {}
    const labelName = this.previewData.label && this.previewData.label.name ? this.previewData.label.name : ''
    if (JSON.stringify(this.previewData) !== '{}') {
      const name = this.previewData.name
      const type = this.previewData.type
      const width = this.previewData.width
      const height = this.elementProps.height
      const required = this.previewData.required
      const labelFont = this.previewData.label && this.previewData.label.font
      const labelFontFamily = labelFont && this.previewData.label.font['font-family'] ? this.previewData.label.font['font-family'] : ''
      const labelFontSize = labelFont && this.previewData.label.font['font-size'] ? this.previewData.label.font['font-size'] : ''
      const labelFontWeight = labelFont && this.previewData.label.font['font-weight'] ? this.previewData.label.font['font-weight'] : ''
      const labelFontColor = labelFont && this.previewData.label.font.color ? this.previewData.label.font.color : ''
      const borderRadiusInput = this.previewData['border-radius'] || ''
      if (name) { this.doSetAttribute(`select-preview-${this.elementId}`, 'name', name) }
      if (type) { this.doSetAttribute(`select-preview-${this.elementId}`, 'type', type) }
      if (required) { this.doSetAttribute(`select-preview-${this.elementId}`, 'required', required) }
      if (width) { previewSelectStyle.width = width }
      if (height) { previewSelectStyle.height = height }
      if (labelFontFamily) { previewLabelStyle['font-family'] = labelFontFamily }
      if (labelFontSize) { previewLabelStyle['font-size'] = labelFontSize }
      if (labelFontWeight) { previewLabelStyle['font-weight'] = labelFontWeight }
      if (labelFontColor) { previewLabelStyle['color'] = labelFontColor }
      if (borderRadiusInput) { previewSelectStyle['border-radius'] = borderRadiusInput }
    }
    this.doSetAttributeStyle(`select-label-preview-${this.elementId}`, previewLabelStyle)
    this.doSetAttributeStyle(`select-preview-${this.elementId}`, previewSelectStyle)
    const label = document.getElementById(`select-label-preview-${this.elementId}`)
    if (label) { label.innerHTML = labelName }
  }

  doMapOptions(options: any) {
    return options && options.length > 0
      ? _.map(options, item => {
          const splits = _.split(item, '::')
          return { label: splits[1], value: splits[0] }
        })
      : [{ label: '', value: '' }]
  }

  @Watch('selectData', { deep: true })
  onUpdateSelectData() {
    const self = this
    setTimeout(() => { self.previewOptions = self.doMapOptions(self.previewData.options) }, 10)
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
      const self = this
      if (ref.isOpenModal) {
        setTimeout(() => { self.previewOptions = self.doMapOptions(self.previewData.options) }, 10)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
