<template>
  <div class="toolbar-panel">
    <HeightStyleComponent
      v-bind="$props"
      :management="management"
      label="Height"
      min="80"
      max="240"
      :weightRange="85"
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
        this.spacerHeight = { height: this.elementProps.height }
      }
      this.onEmitData();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
