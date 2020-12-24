<template>
  <div class="toolbar-panel">
    <HeightStyleComponent
      :elementId="elementId"
      :elementProps="elementProps"
      :management="management"
      customKeyValue="height"
      @change="onUpdateHeight"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SpacerToolbarPanel extends BaseComponent {
  @Prop() management!: any;

  spacerHeight: any

  onUpdateHeight(height: any) {
    this.spacerHeight = height
    this.onEmitData()
  }

  onEmitData() {
    this.$emit("change", { ...this.spacerHeight })
  }

  @Watch("management.edit")
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.spacerHeight = this.elementProps.height
      }
      this.onEmitData();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
