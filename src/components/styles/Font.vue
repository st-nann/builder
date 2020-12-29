<template>
  <span>
    <DropdownComponent
      :name="`${name}-font-family-${elementId}`"
      :value="fontName"
      :options="fontNameOptions"
      label="Font"
      width="100"
      @change="onUpdateFontName"
    />
    <DropdownComponent
      :name="`${name}-font-size-${elementId}`"
      :value="fontSize"
      :options="fontSizeOptions"
      width="50"
      @change="onUpdateFontSize"
    />
    <ColorPickerComponent
      :name="`${name}-font-color-${elementId}`"
      :value="fontColor"
      @change="onUpdateFontColor"
    />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { FONT_STYLE } from '../../constants/Style'

@Component
export default class FontStyleComponent extends BaseComponent {
  @Prop() management!: any
  
  fontName = 'Arial'
  fontSize = '15'
  fontColor = '#000000'

  get fontNameOptions() {
    let lists: any = FONT_STYLE
    lists = lists.map((item: any) => {
      return { label: item, value: item }
    })
    return lists
  }

  get fontSizeOptions() {
    const lists: any = []
    for (let i = 15; i < 40; i++) {
      lists.push({ label: `${i}px`, value: `${i}` })
    }
    return lists
  }

  doAssignDefaultData() {
    this.fontName = 'Arial'
    this.fontSize = '15'
    this.fontColor = '#000000'
  }

  doAssignPropData() {
    const haveFont = this.elementProps && this.elementProps[this.customKeyValue]
    if (haveFont) {
      const font = _.cloneDeep(this.elementProps[this.customKeyValue])
      this.fontName = font['font-family']
      this.fontSize = font['font-size'].substring(0, font['font-size'].length - 2)
      this.fontColor = font.color
    } else {
      this.doAssignDefaultData()
    }
    return haveFont
  }

  onUpdateFontName(name: any) {
    this.fontName = name
    this.onEmitData()
  }

  onUpdateFontSize(size: any) {
    this.fontSize = size
    this.onEmitData()
  }

  onUpdateFontColor(color: any) {
    this.fontColor = color
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      [this.customKeyValue]: {
        'font-family': !_.isEmpty(this.fontName) ? this.fontName : undefined,
        'font-size': !_.isEmpty(this.fontSize) ? `${this.fontSize}px` : undefined,
        color: !_.isEmpty(this.fontColor) ? this.fontColor : undefined
      }
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      this.doAssignPropData()
      this.onEmitData()
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>


