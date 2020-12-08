<template>
  <span style="width: 100%;">
    <BoxComponent
      :element="elementName"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="image-content">
        
      </template>
      <template slot="button-management">
        <MainButtonComponent
          class="button-box"
          :elementId="elementId"
          @click="doManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 700, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        
      </template>
      <template slot="action-custom">
        <FooterPanel @click="doGetFooterPanelData" />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class ImagePage extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any
  @Prop() elementValue!: any

  management: any = {}
  footerData = {}
  editor: any = null

  doManagement(data: any) {
    this.management = data
    this.doEmitData()
  }

  doGetFooterPanelData(data: any) {
    this.footerData = data
    this.management.edit = false
    if (data) { this.doEmitData() }
  }

  doEmitData() {
    if (this.management.delete) {
      this.$emit('delete', this.elementId)
    } else if (this.management.duplicate) {
      this.$emit('duplicate', {
        id: this.elementId,
        position: this.management.position,
        duplicate: this.management.duplicate
      })
    } else {
      this.$emit('done', {
        id: this.elementId,
        props: { ...this.footerData },
        value: {}
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management', { deep: true})
  onEdit() {
    if (this.$refs[`modal-edit-${this.elementId}`]) {
      this.$refs[`modal-edit-${this.elementId}`].isOpenModal = this.management.edit
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
