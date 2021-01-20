<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-padding">
      <PaddingStyleComponent
        name="vertical"
        label="Vertical Padding"
        v-bind="$props"
        min="20"
        max="150"
        :weightRange="89"
        :management="management"
        customKeyValue="padding-y"
        @change="onUpdatePaddingVertical"
      />
      <PaddingStyleComponent
        name="horizontal"
        label="Horizontal Padding"
        v-bind="$props"
        min="20"
        max="400"
        :weightRange="89"
        :management="management"
        customKeyValue="padding-x"
        @change="onUpdatePaddingHorizontal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class BoxToolbarPanel extends BaseComponent {
  @Prop() management!: any;

  boxPaddingVertical: any
  boxPaddingHorizontal: any

  onUpdatePaddingVertical(padding: any) {
    this.boxPaddingVertical = padding
    this.onEmitData()
  }

  onUpdatePaddingHorizontal(padding: any) {
    this.boxPaddingHorizontal = padding
    this.onEmitData()
  }

  onEmitData() {
    this.$emit("change", {
      padding: {
        ...this.boxPaddingVertical,
        ...this.boxPaddingHorizontal
      }
    })
  }

  @Watch("management.edit")
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.boxPaddingVertical = { 'padding-y': this.elementProps.padding['padding-y'] }
        this.boxPaddingHorizontal = { 'padding-x': this.elementProps.padding['padding-x'] }
      }
      this.onEmitData();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
