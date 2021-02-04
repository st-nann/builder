<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-checkbox-container">
      <div class="toolbar-panel-label">
        <InputComponent
          :name="`checkbox-label-name-${elementId}`"
          label="Label"
          placeholder="Label"
          width="200"
          class="toolbar-panel-checkbox-label-name"
          :value="checkboxLabelName"
          @change="onUpdateLabelName"
        />
        <FontStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-checkbox-label-font-${elementId}`"
          :management="management"
          customKeyValue="font"
          @change="onUpdateLabelFont"
        />
        <FontWeightStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-checkbox-label-font-weight-${elementId}`"
          :management="management"
          label="Font Weight"
          customKeyValue="font-weight"
          @change="onUpdateLabelFontWeight"
        />
      </div>
      <div class="toolbar-panel-checkbox-attribute">
        <InputComponent
          :name="`checkbox-name-${elementId}`"
          label="Name"
          placeholder="Name"
          width="200"
          class="toolbar-panel-checkbox-name"
          :value="checkboxName"
          @change="onUpdateName"
        />
        <InputComponent
          :name="`checkbox-value-${elementId}`"
          label="Value"
          placeholder="Value"
          width="200"
          class="toolbar-panel-checkbox-value"
          :value="checkboxValue"
          @change="onUpdateValue"
        />
        <SwitchComponent
          :name="`checkbox-required-${elementId}`"
          :value="toggleCheckboxRequired"
          class="toolbar-panel-checkbox-required"
          label="Required"
          @change="onUpdateRequired"
        />
        <SwitchComponent
          :name="`checkbox-checked-${elementId}`"
          :value="toggleCheckboxChecked"
          class="toolbar-panel-checkbox-checked"
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
export default class CheckboxToolbarPanel extends BaseComponent {
  @Prop() management!: any

  checkboxLabelName = ''
  labelFont: any
  labelFontWeight: any
  checkboxName = ''
  checkboxValue = ''
  toggleCheckboxRequired = false
  toggleCheckboxChecked = false

  onUpdateLabelName(name: any) {
    this.checkboxLabelName = name
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
    this.checkboxName = name
    this.onEmitData()
  }

  onUpdateValue(value: any) {
    this.checkboxValue = value
    this.onEmitData()
  }

  onUpdateRequired(required: any) {
    this.toggleCheckboxRequired = required
    this.onEmitData()
  }

  onUpdateChecked(checked: any) {
    this.toggleCheckboxChecked = checked
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.checkboxName) ? undefined : this.checkboxName,
      type: this.elementProps.type,
      value: _.isEmpty(this.checkboxValue) ? undefined : this.checkboxValue,
      required: this.toggleCheckboxRequired || false,
      checked: this.toggleCheckboxChecked || false,
      label: {
        name: _.isEmpty(this.checkboxLabelName) ? undefined : this.checkboxLabelName,
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
        this.checkboxLabelName = this.elementProps.label && this.elementProps.label.name ? this.elementProps.label.name : ''
        this.checkboxName = this.elementProps.name || ''
        this.checkboxValue = this.elementProps.value || ''
        this.toggleCheckboxRequired = this.elementProps.required || false
        this.toggleCheckboxChecked = this.elementProps.checked || false
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
