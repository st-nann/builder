<template>
  <span style="width: 100%;">
    <BoxComponent
      :element="elementName"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="text-content">
        <div
          :id="`content-${elementId}`"
          class="ql-editor text-content"
          v-html="contentHtml"
        />
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
      :modal="{ width: 700, action: 'edit' }"
      :elementId="elementId"
    >
      <template slot="content">
        <div :id="`editor-${elementId}`" class="editor"/>
        <FooterPanel @click="doGetFooterPanelData" />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import quill from 'quill'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

const Quill = quill as any

@Component
export default class TextPage extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any
  @Prop() elementValue!: any

  management = { edit: false, delete: false }
  footerData = {}
  editor: any = null
  content: any = null
  contentHtml: any = null

  updated() {
    const modal = document.querySelector(`#modal-edit-${this.elementId}`)
    const toolbar = modal?.getElementsByClassName('ql-toolbar')[0]
    if (_.isUndefined(toolbar)) {
      this.$nextTick(() => {
        const options = {
          modules: {
            toolbar: [
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'color': [] }],
              ['bold', 'italic', 'underline'],
              [{ 'align': [] }],
              ['link'],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
            ]
          },
          theme: 'snow',
          placeholder: 'Type content ...',
          scrollingContainer: '#scrolling-container'
        }
        this.editor = new Quill(`#editor-${this.elementId}`, options)
        if (this.elementValue) {
          this.editor.editor.delta.ops = this.elementValue
        }
      })
    }
  }

  doManagement(data: any) {
    this.management = data
    if (this.management.delete) { this.doEmitData() }
  }

  doGetFooterPanelData(data: any) {
    this.footerData = data
    this.management.edit = false
    if (this.footerData) {
      this.content = this.editor.editor.delta.ops
      this.contentHtml = this.editor.root.innerHTML
    }
    this.doEmitData()
  }

  doEmitData() {
    if (this.management.delete) {
      this.$emit('delete', this.elementId)
    } else {
      this.$emit('done', {
        id: this.elementId,
        props: { ...this.footerData },
        value: this.content,
        valueHtml: this.contentHtml
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management.edit')
  onEdit() {
    this.$refs[`modal-edit-${this.elementId}`].isOpenModal = this.management.edit
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
