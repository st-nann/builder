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
      :style="elementProps.flexbox ? { ...elementProps.flexbox } : ''"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <div
          :style="[
            {
              'flex-grow': `${
                elementProps.flexbox && elementProps.flexbox['flex-grow']
                  ? elementProps.flexbox['flex-grow']
                  : 1
              }`,
              'padding': `${
                elementProps.padding && elementProps.padding['padding-y'] ? elementProps.padding['padding-y'] : '20px'
              } ${
                elementProps.padding && elementProps.padding['padding-x'] ? elementProps.padding['padding-x'] : '20px'
              }`,
              'width': `${elementProps.width ? `${elementProps.width};` : '-webkit-fill-available' }`
            }
          ]"
        >
          <slot/>
        </div>
      </template>
      <template slot="button-management">
        <MainButtonComponent
          v-bind="$props"
          :management="management"
          class="button-box button-management-container"
          @click="onUpdateManagement"
          @change="onUpdateScale"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 72, height: 45, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="modal-content-box">
          <BoxToolbarPanel
            v-bind="$props"
            :management="management"
            @change="getBoxData"
          />
          <div :id="`box-preview-${elementId}`" class="box-preview-container">
            <div class="box-preview-object" />
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-bind="$props"
          :isFooterStyle="true"
          :management="management"
          @change="onUpdatePreview"
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
      const paddingVertical = this.previewData.padding['padding-y']
      const paddingHorizontal = this.previewData.padding['padding-x']
      if (border) { previewBoxStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewBoxStyle['background-color'] = backgroundColor }
      if (paddingVertical) { previewBoxStyle['padding-top'] = paddingVertical }
      if (paddingVertical) { previewBoxStyle['padding-bottom'] = paddingVertical }
      if (paddingHorizontal) { previewBoxStyle['padding-left'] = paddingHorizontal }
      if (paddingHorizontal) { previewBoxStyle['padding-right'] = paddingHorizontal }
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
