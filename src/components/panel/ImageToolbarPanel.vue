<template>
  <div v-show="imageUrl && imageUrl !== ''" class="toolbar-panel">
    <div class="toolbar-panel-input">
      <WidthStyleComponent
        class="toobar-panel-image-width"
        :elementId="elementId"
        :elementProps="elementProps"
        :management="management"
        @change="onUpdateWidth"
      />
    </div>
    <div class="toolbar-panel-button">
      <InputComponent
        name="image-link"
        class="toolbar-panel-image-link"
        label="Link"
        placeholder="https://"
        width="350"
        :value="imageLink"
        @change="onUpdateLink"
      />
      <ButtonGroupComponent
        name="image-vertical-position"
        :options="verticalPositionOptions"
        :value="{ 'image-vertical-position': alignImage }"
        @change="onUpdateVerticalPosition"
      />
      <ButtonGroupComponent
        name="image-horizental-position"
        :options="horizentalPositionOptions"
        :value="{ 'image-horizental-position': justifyImage }"
        @change="onUpdateHorizentalPosition"
      />
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import {
  VERTICAL_POSITION_STYLE,
  HORIZENTAL_POSITION_STYLE,
} from '../../constants/Style'

@Component
export default class ImageToolbarPanel extends BaseComponent {
  @Prop(String) imageUrl!: string;
  @Prop() management!: any;

  imageWidth: any;
  imageLink = '';
  justifyImage = '';
  alignImage = '';

  get horizentalPositionOptions() {
    return HORIZENTAL_POSITION_STYLE
  }

  get verticalPositionOptions() {
    return VERTICAL_POSITION_STYLE
  }

  onUpdateWidth(width: any) {
    this.imageWidth = width
    this.onEmitData()
  }

  onUpdateLink(link: string) {
    this.imageLink = link
    this.onEmitData()
  }

  onUpdateVerticalPosition(position: string) {
    this.alignImage = position
    this.onEmitData()
  }

  onUpdateHorizentalPosition(position: string) {
    this.justifyImage = position
    this.onEmitData()
  }

  onEmitData() {
    this.$emit('change', {
      ...this.imageWidth,
      link: _.isEmpty(this.imageLink) ? undefined : this.imageLink,
      flexbox:
        _.isEmpty(this.justifyImage) && _.isEmpty(this.alignImage)
          ? undefined
          : {
              'justify-content': this.justifyImage,
              'align-items': this.alignImage,
            },
    })
  }

  @Watch('management.edit')
  onEdit() {
    if (this.management.edit) {
      if (this.elementProps) {
        const haveFlexbox = this.elementProps.flexbox;
        const flexbox = _.cloneDeep(this.elementProps.flexbox);
        this.imageLink = this.elementProps.link || ''
        if (haveFlexbox) {
          this.justifyImage = _.isEmpty(flexbox['justify-content'])
            ? ''
            : flexbox['justify-content']
          this.alignImage = _.isEmpty(flexbox['align-items'])
            ? ''
            : flexbox['align-items']
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
