<template>
  <span style="width: 100%;">
    <BoxComponent
      :element="elementName"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="text-content">
        <div
          v-if="editor && editor.root"
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
      :modal="{ width: 700, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <div :id="`editor-${elementId}`" class="editor"/>
      </template>
      <template slot="action-custom">
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
const Delta = Quill.import('delta')

@Component
export default class TextPage extends BaseComponent {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any
  @Prop() elementValue!: any

  management: any = {}
  footerData = {}
  editor: any = null
  contentHtml: any = null

  created() {
    this.doRenderUpdateElement()
  }

  updated() {
    this.doRenderUpdateElement()
  }

  doRenderUpdateElement() {
    this.$nextTick(() => {
      const modal = document.querySelector(`#modal-edit-${this.elementId}`)
      const toolbar = modal?.getElementsByClassName('ql-toolbar')[0]
      if (_.isUndefined(toolbar)) {
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
          placeholder: this.elementValue ? '' : 'Type content ...'
        }
        this.editor = new Quill(`#editor-${this.elementId}`, options)
      }
      if (this.elementValue && this.elementValue.json && this.elementValue.html) {
        this.editor.updateContents(new Delta(this.elementValue.json))
        this.editor.root.innerHTML = this.elementValue.html
        this.contentHtml = this.editor.root.innerHTML
      }
    })
  }

  doManagement(data: any) {
    this.management = data
    if (
      (
        this.editor &&
        this.editor.root &&
        this.elementValue &&
        this.elementValue.html === this.editor.root.innerHTML
      ) ||
      _.isEmpty(this.contentHtml)
    ) {
      this.doEmitData()
    }
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
        value: this.editor && this.editor.editor && this.editor.root
          ? { json: this.editor.editor.delta.ops, html: this.editor.root.innerHTML }
          : undefined
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.$refs[`modal-edit-${this.elementId}`]) {
      this.$refs[`modal-edit-${this.elementId}`].isOpenModal = this.management.edit
    }
    const self = this
    setTimeout(() => {
      self.editor.focus()
      self.editor.setSelection(self.editor.root.textContent.length)
    }, 100)
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
