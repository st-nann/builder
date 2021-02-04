<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-text-and-position">
      <div class="toolbar-panel-input">
        <InputComponent
          :name="`button-name-${elementId}`"
          label="Button Text"
          placeholder="Button"
          width="200"
          class="toolbar-panel-button-name"
          :value="buttonName"
          @change="onUpdateName"
        />
        <InputComponent
          :name="`button-link-${elementId}`"
          label="Link"
          placeholder="https://"
          width="300"
          class="toolbar-panel-button-link"
          :value="buttonLink"
          @change="onUpdateLink"
        />
      </div>
      <div class="toolbar-panel-button">
        <GroupButtonComponent
          name="button-horizontal-position"
          :value="{ 'button-horizontal-position': justifyImage }"
          :options="horizontalPositionOptions"
          @change="onUpdateHorizontalPosition"
        />
      </div>
    </div>
    <div class="toolbar-panel-style">
      <BackgroundStyleComponent
        v-bind="$props"
        :name="`toolbar-panel-button-background-${elementId}`"
        :management="management"
        label="Background Color"
        customKeyValue="button-background-color"
        @change="onUpdateButtonBackgroundColor"
      />
      <FontStyleComponent
        v-bind="$props"
        :name="`toolbar-panel-button-font-${elementId}`"
        :management="management"
        customKeyValue="font"
        @change="onUpdateFont"
      />
      <RadiusStyleComponent
        v-bind="$props"
        :name="`toolbar-panel-button-radius-${elementId}`"
        :management="management"
        label="Radius"
        customKeyValue="border-radius"
        @change="onUpdateBorderRadius"
      />
      <BorderToggleStyleComponent
        v-bind="$props"
        :name="`toolbar-panel-button-border-${elementId}`"
        :management="management"
        class="toobar-panel-border"
        customKeyValue="border"
        label="Border"
        @change="onUpdateBorderButton"
      />
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash"
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { HORIZONTAL_POSITION_STYLE } from '../../constants/Style'

@Component
export default class CheckboxToolbarPanel extends BaseComponent {
  @Prop() management!: any

  buttonName = 'Button'
  buttonLink = ''
  buttonBackgroundColor: any
  buttonFont: any
  buttonRadius: any
  buttonBorder: any
  justifyImage = 'center'

  get horizontalPositionOptions() {
    return HORIZONTAL_POSITION_STYLE
  }

  onUpdateName(name: any) {
    this.buttonName = name
    this.onEmitData()
  }

  onUpdateLink(link: string) {
    this.buttonLink = link
    this.onEmitData()
  }

  onUpdateHorizontalPosition(position: string) {
    this.justifyImage = position
    this.onEmitData()
  }

  onUpdateButtonBackgroundColor(backgroundColor: any) {
    this.buttonBackgroundColor = backgroundColor
    this.onEmitData()
  }

  onUpdateFont(font: any) {
    this.buttonFont = font
    this.onEmitData()
  }

  onUpdateBorderRadius(radius: string) {
    this.buttonRadius = radius
    this.onEmitData()
  }

  onUpdateBorderButton(border: any) {
    this.buttonBorder = border
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      name: _.isEmpty(this.buttonName) ? undefined : this.buttonName,
      link: _.isEmpty(this.buttonLink) ? undefined : this.buttonLink,
      ...this.buttonBackgroundColor,
      ...this.buttonFont,
      ...this.buttonRadius,
      ...this.buttonBorder,
      width: this.elementProps.width,
      flexbox: _.isEmpty(this.justifyImage)
        ? undefined
        : { 'justify-content': this.justifyImage }
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        const haveFlexbox = this.elementProps.flexbox
        const flexbox = _.cloneDeep(this.elementProps.flexbox)
        this.buttonName = this.elementProps.name || 'Button'
        this.buttonLink = this.elementProps.link || ''
        if (haveFlexbox) {
          this.justifyImage = _.isEmpty(flexbox['justify-content'])
            ? 'center'
            : flexbox['justify-content']
        }
      }
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
