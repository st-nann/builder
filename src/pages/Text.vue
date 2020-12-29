<template>
  <span
    :style="elementProps.flexbox && elementProps.flexbox['flex-grow']
      ? `flex-grow: ${elementProps.flexbox['flex-grow']}`
      : ''"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="`${contentHtml ? 'min-height: auto' : ''}`"
      @click="doEmitAddElement"
      @change="onUpdateScale"
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
          v-bind="$props"
          class="button-box"
          @click="onUpdateManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: 900, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="editor-container">
          <div :id="`editor-${elementId}`" class="editor" />
          <SquareMenuButtonComponent
            icon="plus"
            label="Personalize"
            class="personalize-action"
            className="personalize-square-menu-button"
            :options="personalizes"
            @click="doAddPersonalize"
          />
        </div>
      </template>
      <template slot="action-custom">
        <FooterPanel
          v-bind="$props"
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
import { PERSONALIZES } from '../constants/Base'

const Quill = quill as any

@Component
export default class TextPage extends BaseComponent {
  management: any = {}
  editor: any = null
  contentHtml: any = null

  get personalizes() {
    return  PERSONALIZES
  }

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
      if (this.editor.editor.delta.ops[0]) {
        this.contentHtml = this.editor.root.innerHTML
      }
      this.editor.focus()
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

  doAddPersonalize(personalize: string) {
    this.editor.focus()
    const position = this.editor.getSelection()
    const cursor = position.index
    this.editor.insertText(cursor, personalize, { 'color': '#0DAEFF', 'size': 'small', 'italic': true })
  }

  @Watch('editor', { deep: true })
  onUpdateText() {
    Object.assign(this.data, {
      ...this.elementProps,
      // ...(this.editor && this.editor.root ? { html: this.editor.root.innerHTML } : undefined),
      ...(
          this.editor &&
          this.editor.editor &&
          this.editor.editor.delta &&
          this.editor.editor.delta.ops &&
          (this.editor.editor.delta.ops.length > 0 && this.editor.editor.delta.ops[0].insert !== '\n')
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
