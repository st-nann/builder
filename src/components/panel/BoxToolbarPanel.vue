<template>
  <div class="toolbar-panel">
    <PaddingStyleComponent
      :elementId="elementId"
      :elementProps="elementProps"
      :management="management"
      customKeyValue="padding"
      @change="onUpdatePadding"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BoxToolbarPanel extends BaseComponent {
  @Prop() management!: any;

  boxPadding: any

  onUpdatePadding(padding: any) {
    this.boxPadding = padding
    this.onEmitData()
  }

  onEmitData() {
    this.$emit("change", { ...this.boxPadding })
  }

  @Watch("management.edit")
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.boxPadding = this.elementProps.padding
      }
      this.onEmitData();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
