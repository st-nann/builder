<template>
  <div>
    <BoxComponent :element="elementName" :action="management" @click="doEmitAddElement">
      <template slot="button-management">
        <MainButtonComponent class="button-box" @click="doManagement" />
      </template>
      <!-- <tamplate v-if="management.edit">
        <div id="quill-text-editor" />
      </tamplate> -->
      <template slot="footer-panel">
        <FooterPanel @click="doGetFooterPanelData"/>
      </template>
    </BoxComponent>
  </div>
</template>

<script lang="ts">
// import Quill from 'quill'
import { Component, Vue, Prop } from 'vue-property-decorator'
// const Quill = quill as any

@Component
export default class TextPage extends Vue {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any

  management = { edit: false, delete: false }
  footerData = {}
  element = {}
  editor: any = null
  textValue = null

  // mounted() {
  //   const options = {
  //     modules: {
  //       toolbae: [
  //         ['bold', 'italic', 'underline', 'strike']
  //       ]
  //     },
  //     theme: 'snow'
  //   }
  //   this.editor = new Quill('#quill-text-editor', options)
  //   // this.editor.root.innerHTML = this.textValue
  //   // this.editor.on('text-change', () => {})
  // }

  doManagement(data: any) {
    this.management = data
    if (this.management.delete) { this.doEmitData() }
  }

  doGetFooterPanelData(data: any) {
    this.footerData = data
    this.management.edit = false
    this.doEmitData()
  }

  doEmitData() {
    if (this.management.delete) {
      this.$emit('delete', this.elementId)
    } else {
      this.$emit('done', {
        id: this.elementId,
        props: { ...this.footerData }
      })
    }
  }

  doEmitAddElement(data: any) {
    this.element = data
    this.$emit('add', {
      id: this.elementId,
      ...this.element
    })
  }
}
</script>
