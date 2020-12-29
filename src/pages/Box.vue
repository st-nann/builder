<template>
  <span
    :style="elementProps.flexbox && elementProps.flexbox['flex-grow']
      ? `flex-grow: ${elementProps.flexbox['flex-grow']}`
      : ''"
  >
    <BoxComponent
      :elementName="elementName"
      :elementProps="elementProps"
      :management="management"
      :style="elementProps.flexbox ? { ...elementProps.flexbox } : ''"
      @click="doEmitAddElement"
      @change="onUpdateScale"
    >
      <template slot="content">
        <div
          :style="{
            'flex-grow': `${
              elementProps.flexbox && elementProps.flexbox['flex-grow']
                ? elementProps.flexbox['flex-grow']
                : 1
            }`,
            'padding': `${ elementProps.padding ? elementProps.padding : '20px' }`
          }"
        >
          <slot/>
        </div>
      </template>
      <template slot="button-management">
        <MainButtonComponent
          class="button-box button-management-container"
          :elementId="elementId"
          :elementName="elementName"
          @click="onUpdateManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 900, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <div class="modal-content-box">
          <BoxToolbarPanel
            :elementId="elementId"
            :elementProps="elementProps"
            :management="management"
            @change="getBoxData"
          />
          <div :id="`box-preview-${elementId}`" class="box-preview-container" />
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          :elementId="elementId"
          :elementName="elementName"
          :elementProps="elementProps"
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
export default class BoxPage extends BaseComponent {
  management: any = {}
  boxData: any = {}

  getBoxData(data: any) {
    this.boxData = { ...data }
    Object.assign(this.data, this.boxData)
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.boxData)
    const previewBoxStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['background-color']
      const padding = this.previewData.padding
      if (border) { previewBoxStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewBoxStyle['background-color'] = backgroundColor }
      if (padding) { previewBoxStyle.padding = padding }
    }
    this.doSetAttributeStyle(`box-preview-${this.elementId}`, previewBoxStyle)
  }

  @Watch('previewData', { deep: true })
  onPreviewDataUpdate() {
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
