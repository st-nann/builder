<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-radio-container">
      <div class="toolbar-panel-label">
        <InputComponent
          :name="`radio-label-name-${elementId}`"
          label="Label"
          placeholder="Label"
          width="200"
          class="toolbar-panel-radio-label-name"
          :value="radioLabelName"
          @change="onUpdateLabelName"
        />
        <FontStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-radio-label-font-${elementId}`"
          :management="management"
          customKeyValue="font"
          @change="onUpdateLabelFont"
        />
        <FontWeightStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-radio-label-font-weight-${elementId}`"
          :management="management"
          label="Font Weight"
          customKeyValue="font-weight"
          @change="onUpdateLabelFontWeight"
        />
      </div>
      <div class="toolbar-panel-radio-attribute">
        <InputComponent
          :name="`radio-name-${elementId}`"
          label="Name"
          placeholder="Name"
          width="200"
          class="toolbar-panel-radio-name"
          :value="radioName"
          @change="onUpdateName"
        />
        <InputComponent
          :name="`radio-value-${elementId}`"
          label="Value"
          placeholder="Value"
          width="200"
          class="toolbar-panel-radio-value"
          :value="radioValue"
          @change="onUpdateValue"
        />
        <SwitchComponent
          :name="`radio-required-${elementId}`"
          :value="toggleRadioRequired"
          class="toolbar-panel-radio-required"
          label="Required"
          @change="onUpdateRequired"
        />
        <SwitchComponent
          :name="`radio-checked-${elementId}`"
          :value="toggleRadioChecked"
          class="toolbar-panel-radio-checked"
          label="Checked"
          @change="onUpdateChecked"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash"
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class RadioToolbarPanel extends BaseComponent {
  @Prop() management!: any

  radioLabelName = ''
  labelFont: any
  labelFontWeight: any
  radioName = ''
  radioValue = ''
  toggleRadioRequired = false
  toggleRadioChecked = false

  onUpdateLabelName(name: any) {
    this.radioLabelName = name
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
    this.radioName = name
    this.onEmitData()
  }

  onUpdateValue(value: any) {
    this.radioValue = value
    this.onEmitData()
  }

  onUpdateRequired(required: any) {
    this.toggleRadioRequired = required
    this.onEmitData()
  }

  onUpdateChecked(checked: any) {
    this.toggleRadioChecked = checked
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.radioName) ? undefined : this.radioName,
      type: this.elementProps.type,
      value: _.isEmpty(this.radioValue) ? undefined : this.radioValue,
      required: this.toggleRadioRequired || false,
      checked: this.toggleRadioChecked || false,
      label: {
        name: _.isEmpty(this.radioLabelName) ? undefined : this.radioLabelName,
        font: _.isEmpty(this.labelFont) && _.isEmpty(this.labelFontWeight)
          ? undefined
          : { ...this.labelFont.font, ...this.labelFontWeight }
      }
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.radioLabelName = this.elementProps.label && this.elementProps.label.name ? this.elementProps.label.name : ''
        this.radioName = this.elementProps.name || ''
        this.radioValue = this.elementProps.value || ''
        this.toggleRadioRequired = this.elementProps.required || false
        this.toggleRadioChecked = this.elementProps.checked || false
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
