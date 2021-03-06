<template>
  <span
    :style="`
      width: ${elementScreen.mobile ? 'calc(100%)' : 'calc(0%)'};
      flex-grow: ${elementProps.flexbox && elementProps.flexbox['flex-grow'] ? elementProps.flexbox['flex-grow'] : 1 };
    `"
  >
    <BoxComponent
      v-bind="$props"
      :management="management"
      :style="containerStyle"
      @click="doEmitAddElement"
    >
      <template slot="content">
        <img
          v-if="elementProps.url"
          :src="elementProps.url"
          class="image-content"
          :style="[
            propsAlignStyle,
            propsJustifyStyle,
            {
              width: elementProps.width || '100%;',
              'max-width': elementProps['max-width'] || '350px',
            }
          ]"
        />
      </template>
      <template slot="button-management">
        <MainButtonComponent
          v-bind="$props"
          :management="management"
          class="button-box"
          @click="onUpdateManagement"
          @change="onUpdateScale"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: changeImage ? 50 : 65, height: changeImage ? 70 : 75, action: 'edit', button: { custom: true } }"
    >
      <template slot="content">
        <div class="modal-content-image">
          <ImageAssetContent
            v-show="changeImage"
            ref="assets"
            :changeImage="changeImage"
            :imageUrl="imageUrl"
            @click="onUpdateChangeImage"
          />
          <div v-show="!changeImage">
            <ImageToolbarPanel
              v-bind="$props"
              :management="management"
              :imageUrl="imageUrl"
              @change="getImageData"
            />
            <div :id="`image-container-preview-${elementId}`" class="image-preview-container">
              <img
                v-if="imageUrl"
                :id="`image-preview-${elementId}`"
                :src="imageUrl"
                class="image-preview"
              />
              <div v-else class="no-image">
                <i class="mdi mdi-image-plus no-image-icon" />
                <p class="no-image-text">click the below button to add image</p>
                <SquareButtonComponent
                  label="Browse"
                  className="no-image-button clickable"
                  @click="doAddImage"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="action-custom">
        <div v-show="changeImage" class="image-asset-action">
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
        <FooterPanel
          v-show="!changeImage"
          v-bind="$props"
          :isFooterStyle="true"
          :management="management"
          :imageUrl="imageUrl"
          @change="onUpdatePreview"
          @click="onUpdateFooterPanelData"
          @cancel="onUpdateCancel"
        />
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Watch } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../core/BaseComponent'
import { ENV } from '../constants/Env'

@Component({
  computed: {
    ...mapGetters('authentication', {   
      loginResponse: 'login',
      loginInfo: 'loginInfo'
    })
  },
  methods: {
    ...mapActions('authentication', [
      'login',
      'getLoginData'
    ])
  }
})
export default class ImagePage extends BaseComponent {
  management: any = {}
  imageData: any = {}
  imageUrl = ''
  loginResponse!: any
  loginInfo!: any

  get havePropData() {
    return localStorage['storage-baseurl'] && localStorage['storage-token']
  }

  get containerStyle() {
    const style = {}
    if (this.elementProps.flexbox) {
      Object.assign(style, { ...this.elementProps.flexbox })
    }
    // if (this.elementProps.url) {
    //   Object.assign(style, { 'min-height': 'auto' })
    // }
    return style
  }

  get propsAlignStyle() {
    let style = ''
    if (this.elementProps.flexbox) {
      if (this.elementProps.flexbox['align-items']) {
        switch (this.elementProps.flexbox['align-items']) {
          case 'flex-start':
            style = 'margin-bottom: 10px;'
            break
          case 'center':
            style = 'margin: 10px 0;'
            break
          case 'flex-end':
            style = 'margin-top: 10px;'
            break
          default:
            style = ''
            break
        }
      }
    }
    return style
  }

  get propsJustifyStyle() {
    let style = ''
    if (this.elementProps.flexbox) {
      if (this.elementProps.flexbox['justify-content']) {
        switch (this.elementProps.flexbox['justify-content']) {
          case 'flex-start':
            style = 'margin-right: 10px;'
            break
          case 'center':
            style = 'margin: 10px 0;'
            break
          case 'flex-end':
            style = 'margin-left: 10px;'
            break
          default:
            style = ''
            break
        }
      }
    }
    return style
  }

  login!: (payload: { data: { email: string, password: string } }) => void
  getLoginData!: (payload: { headers: { ref: string } }) => void

  async created() {
    if (_.isUndefined(this.havePropData)) {
      await this.login({
        data: {
          email: ENV.ADMIN_USERNAME_STORAGE,
          password: ENV.ADMIN_PASSWORD_STORAGE
        }
      })
    }
  }

  getImageData(data: any) {
    this.imageData = { ...data }
    Object.assign(this.data, this.imageData)
    this.doAssignStyle()
  }

  doEmitCancel() {
    this.$refs.assets.doEmitCancel()
  }

  doEmitGetImage() {
    this.$refs.assets.doEmitGetImage()
  }

  onUpdateChangeImage(data: any) {
    this.changeImage = data.changeImage
    if (data.url) {
      this.imageUrl = data.url
      Object.assign(this.data, { url: this.imageUrl })
    }
    this.doAssignStyle()
  }

  doAssignStyle() {
    Object.assign(this.previewData, this.imageData)
    const previewContainerStyle: any = {}
    const previewImageStyle: any = {}
    if (JSON.stringify(this.previewData) !== '{}') {
      const border = this.previewData['border-bottom']
      const backgroundColor = this.previewData['background-color']
      const maxWidth = this.previewData['max-width']
      const width = this.previewData.width
      const justify = this.previewData.flexbox ? this.previewData.flexbox['justify-content'] : ''
      const align = this.previewData.flexbox ? this.previewData.flexbox['align-items'] : ''
      if (border) { previewContainerStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewContainerStyle['background-color'] = backgroundColor }
      if (maxWidth) { previewImageStyle['max-width'] = maxWidth }
      if (width) { previewImageStyle.width = width }
      if (justify) { previewContainerStyle['justify-content'] = justify }
      if (align) { previewContainerStyle['align-items'] = align }
    }
    this.doSetAttributeStyle(`image-container-preview-${this.elementId}`, previewContainerStyle)
    this.doSetAttributeStyle(`image-preview-${this.elementId}`, previewImageStyle)
  }

  doAddImage() {
    this.changeImage = true
  }

  async doGetLoginInfo() {
    if (this.loginResponse) {
      await this.getLoginData({ headers: { ref: this.loginResponse.ref } })
    }
    const self = this
    const timeout = setTimeout(() => {
      if (self.loginInfo.message) {
        self.doGetLoginInfo()
      } else {
        localStorage['storage-token'] = self.loginInfo.token
        clearInterval(timeout)
      }
    }, 1000)
  }

  @Watch('previewData', { deep: true })
  onUpdatePreviewData() {
    this.doAssignStyle()
  }

  @Watch('action', { deep: true })
  onEdit() {
    const ref = this.$refs[`modal-edit-${this.elementId}`]
    if (ref) {
      this.management = this.action
      ref.isOpenModal = this.management.edit
      if (ref.isOpenModal && this.elementProps) {
        this.imageUrl = this.elementProps.url
        if (this.elementProps.url) {
          this.changeImage = true
        }
      }
      if (_.isUndefined(this.havePropData)) {
        this.doGetLoginInfo()
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
