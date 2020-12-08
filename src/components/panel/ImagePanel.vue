<template>
    <div class="toolbar-panel">
        <div class="toolbar-panel-input">
        <WidthStyleComponent
            class="toobar-panel-image-width"
            :elementProps="elementProps"
            @change="onUpdateWidth"
        />
        <InputComponent
            name="image-link"
            class="toolbar-panel-image-link"
            label="Link"
            placeholder="https://"
            width="350"
            :value="imageLink"
            @change="onUpdateLink"
        />
        </div>
        <div class="toolbar-panel-button">
        <ButtonGroupComponent
            :options="verticalPositionOptions"
            :value="justifyImage"
            @change="onUpdateVerticalPosition"
        />
        <ButtonGroupComponent
            :options="horizentalPositionOptions"
            :value="alignImage"
            @change="onUpdateHorizentalPosition"
        />
        </div>
    </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { VERTICAL_POSITION_STYLE, HORIZENTAL_POSITION_STYLE } from '../../constants/Style'

@Component
export default class ImageToolbarPanel extends BaseComponent {
    @Prop() elementProps!: any
    
    imageWidth = ''
    imageLink = ''
    justifyImage = 'center'
    alignImage = 'center'

    created() {
        if (this.elementProps) {
            if (this.elementProps.link) {
                this.imageLink = this.elementProps.link
            }
            if (this.elementProps.flexbox && _.cloneDeep(this.elementProps.flexbox)['justify-content']) {
                this.justifyImage = _.cloneDeep(this.elementProps.flexbox)['justify-content']
            }
            if (this.elementProps.flexbox && _.cloneDeep(this.elementProps.flexbox)['align-item']) {
                this.alignImage = _.cloneDeep(this.elementProps.flexbox)['align-item']
            }
        }
    }

    get horizentalPositionOptions() {
        return HORIZENTAL_POSITION_STYLE
    }

    get verticalPositionOptions() {
        return VERTICAL_POSITION_STYLE
    }

    onUpdateWidth(width: any) {
        this.imageWidth = width
        if (width) { this.doEmitData() }
    }

    onUpdateLink(link: string) {
        this.imageLink = link
        if (link) { this.doEmitData() }
    }

    onUpdateVerticalPosition(position: string) {
        this.alignImage = position
        if (position) { this.doEmitData() }
    }

    onUpdateHorizentalPosition(position: string) {
        this.justifyImage = position
        if (position) { this.doEmitData() }
    }

    doEmitData() {
        this.$emit('change', {
            width: _.isEmpty(this.imageWidth) ? undefined : this.imageWidth,
            link: _.isEmpty(this.imageLink) ? undefined : this.imageLink,
            flexbox: _.isEmpty(this.justifyImage) && _.isEmpty(this.alignImage)
                ? undefined
                : {
                    'justify-content': this.justifyImage,
                    'align-item': this.alignImage
                }
        })
    }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
