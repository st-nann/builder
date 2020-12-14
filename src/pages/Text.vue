<template>
  <span :style="`width: 100%;`">
    <BoxComponent
      :element="elementName"
      :action="management"
      @click="doEmitAddElement"
    >
      <template slot="content">
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
          @click="onUpdateManagement"
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
        <FooterPanel
          :elementProps="elementProps"
          :elementName="elementName"
          :management="management"
          @change="onUpdatePreview"
          @click="onUpdateFooterPanelData"
        />
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

  management: any = {}
  previewData: any = {}
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
          placeholder: this.elementProps.html ? '' : 'Type content ...'
        }
        this.editor = new Quill(`#editor-${this.elementId}`, options)
      }
      this.editor.root.innerHTML = ''
      this.editor.editor.delta.ops = []
      if (this.elementProps && this.elementProps.json) {
        this.editor.setContents(this.elementProps.json)
      }
      this.contentHtml = this.editor.root.innerHTML
    })
  }

  doAssignStyle() {
    const previewStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['border-bottom']
      if (border) { previewStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewStyle['background-color'] = backgroundColor }
    }
    setTimeout(() => {
      document.getElementById(`editor-${this.elementId}`)?.setAttribute(
        'style',
        JSON.stringify({...previewStyle})
          .substring(1, JSON.stringify({...previewStyle}).length - 1)
          .replaceAll(',', ';')
          .replaceAll('"', '')
      )
    }, 10)
  }

  onUpdateManagement(data: any) {
    this.management = data
    if (this.management.duplicate || this.management.delete) {
      this.doEmitData()
    }
  }

  onUpdatePreview(data: any) {
    this.previewData = {}
    this.previewData = data
    this.doAssignStyle()
  }

  onUpdateFooterPanelData(data: any) {
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
        props: {
          ...this.elementProps,
          ...this.footerData,
          // ...(this.editor && this.editor.root ? { html: this.editor.root.innerHTML } : undefined),
          ...(this.editor && this.editor.editor && this.editor.editor.delta && this.editor.editor.delta.ops
                ? { json: this.editor.editor.delta.ops }
                : undefined
              )
        }
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('management', { deep: true})
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) { ref.isOpenModal = this.management.edit }
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
