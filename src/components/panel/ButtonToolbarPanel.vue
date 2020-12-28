<template>
  <div class="toolbar-panel">
    <div class="toolbar-panel-text-and-position">
      <div class="toolbar-panel-input">
        <InputComponent
          name="button-name"
          class="toolbar-panel-button-name"
          label="Button Text"
          placeholder="Button"
          width="200"
          :value="buttonName"
          @change="onUpdateName"
        />
        <InputComponent
          name="button-link"
          class="toolbar-panel-button-link"
          label="Link"
          placeholder="https://"
          width="300"
          :value="buttonLink"
          @change="onUpdateLink"
        />
      </div>
      <div class="toolbar-panel-button">
        <GroupButtonComponent
          name="button-horizontal-position"
          :options="horizontalPositionOptions"
          :value="{ 'button-horizontal-position': justifyImage }"
          @change="onUpdateHorizontalPosition"
        />
      </div>
    </div>
    <div class="toolbar-panel-style">
      <BackgroundStyleComponent
        :name="`toolbar-panel-button-background-${elementId}`"
        label="Background Color"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        customKeyValue="background"
        @change="onUpdateButtonBackgroundColor"
      />
      <FontStyleComponent
        :name="`toolbar-panel-button-font-${elementId}`"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        customKeyValue="font"
        @change="onUpdateFont"
      />
      <RadiusStyleComponent
        :name="`toolbar-panel-button-radius-${elementId}`"
        label="Radius"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        customKeyValue="border-radius"
        @change="onUpdateBorderRadius"
      />
      <BorderToggleStyleComponent
        :name="`toolbar-panel-button-border-${elementId}`"
        class="toobar-panel-border"
        label="Border"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        customKeyValue="border"
        @change="onUpdateBorderButton"
      />
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { HORIZONTAL_POSITION_STYLE } from '../../constants/Style'

@Component
export default class ButtonToolbarPanel extends BaseComponent {
  @Prop() management!: any;

  buttonName = 'Button';
  buttonLink = '';
  buttonBackgroundColor: any;
  buttonFont: any;
  buttonRadius: any;
  buttonBorder: any;
  justifyImage = 'center';

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
      flexbox: _.isEmpty(this.justifyImage)
        ? undefined
        : { 'justify-content': this.justifyImage }
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        const haveFlexbox = this.elementProps.flexbox;
        const flexbox = _.cloneDeep(this.elementProps.flexbox);
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
