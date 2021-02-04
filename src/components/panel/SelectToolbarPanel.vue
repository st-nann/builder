<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-select-container">
      <div class="toolbar-panel-label">
        <InputComponent
          :name="`select-label-name-${elementId}`"
          label="Label"
          placeholder="Label"
          width="200"
          class="toolbar-panel-select-label-name"
          :value="selectLabelName"
          @change="onUpdateLabelName"
        />
        <FontStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-select-label-font-${elementId}`"
          :management="management"
          customKeyValue="font"
          @change="onUpdateLabelFont"
        />
        <FontWeightStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-select-label-font-weight-${elementId}`"
          :management="management"
          label="Font Weight"
          customKeyValue="font-weight"
          @change="onUpdateLabelFontWeight"
        />
      </div>
      <div class="toolbar-panel-select-style-and-attribute">
        <InputComponent
          :name="`select-name-${elementId}`"
          label="Name"
          placeholder="Name"
          width="200"
          class="toolbar-panel-select-name"
          :value="inputName"
          @change="onUpdateName"
        />
        <SwitchComponent
          :name="`select-required-${elementId}`"
          :value="toggleInputRequired"
          class="toolbar-panel-select-required"
          label="Required"
          @change="onUpdateRequired"
        />
        <RadiusStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-select-radius-${elementId}`"
          :management="management"
          label="Radius"
          customKeyValue="border-radius"
          @change="onUpdateBorderRadius"
        />
        <WidthToggleStyleComponent
          v-bind="$props"
          :management="management"
          class="toobar-panel-select-width"
          customKeyValue="width"
          @change="onUpdateWidth"
        />
      </div>
      <div class="toolbar-panel-select-options">
        <TextareaComponent
          :name="`select-options-${elementId}`"
          label="Options"
          placeholder="Options"
          cols="40"
          rows="5"
          class="toolbar-panel-select-options"
          :value="selectOptions"
          @change="onUpdateOptions"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash"
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { INPUT_TYPES } from '../../constants/Style'

@Component
export default class SelectToolbarPanel extends BaseComponent {
  @Prop() management!: any

  selectLabelName = ''
  labelFont: any
  labelFontWeight: any
  inputName = ''
  toggleInputRequired = false
  inputRadius: any
  inputWidth: any
  selectOptions = []
  
  get inputTypeOptions() {
    return INPUT_TYPES
  }

  onUpdateLabelName(name: any) {
    this.selectLabelName = name
    this.onEmitData()
  }

  onUpdateLabelFont(font: any) {
    this.labelFont = font
    this.onEmitData()
  }

  onUpdateLabelFontWeight(weight: any) {
    this.labelFontWeight = weight
    this.onEmitData()
  }

  onUpdateName(name: any) {
    this.inputName = name
    this.onEmitData()
  }

  onUpdateRequired(required: any) {
    this.toggleInputRequired = required
    this.onEmitData()
  }

  onUpdateBorderRadius(radius: string) {
    this.inputRadius = radius
    this.onEmitData()
  }

  onUpdateWidth(width: any) {
    this.inputWidth = width
    this.onEmitData()
  }

  onUpdateOptions(options: any) {
    this.selectOptions = options
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.inputName) ? undefined : this.inputName,
      required: this.toggleInputRequired || false,
      height: this.elementProps.height,
      ...this.inputWidth,
      options: _.isEmpty(this.selectOptions) ? undefined : this.selectOptions,
      label: {
        name: _.isEmpty(this.selectLabelName) ? undefined : this.selectLabelName,
        font: _.isEmpty(this.labelFont) && _.isEmpty(this.labelFontWeight)
          ? undefined
          : { ...this.labelFont.font, ...this.labelFontWeight }
      },
      ...this.inputRadius
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.selectLabelName = this.elementProps.label && this.elementProps.label.name ? this.elementProps.label.name : ''
        this.inputName = this.elementProps.name || ''
        this.toggleInputRequired = this.elementProps.required || false
        this.selectOptions = this.elementProps.options || ['1::Option 1', '2::Option 2', '3::Option 3']
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
