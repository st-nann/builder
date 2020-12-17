<template>
  <div class="toolbar-panel">
    <SliderComponent
      name="image-link"
      class="toolbar-panel-spacer-height"
      label="Height"
      :value="spacerHeight"
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

  spacerHeight: any = 80;

  onUpdateHeight(height: any) {
    this.spacerHeight = height;
    this.onEmitData();
  }

  onEmitData() {
    this.$emit("change", { height: this.spacerHeight })
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
