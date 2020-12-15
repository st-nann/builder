<template>
  <div class="image-asset">
    <div class="image-asset-header">
        <h2 class="image-asset-header-title">Image Assets</h2>
        <div class="image-asset-header-upload">
            <UploadImageComponent />
            <div class="image-asset-header-upload-description">
                * File size must be less then 2 MB
            </div>
        </div>
    </div>
    <div class="image-asset-content">
        <div class="image-asset-content-preview">
            <div class="preview-text">Preview</div>
            <img v-if="url" :src="url" class="image-preview"/> 
        </div>
        <div class="image-asset-content-search">
            <div class="search-input">
                <InputComponent
                    name="search-image"
                    placeholder="Search Image"
                    :search="true"
                    @change="doGetImages"
                />
            </div>
            <div class="search-list">
                <div
                    v-for="(item, index) in filterImageLists"
                    :key="index"
                    class="search-list-item"
                    :class="{
                        'clickable': !item.uploading,
                        'search-list-item-active': item.url === url
                    }"
                    @click="item.uploading ? '' : doSelectImage(item.url)"
                >
                    <div class="search-list-item-image-container">
                        <img class="search-list-item-image" :src="item.url" />
                    </div>
                    <div class="search-list-item-detail">
                        <div v-if="!item.uploading" class="image-uploading">
                            <div class="image-uploading-status">Uploading...</div>
                            <div class="image-uploading-progress">
                                <progress max="100" :value.prop="uploadPercentage" />
                            </div>
                        </div>
                        <div v-else class="image-complete">
                            <div class="image-name">{{ item.title }}</div>
                            <div class="image-size">{{ doConvertImageSize(item.size) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="image-asset-action">
        <SquareButtonComponent
            label="Cancel"
            className="cancel-square-button"
            @click="doEmitCancel"
        />
        <SquareButtonComponent
            label="Add Image"
            className="done-square-button"
            @click="doEmitGetImage"
        />
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { IImageLists, IImageItem } from '../../../interfaces/Image'
import { IMAGE_LISTS } from '../../../constants/Image'

@Component
export default class ImageAssetContent extends BaseComponent {
    @Prop(Boolean) changeImage!: boolean
    @Prop(String) imageUrl!: string
    
    url = this.imageUrl
    imageLists: IImageLists = _.cloneDeep(IMAGE_LISTS) // api data
    filterImageLists: IImageItem[] = this.imageLists.items

    doConvertImageSize(size: number) {
        let transformSize: any = '0 byte'
        if (size >= 1048576) { transformSize = (size / 1048576).toFixed(2) + ' MB' }
        else if (size >= 1024) { transformSize = (size / 1024).toFixed(2) + ' KB' }
        else if (size > 1) { transformSize = size + ' bytes' }
        else if (size == 1) { transformSize = size + ' byte' }
        return transformSize
    }

    doSelectImage(url: string) {
        this.url = url
    }

    doGetImages(data: any = '') {
        this.filterImageLists = this.imageLists.items.filter(
            (item: IImageItem) => _.includes(_.toLower(item.title), _.toLower(data))
        )
    }

    doEmitGetImage() {
        this.$emit('click', { url: this.url, changeImage: false })
    }

    doEmitCancel() {
        this.$emit('click', { changeImage: false })
    }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
