<template>
  <span
    :style="elementProps.flexbox && elementProps.flexbox['flex-grow']
      ? `flex-grow: ${elementProps.flexbox['flex-grow']}`
      : ''"
  >
    <BoxComponent
      :elementName="elementName"
      :elementProps="elementProps"
      :management="management"
      :style="containerStyle"
      @click="doEmitAddElement"
      @change="onUpdateScale"
    >
      <template slot="content">
        <img
          v-if="elementProps.url"
          class="image-content"
          :src="elementProps.url"
          :width="elementProps.width || '100%'"
          :style="propsStyle"
        />
      </template>
      <template slot="button-management">
        <MainButtonComponent
          class="button-box"
          :elementId="elementId"
          :elementName="elementName"
          @click="onUpdateManagement"
        />
      </template>
    </BoxComponent>
    <ModalComponent
      :ref="`modal-edit-${elementId}`"
      :modal="{ width: changeImage ? 900 : 1000, action: 'edit', button: { custom: true } }"
      :elementId="elementId"
    >
      <template slot="content">
        <div class="modal-content-image">
          <ImageAssetContent
            v-show="changeImage"
            :changeImage="changeImage"
            :imageUrl="imageUrl"
            @click="onUpdateChangeImage"
          />
          <div v-show="!changeImage">
            <ImageToolbarPanel
              :elementId="elementId"
              :elementProps="elementProps"
              :management="management"
              :imageUrl="imageUrl"
              @change="getImageData"
            />
            <div :id="`image-container-preview-${elementId}`" class="image-preview-container">
              <img
                :id="`image-preview-${elementId}`"
                v-if="imageUrl"
                class="image-preview"
                :src="imageUrl"
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
        <FooterPanel
          v-show="!changeImage"
          :elementId="elementId"
          :elementName="elementName"
          :elementProps="elementProps"
          :management="management"
          :imageUrl="imageUrl"
          @change="onUpdatePreview"
          @click="onUpdateFooterPanelData"
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
    ...mapGetters('images', {   
      loginResponse: 'login',
      loginInfo: 'loginInfo'
    })
  },
  methods: {
    ...mapActions('images', [
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

  get containerStyle() {
    const style = {}
    if (this.elementProps.flexbox) {
      Object.assign(style, { ...this.elementProps.flexbox })
    }
    if (this.elementProps.url) {
      Object.assign(style, { 'min-height': 'auto' })
    }
    return style
  }

  get propsStyle() {
    let style = ''
    if (this.elementProps.flexbox) {
      if (this.elementProps.flexbox['align-items']) {
        switch (this.elementProps.flexbox['align-items']) {
          case 'flex-start':
            style = 'margin-bottom: 100px;'
            break
          case 'center':
            style = 'margin: 100px 0;'
            break
          case 'flex-end':
            style = 'margin-top: 100px;'
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
    if (_.isEmpty(ENV.TOKEN_IMAGE_STORAGE)) {
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
      const width = this.previewData.width
      const justify = this.previewData.flexbox ? this.previewData.flexbox['justify-content'] : ''
      const align = this.previewData.flexbox ? this.previewData.flexbox['align-items'] : ''
      if (border) { previewContainerStyle['border-bottom'] = `${border.width} ${border.style} ${border.color}` }
      if (backgroundColor) { previewContainerStyle['background-color'] = backgroundColor }
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
        clearInterval(timeout)
        localStorage['authorization'] = self.loginInfo.token
      }
    }, 500)
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
      this.doGetLoginInfo()
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/Main.scss';
</style>
