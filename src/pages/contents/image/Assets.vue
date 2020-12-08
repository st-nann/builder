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
            <img v-if="imageUrl" :src="imageUrl" class="image-preview"/> 
        </div>
        <div class="image-asset-content-search">
            <div class="search-input">
                <InputComponent
                    name="search-image"
                    placeholder="Search Image"
                    :search="true"
                    @change="doSearchImage"
                />
            </div>
            <div class="search-list">
                <div
                    v-for="(item, index) in imageLists"
                    :key="index"
                    class="search-list-item"
                    :class="{ 'clickable': !item.uploading }"
                    @click="item.uploading ? '' : doSelectImage(item.src)"
                >
                    <div class="search-list-item-image-container">
                        <img class="search-list-item-image" :src="item.src" />
                    </div>
                    <div class="search-list-item-detail">
                        <div v-if="item.uploading" class="image-uploading">
                            <div class="image-uploading-status">Uploading...</div>
                            <div class="image-uploading-progress"></div>
                        </div>
                        <div v-else class="image-complete">
                            <div class="image-name">{{ item.name }}</div>
                            <div class="image-size">{{ item.size }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="image-asset-action">
        <SquareButtonComponent
            label="Add Image"
            className="done-square-button"
            @click="onEmitAddImage"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { IMAGE_LISTS } from '../../../constants/Image'

@Component
export default class ImageAssetContent extends BaseComponent {
    imageUrl = ''

    get imageLists() {
        return IMAGE_LISTS
    }

    doSelectImage(src: string) {
        this.imageUrl = src
    }

    doSearchImage() {
        // search
    }

    onEmitAddImage() {
        this.$emit('click', {
            url: this.imageUrl,
            changeImage: false
        })
    }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
