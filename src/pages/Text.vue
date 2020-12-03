<template>
  <div>
    <BoxComponent :element="elementName" :action="manangement" @click="doEmitAddElement">
      <template slot="button-management">
        <MainButtonComponent class="button-box" @click="doManagement" />
      </template>
      <template slot="footer-panel">
        <FooterPanel @click="doGetFooterPanelData"/>
      </template>
    </BoxComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TextPage extends Vue {
  @Prop(String) elementId!: string
  @Prop(String) elementName!: string
  @Prop() elementProps!: any

  manangement = { edit: false, delete: false }
  footerData = {}
  element = {}

  doManagement(data: any) {
    this.manangement = data
    if (this.manangement.delete) { this.doEmitData() }
  }

  doGetFooterPanelData(data: any) {
    this.footerData = data
    this.manangement.edit = false
    this.doEmitData()
  }

  doEmitData() {
    if (this.manangement.delete) {
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
