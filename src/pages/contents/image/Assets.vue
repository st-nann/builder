<template>
  <div class="image-asset">
    <div class="image-asset-header">
        <h2 class="image-asset-header-title">Image Assets</h2>
        <div class="image-asset-header-upload">
            <UploadImageComponent @change="onUploadImage" :disabled="uploadLists.length > 0 || loading === undefined || loading" />
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
                    :name="`search-image-${elementId}`"
                    placeholder="Search Image"
                    :search="true"
                    @change="doFilterImages"
                />
            </div>
            <div class="search-list">
                <div v-if="loading && uploading || loading === undefined" class="loading-container">
                    <div class="loading" />
                </div>
                <div v-else-if="filterImageLists.length < 1" class="no-image-lists">
                    No image available
                </div>
                <div v-else>
                    <div v-if="uploadLists.length > 0">
                        <div
                            v-for="(item, index) in uploadLists"
                            :key="index"
                            class="search-list-item"
                        >
                            <div class="search-list-item-image-container">
                                <img class="search-list-item-image" :src="item.url" />
                            </div>
                            <div class="search-list-item-detail">
                                <div class="image-uploading">
                                    <div class="image-uploading-status">Uploading...</div>
                                    <div class="image-uploading-progress">
                                        <progress max="100" :value.prop="uploadPercent[item.name] || 0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-for="(item, index) in filterImageLists"
                        :key="index"
                        :class="[
                            'search-list-item',
                            {
                                'clickable': !item.uploading,
                                'search-list-item-active': item.url === url
                            }
                        ]"
                        @click="item.uploading ? '' : doSelectImage(item.url)"
                    >
                        <div class="search-list-item-image-container">
                            <div v-if="loadingImage && index === 0"/>
                            <img v-else class="search-list-item-image" :src="`${item.url}`" />
                        </div>
                        <div class="search-list-item-detail">
                            <div class="image-complete">
                                <div class="image-name">{{ item.title }}</div>
                                <div class="image-size">{{ doConvertImageSize(item.size) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../../../core/BaseComponent'
import { IImageLists, IImageItem } from '../../../interfaces/Image'
import { AlertMsgError } from '../../../plugins/alert/Alert'
import { IUploadImageRequest } from '../../../third-party/interfaces/HttpRequest'

@Component({
    computed: {
        ...mapGetters('components', {
            loadingLists: 'loading'
        }),
        ...mapGetters('authentication', {
            loginInfo: 'loginInfo'
        }),
        ...mapGetters('images', {
            imageLists: 'lists',
            uploadPercent: 'uploadPercent',
            uploadLists: 'uploadLists'
        })
    },
    methods: {
        ...mapActions('images', [
            'getImages',
            'uploadImage',
            'updateUploadLists'
        ])
    }
})
export default class ImageAssetContent extends BaseComponent {
    @Prop(Boolean) changeImage!: boolean
    @Prop(String) imageUrl!: string

    uploading = true
    loadingImage = false
    url = this.imageUrl
    filterImageLists: IImageItem[] = []

    uploadPercent!: { [key: string]: number }[]
    loadingLists!: any
    loginInfo!: any
    imageLists!: IImageLists
    uploadLists!: object[]

    getImages!: (payload: { params: { page?: string, limit?: number } }) => any
    uploadImage!: (payload: { data: { file: any } }) => any
    updateUploadLists!: (payload: { data: any }) => any

    get havePropData() {
        return localStorage['storage-baseurl'] && localStorage['storage-token']
    }

    get loading() {
        const lists = this.loadingLists?.reduce((value1: any, value2: any) => Object.assign(value1, value2), {})
        return this.havePropData
            ? lists['images/LISTS']
            : (
                lists['authentication/LOGIN'] ||
                lists['authentication/LOGIN_INFORMATION']||
                lists['images/LISTS']
            )
    }

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

    doFilterImages(data: any = '') {
        this.filterImageLists = this.imageLists.items.filter(
            (item: IImageItem) => _.includes(_.toLower(item.title), _.toLower(data))
        )
    }

    async onUploadImage(value: IUploadImageRequest) {
        if (_.isUndefined(value.message)) {
            this.uploading = false
            await this.updateUploadLists({ data: _.concat(this.uploadLists, [value]) })
            await this.uploadImage({ data: value })
            this.doGetLoopImage()
        } else {
            AlertMsgError({
                title: 'Can\'t Upload Image',
                text: value.message
            })
        }
    }

    async doGetLoopImage() {
        this.$nextTick(() => {
            _.forEach(this.uploadLists, async (item: any) => {
                await this.getImages({ params: { limit: 9999999 } })
                if (!_.isEmpty(this.uploadPercent[item.name])) {
                    const percent: any = this.uploadPercent[item.name]
                    if (percent < 100) { this.doGetLoopImage() }
                }
                this.loadingImage = true
                await this.updateUploadLists({ data: [] }) 
                await this.doFilterImages()
                setTimeout(() => { this.loadingImage = false }, 1)
            })
        })
    }

    doEmitGetImage() {
        this.$emit('click', { url: this.url, changeImage: false })
    }

    doEmitCancel() {
        this.$emit('click', { changeImage: false })
    }

    @Watch('loginInfo', { deep: true })
    async onHaveLoginInfo() {
        if (this.loginInfo.token) {
            await this.getImages({ params: { limit: 9999999 } })
            this.doFilterImages()
        }
    }

    @Watch('changeImage')
    async onChangeImage() {
        if (this.changeImage && this.havePropData) {
            await this.getImages({ params: { limit: 9999999 } })
            this.doFilterImages()
        }
    }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
