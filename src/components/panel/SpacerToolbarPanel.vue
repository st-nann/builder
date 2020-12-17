<template>
  <div class="toolbar-panel">
    <HeightStyleComponent
      :elementId="elementId"
      :elementProps="elementProps"
      :management="management"
      @change="onUpdateHeight"
    />
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class SpacerToolbarPanel extends BaseComponent {
  @Prop(String) elementId!: string;
  @Prop() elementProps!: any;
  @Prop(String) imageUrl!: string;
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
        this.spacerHeight = _.isEmpty(this.elementProps.height) ? 80 : this.elementProps.height
      }
      this.onEmitData();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
