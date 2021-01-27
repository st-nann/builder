<template>
  <span
    :style="`
      width: ${screen.mobile ? 'calc(100%)' : 'calc(0%)'};
      flex-grow: ${elementProps.flexbox && elementProps.flexbox['flex-grow'] ? elementProps.flexbox['flex-grow'] : 1 };
    `"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="`${contentHtml ? 'min-height: auto;' : ''}`"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <div
          v-if="contentHtml !== null"
          :id="`content-${elementId}`"
          class="ql-editor text-content"
          :style="{ 'word-break': elementProps['word-break'] || 'break-all' }"
          v-html="contentHtml"
        />
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
      :modal="{ width: 50, height: 40, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="editor-container">
          <div :id="`editor-${elementId}`" class="editor" />
          <ComboboxComponent
            :name="`personalize-${elementId}`"
            icon="plus"
            label="Personalize"
            class="personalize-action"
            :options="personalizes"
            @change="doAddPersonalize"
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
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../core/BaseComponent'
import { FONT_STYLE } from '../constants/Style'
import { PERSONALIZES } from '../constants/Base'

const Quill = quill as any

@Component({
    computed: {
        ...mapGetters('texts', {
            personalizeLists: 'personalizes',
        })
    },
    methods: {
      ...mapActions('texts', [
        'getPersonalizes'
      ])
    }
})
export default class TextPage extends BaseComponent {
  management: any = {}
  editor: any = null
  contentHtml: any = null
  personalizeLists!: any

  get havePropData () {
    return localStorage['personalize-baseurl'] && localStorage['personalize-token']
  }

  get transformPersonalizes() {
    return _.isEmpty(this.personalizeLists)
      ? undefined
      : this.personalizeLists.items.map((item: any) => {
        return { label: item.name, value: `{{${item.alias}}}` }
      })
  }

  get personalizes() {
    return this.transformPersonalizes || PERSONALIZES
  }

  created() {
    this.doRenderUpdateElement()
  }

  updated() {
    this.doRenderUpdateElement()
  }

  getPersonalizes!: (payload: { params: { page?: string, limit?: number } }) => void

  doRenderUpdateElement() {
    this.$nextTick(() => {
      const modal = this.$el.querySelector(`#modal-edit-${this.elementId}`)
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
      this.editor.root.innerHTML = null
      this.editor.editor.delta.ops = []
      if (this.elementProps && this.elementProps['text-content']) {
        this.editor.setContents(this.elementProps['text-content'])
      }
      this.contentHtml = this.editor.editor.delta.ops[0] ? this.editor.root.innerHTML : null
      if (this.editor.root.textContent.length > 0) { this.editor.focus() }
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
    this.editor.format('color', '#000000')
    this.editor.format('size', false)
    this.editor.format('italic', false)
    
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
            ? { 'text-content': this.editor.editor.delta.ops }
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
    if (this.havePropData && this.management.edit) {
      this.getPersonalizes({ params: { limit: 9999999 } })
    }
    const self = this
    setTimeout(() => {
      if (self.editor.root.textContent.length > 0) {
        self.editor.focus()
        self.editor.setSelection(self.editor.root.textContent.length)
      }
    }, 100)
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
