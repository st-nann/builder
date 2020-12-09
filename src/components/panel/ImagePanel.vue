<template>
    <div v-if="imageUrl !== ''" class="toolbar-panel">
        <div class="toolbar-panel-input">
        <WidthStyleComponent
            class="toobar-panel-image-width"
            :elementProps="elementProps"
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
            :value="justifyImage"
            @change="onUpdateVerticalPosition"
        />
        <ButtonGroupComponent
            name="image-horizental-position"
            :options="horizentalPositionOptions"
            :value="alignImage"
            @change="onUpdateHorizentalPosition"
        />
        </div>
    </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { VERTICAL_POSITION_STYLE, HORIZENTAL_POSITION_STYLE } from '../../constants/Style'

@Component
export default class ImageToolbarPanel extends BaseComponent {
    @Prop() elementProps!: any
    @Prop(String) imageUrl!: string
    @Prop() management!: any
    
    imageWidth: any
    imageLink = ''
    justifyImage = 'center'
    alignImage = 'center'

    get horizentalPositionOptions() {
        return HORIZENTAL_POSITION_STYLE
    }

    get verticalPositionOptions() {
        return VERTICAL_POSITION_STYLE
    }

    onUpdateWidth(width: any) {
        this.imageWidth = width
        if (width) { this.onEmitData() }
    }

    onUpdateLink(link: string) {
        this.imageLink = link
        if (link) { this.onEmitData() }
    }

    onUpdateVerticalPosition(position: string) {
        this.alignImage = position
        if (position) { this.onEmitData() }
    }

    onUpdateHorizentalPosition(position: string) {
        this.justifyImage = position
        if (position) { this.onEmitData() }
    }

    onEmitData() {
        this.$emit('change', {
            ...this.imageWidth,
            link: _.isEmpty(this.imageLink) ? undefined : this.imageLink,
            flexbox: _.isEmpty(this.justifyImage) && _.isEmpty(this.alignImage)
                ? undefined
                : {
                    'justify-content': this.justifyImage,
                    'align-item': this.alignImage
                }
        })
    }

    @Watch('management.edit')
    onEdit() {
        if (this.management.edit) {
            if (this.elementProps) {
                this.imageLink = this.elementProps.link ? this.elementProps.link : ''
                this.justifyImage = this.elementProps.flexbox && _.cloneDeep(this.elementProps.flexbox)['justify-content']
                    ? _.cloneDeep(this.elementProps.flexbox)['justify-content']
                    : 'center'
                this.alignImage = this.elementProps.flexbox && _.cloneDeep(this.elementProps.flexbox)['align-item']
                    ? _.cloneDeep(this.elementProps.flexbox)['align-item']
                    : 'center'
            }
            this.onEmitData()
        }
    }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
