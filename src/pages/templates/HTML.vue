<template>
  <div
    :class="[
      'builder-container',
      {
        'enable-event': (screen.mobile || screen.desktop),
        'disable-event': !screen.mobile || screen.desktop
      }
    ]"
  >
    <div class="builder-container-header">
      <div class="builder-container-title">
        <span class="product-name">PAM </span>
        <span class="project-name">Message Builder</span>
      </div>

      <div class="builder-container-management">
        <SquareButtonComponent
          icon="code-braces-box"
          label="View JSON"
          className="view-json-square-button"
          @click="doOpenModal"
        />
        <ModalComponent
          ref="modal-view-json"
          :modal="{ width: 60, height: 60, button: { info: true, position: 'center' } }"
        >
          <template slot="content">
            <div class="json-viewer">
              <highlight-code lang="json">
                {{ templateJson }}
              </highlight-code>
              <i class="json-viewer-icon mdi mdi-content-copy" @click="doCopyJSON()" />
            </div>
          </template>
        </ModalComponent>
        <span class="vertical-line"> | </span>
        <ColorPickerComponent
          name="contanier-background"
          label="Background"
          :value="templateJson.background"
          @change="doGetBackgrondContainer"
        />
      </div>
    </div>

    <div class="builder-container-body">
      <div :class="{ 'content-mobile': screen.mobile, 'content-desktop': screen.desktop || !screen.mobile }">
        <div v-if="haveElementChild">
          <BuilderCanvas :screen="screen" :templateJson="templateJson" />
        </div>
        <div v-else class="box-start">
          <SquareMenuButtonComponent
            icon="plus-circle"
            label="Launch Template"
            className="start-square-menu-button"
            :options="menu"
            @click="doAddJson"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/Base'
import { EDirection } from '../../enum/Components'
import { EElementType } from '../../enum/Elements'
import { IScreen } from '../../interfaces/Components'
import { IContainer } from '../../interfaces/Template'
import { AlertMsgSuccess } from '../../plugins/alert/Alert'
import {
  CONTAINER_DEFAULT,
  TEXT_DEFAULT,
  IMAGE_DEFAULT,
  SPACER_DEFAULT,
  BUTTON_DEFAULT,
  BOX_DEFAULT,
} from '../../constants/Default'

@Component
export default class HTMLTemplate extends BaseComponent {
  @Prop() propTemplateJson!: IContainer

  element = ''
  haveElementChild = false
  screen: IScreen = { mobile: false, desktop: false }
  templateJson: IContainer = {
    id: uuidv4(),
    ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT'])
  }

  get menu() {
    return MENU
  }

  get elementType() {
    return [
      EElementType.TEXT,
      EElementType.IMAGE,
      EElementType.SPACER,
      EElementType.BUTTON,
      EElementType.BOX,
    ];
  }

  get defaultData(): any {
    return {
      CONTAINER_DEFAULT,
      TEXT_DEFAULT,
      IMAGE_DEFAULT,
      SPACER_DEFAULT,
      BUTTON_DEFAULT,
      BOX_DEFAULT
    }
  }

  created() {
    this.propTemplateJson = {"id":"e9736e40-966a-4264-8aa8-0010dc138473","element":EElementType.CONTAINER,"props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":EDirection.COLUMN}},"children":[{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"60e627a5-c96b-4214-bbb7-a74b7ef4f64f"}],"id":"2af53da5-3f95-4cff-a7bb-0245961d8341"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"845f643d-e543-4355-aa83-4fd1f4456204"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"73017cac-a961-4a73-bb96-71f6702de7c7"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"88242998-c235-41cf-bbd1-e887a928ae55"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"dabce8f9-5ef5-43f0-8389-fcb70b8ad5f4"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"d4b920d8-205f-472d-bf03-50e21114c8a6"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"This message contains graphics. If you do not see the graphics, "},{"insert":"click here to view.","attributes":{"link":"{{web_url}}"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"b69f6cbc-bb0b-45e3-b22c-4abf3d38c6ed"}],"id":"7d2dded0-066b-4fa0-b430-b199afdddaba"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"เทส2 "},{"insert":"เทสลิ้ง","attributes":{"link":"https://stg-new-cms.pams.ai/"}},{"insert":"\n","attributes":{"align":"center"}}]},"id":"44535871-29b7-4d3f-9a1f-0b4ae12db60b"}],"id":"5768e601-f8d6-4e4d-a63f-ca34b3194e5e"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"เทส2"},{"insert":"\n","attributes":{"align":"center"}}]},"id":"2c3a1284-14c8-4307-9ffb-abcc231a383f"},{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"เทส2"},{"insert":"\n","attributes":{"align":"center"}}]},"id":"41ec77f2-2bc8-4bca-8850-4addf3f8dbde"}],"id":"96f04718-b4f2-42d6-b2d3-854939d2d949"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"IMAGE","props":{"flexbox":{"align-items":"center","justify-content":"center","flex-grow":1},"url":"https://s3-ap-southeast-1.amazonaws.com/pam4-sansiri/ecom/public/1nGuDIf2VlN4rQDjBpIzPJb3iHo.jpg","compress":false},"id":"ae73d31f-4df1-4168-a3b3-22792b1d67ef"}],"id":"287c31e7-e05d-45fb-aa22-aa1dccf0da15"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"IMAGE","props":{"flexbox":{"align-items":"center","justify-content":"center","flex-grow":1},"width":"350px","url":"https://s3-ap-southeast-1.amazonaws.com/pam4-sansiri/ecom/public/1nKNwPxbj8M93QkaopxV2xpB52c.jpg","compress":false},"id":"aa947f31-c216-4f0d-a82b-d0df58c0e1ac"}],"id":"dc49b86f-1982-4e18-b960-b6cb649ba797"},{"element":"CONTAINER","props":{"flexbox":{"display":"flex","flex-grow":1,"flex-direction":"row"}},"children":[{"element":"TEXT","props":{"flexbox":{"flex-grow":1},"text-content":[{"insert":"If you prefer not to receive these messages in the future, please click here to "},{"insert":"unsubscribe","attributes":{"link":"{{unsub_url}}"}},{"insert":"\n\n","attributes":{"align":"center"}},{"insert":"© 2019 All Right Reserved"},{"insert":"\n","attributes":{"align":"center"}},{"insert":"187 Jaymart Building, Ramkhamhaeng Road,Rat Phatthana, Saphan Sung, Bangkok 10240"},{"insert":"\n","attributes":{"align":"center"}}]},"id":"7c2fa679-2452-4e8d-a3e1-c121954f9d7b"}],"id":"c9927091-bc29-4d85-8971-dae7f144c6fc"}]}
    if (this.propTemplateJson && !_.isEmpty(this.propTemplateJson)) {
      this.templateJson = this.propTemplateJson
      this.haveElementChild = true
    }
    this.templateJson.props.flexbox['flex-direction'] = EDirection.COLUMN
  }

  mounted() {
    const self = this
    setTimeout(() => {
      /* Assign this scope of current component for access from outside instance */
      (window as any).vm = this
      self.onUpdateScreen(this.screen)
    }, 10)
  }

  onUpdateScreen(screen: IScreen) {
    this.screen = screen
  }

  doCopyJSON() {
    const element = document.createElement('textarea')
    element.value = JSON.stringify(this.templateJson)
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
    AlertMsgSuccess({
      title: 'Success',
      text: 'Content is copied!'
    })
  }

  doOpenModal() {
    this.$refs['modal-view-json'].isOpenModal = true
  }

  doGetBackgrondContainer(value: string) {
    this.templateJson.props.background = value;
    document
      .getElementsByClassName('content')[0]
      .setAttribute('style', `background-color: ${value}`)
  }

  doAddJson(element: string) {
    this.element = _.toUpper(element);
    this.doAddElementChild(this.templateJson.children)
  }

  doFindElement(element: any) {
    return this.elementType.includes(element)
  }

  doAddElementChild(children: object[]) {
    if (this.templateJson.children.length < 1) {
      this.templateJson.children.push({
        id: uuidv4(),
        ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT'])
      })
      this.doAddElementChild(this.templateJson.children)
    } else {
      children.forEach((item: any) => {
        if (this.doFindElement(item.element)) {
          this.haveElementChild = true;
          this.element = _.toUpper(item.element)
        } else {
          item.children.push({
            id: uuidv4(),
            ..._.cloneDeep(this.defaultData[`${this.element}_DEFAULT`]),
          });
          this.doAssignChildElementId(item);
          this.doAddElementChild(item.children);
        }
      })
    }
  }

  doAssignChildElementId(state: any) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (state.children && state.children.length > 0) {
          this.doAssignChildElementId(child)
        }
        state.children = state.children.map((child: any) => {
          return { ...child, id: uuidv4() }
        });
      });
    }
  }

  @Watch('templateJson', { deep: true })
  onUpdateTemplate() {
    if (this.templateJson.children.length < 1) {
      this.haveElementChild = false;
    }
    this.$emit('change', this.templateJson)
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/Main.scss";
</style>
