<template>
  <span :style="`width: 100%;`">
    <BoxComponent
      :elementName="elementName"
      :management="management"
      :style="`${contentHtml ? 'min-height: auto' : ''}`"
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
      :modal="{ width: 900, action: 'edit', button: { custom: true } }"
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
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'
import { FONT_STYLE } from '../constants/Style'

const Quill = quill as any

@Component
export default class TextPage extends BaseComponent {
  management: any = {}
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
        const fonts = FONT_STYLE
        const Font = Quill.import('formats/font')
        Font.whitelist = fonts
        Quill.register(Font, true)
        const options = {
          modules: {
            toolbar: [
              [{ 'font': fonts }],
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
      const backgroundColor = this.previewData['background-color']
      if (border) { previewStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewStyle['background-color'] = backgroundColor }
    }
    this.doSetAttributeStyle(`editor-${this.elementId}`, previewStyle)
  }

  @Watch('editor', { deep: true })
  onUpdateText() {
    Object.assign(this.data, {
      ...this.elementProps,
      // ...(this.editor && this.editor.root ? { html: this.editor.root.innerHTML } : undefined),
      ...(this.editor && this.editor.editor && this.editor.editor.delta && this.editor.editor.delta.ops
            ? { json: this.editor.editor.delta.ops }
            : undefined
          )
    })
  }

  @Watch('previewData', { deep: true })
  onPreviewDataUpdate() {
    this.doAssignStyle()
  }

  @Watch('action', { deep: true})
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) {
      this.management = this.action
      ref.isOpenModal = this.management.edit
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
