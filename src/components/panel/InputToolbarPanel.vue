<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-input-container">
      <div class="toolbar-panel-label">
        <InputComponent
          :name="`input-label-name-${elementId}`"
          label="Label"
          placeholder="Label"
          width="200"
          class="toolbar-panel-input-label-name"
          :value="inputLabelName"
          @change="onUpdateLabelName"
        />
        <FontStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-input-label-font-${elementId}`"
          :management="management"
          customKeyValue="font"
          @change="onUpdateLabelFont"
        />
        <FontWeightStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-input-label-font-weight-${elementId}`"
          :management="management"
          label="Font Weight"
          customKeyValue="font-weight"
          @change="onUpdateLabelFontWeight"
        />
      </div>
      <div class="toolbar-panel-input-attribute">
        <InputComponent
          :name="`input-name-${elementId}`"
          label="Name"
          placeholder="Name"
          width="200"
          class="toolbar-panel-input-name"
          :value="inputName"
          @change="onUpdateName"
        />
        <DropdownComponent
          :name="`input-type-${elementId}`"
          label="Type"
          :value="inputType"
          :options="inputTypeOptions"
          width="100"
          @change="onUpdateType"
        />
        <InputComponent
          :name="`input-placeholder-${elementId}`"
          label="Placeholder"
          placeholder="Placeholder"
          width="200"
          class="toolbar-panel-input-placeholder"
          :value="inputPlaceholder"
          @change="onUpdatePlaceholder"
        />
        <SwitchComponent
          :name="`input-required-${elementId}`"
          :value="toggleInputRequired"
          class="toolbar-panel-input-required"
          label="Required"
          @change="onUpdateRequired"
        />
      </div>
      <div class="toolbar-panel-input-style">
        <RadiusStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-input-radius-${elementId}`"
          :management="management"
          label="Radius"
          customKeyValue="border-radius"
          @change="onUpdateBorderRadius"
        />
        <WidthToggleStyleComponent
          v-bind="$props"
          :management="management"
          class="toobar-panel-input-width"
          customKeyValue="width"
          @change="onUpdateWidth"
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
export default class InputToolbarPanel extends BaseComponent {
  @Prop() management!: any

  inputLabelName = ''
  labelFont: any
  labelFontWeight: any
  inputName = ''
  inputType = 'text'
  inputPlaceholder = ''
  toggleInputRequired = false
  inputRadius: any
  inputWidth: any
  
  get inputTypeOptions() {
    return INPUT_TYPES
  }

  onUpdateLabelName(name: any) {
    this.inputLabelName = name
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

  onUpdateType(type: any) {
    this.inputType = type
    this.onEmitData()
  }

  onUpdatePlaceholder(placeholder: any) {
    this.inputPlaceholder = placeholder
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

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.inputName) ? undefined : this.inputName,
      type: _.isEmpty(this.inputType) ? undefined : this.inputType,
      placeholder: _.isEmpty(this.inputPlaceholder) ? undefined : this.inputPlaceholder,
      required: this.toggleInputRequired || false,
      height: this.elementProps.height,
      ...this.inputWidth,
      label: {
        name: _.isEmpty(this.inputLabelName) ? undefined : this.inputLabelName,
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
        this.inputLabelName = this.elementProps.labe && this.elementProps.label.name ? this.elementProps.label.name : ''
        this.inputName = this.elementProps.name || ''
        this.inputType = this.elementProps.type || ''
        this.inputPlaceholder = this.elementProps.placeholder || ''
        this.toggleInputRequired = this.elementProps.required || false
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
