<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-textarea-container">
      <div class="toolbar-panel-label">
        <InputComponent
          :name="`textarea-label-name-${elementId}`"
          label="Label"
          placeholder="Label"
          width="200"
          class="toolbar-panel-textarea-label-name"
          :value="textareaLabelName"
          @change="onUpdateLabelName"
        />
        <FontStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-textarea-label-font-${elementId}`"
          :management="management"
          customKeyValue="font"
          @change="onUpdateLabelFont"
        />
        <FontWeightStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-textarea-label-font-weight-${elementId}`"
          :management="management"
          label="Font Weight"
          customKeyValue="font-weight"
          @change="onUpdateLabelFontWeight"
        />
      </div>
      <div class="toolbar-panel-textarea-attribute">
        <InputComponent
          :name="`textarea-name-${elementId}`"
          label="Name"
          placeholder="Name"
          width="200"
          class="toolbar-panel-textarea-name"
          :value="textareaName"
          @change="onUpdateName"
        />
        <InputComponent
          :name="`textarea-placeholder-${elementId}`"
          label="Placeholder"
          placeholder="Placeholder"
          width="200"
          class="toolbar-panel-textarea-placeholder"
          :value="textareaPlaceholder"
          @change="onUpdatePlaceholder"
        />
        <SwitchComponent
          :name="`textarea-required-${elementId}`"
          :value="toggleInputRequired"
          class="toolbar-panel-textarea-required"
          label="Required"
          @change="onUpdateRequired"
        />
      </div>
      <div class="toolbar-panel-textarea-style">
        <RadiusStyleComponent
          v-bind="$props"
          :name="`toolbar-panel-textarea-radius-${elementId}`"
          :management="management"
          label="Radius"
          customKeyValue="border-radius"
          @change="onUpdateBorderRadius"
        />
        <InputComponent
          :name="`textarea-column-${elementId}`"
          label="Column (Width)"
          placeholder="Column (Width)"
          width="50"
          class="toolbar-panel-textarea-column"
          :value="textareaCols"
          @change="onUpdateCols"
        />
        <InputComponent
          :name="`textarea-row-${elementId}`"
          label="Row (Height)"
          placeholder="Row (Height)"
          width="50"
          class="toolbar-panel-textarea-row"
          :value="textareaRows"
          @change="onUpdateRows"
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
export default class TextareaToolbarPanel extends BaseComponent {
  @Prop() management!: any

  textareaLabelName = ''
  labelFont: any
  labelFontWeight: any
  textareaName = ''
  textareaPlaceholder = ''
  toggleInputRequired = false
  textareaRadius: any
  textareaCols = 50
  textareaRows = 5

  onUpdateLabelName(name: any) {
    this.textareaLabelName = name
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
    this.textareaName = name
    this.onEmitData()
  }

  onUpdatePlaceholder(placeholder: any) {
    this.textareaPlaceholder = placeholder
    this.onEmitData()
  }

  onUpdateRequired(required: any) {
    this.toggleInputRequired = required
    this.onEmitData()
  }

  onUpdateBorderRadius(radius: string) {
    this.textareaRadius = radius
    this.onEmitData()
  }

  onUpdateCols(cols: any) {
    this.textareaCols = cols
    this.onEmitData()
  }

  onUpdateRows(rows: any) {
    this.textareaRows = rows
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.textareaName) ? undefined : this.textareaName,
      placeholder: _.isEmpty(this.textareaPlaceholder) ? undefined : this.textareaPlaceholder,
      required: this.toggleInputRequired || false,
      height: this.elementProps.height,
      cols: _.isEmpty(this.textareaCols) ? 50 : this.textareaCols,
      rows: _.isEmpty(this.textareaRows) ? 5 : this.textareaRows,
      label: {
        name: _.isEmpty(this.textareaLabelName) ? undefined : this.textareaLabelName,
        font: _.isEmpty(this.labelFont) && _.isEmpty(this.labelFontWeight)
          ? undefined
          : { ...this.labelFont.font, ...this.labelFontWeight }
      },
      ...this.textareaRadius
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        this.textareaLabelName = this.elementProps.labe && this.elementProps.label.name ? this.elementProps.label.name : ''
        this.textareaName = this.elementProps.name || ''
        this.textareaPlaceholder = this.elementProps.placeholder || ''
        this.textareaCols = this.textareaCols || 50
        this.textareaRows = this.textareaRows || 5
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
