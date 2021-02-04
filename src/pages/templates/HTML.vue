<template>
  <div
    :class="[
      'builder-container',
      {
        'enable-event': !(screen.mobile || screen.desktop),
        'disable-event': screen.mobile || screen.desktop
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
      <div
        :class="[
          'builder-content',
          {
            'content-mobile': screen.width === undefined && screen.mobile,
            'content-desktop': screen.width === undefined && (screen.desktop || !this.screen.mobile)
          }
        ]"
        :style="`width: ${widthScreenCustom};`"
      >
        <div v-if="haveElementChild">
          <BuilderCanvas
            :screen="screen"
            :templateJson="templateJson"
            :messageType="propMessageType"
          />
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
import { EMAIL_MENU, WEB_ATTENTION_MENU, FLEX_MESSAGE_MENU } from '../../constants/Base'
import { EDirection } from '../../enum/Components'
import { EMessageType, EElementType } from '../../enum/Elements'
import { IMessageType, IScreen } from '../../interfaces/Components'
import { IContainer } from '../../interfaces/Template'
import { AlertMsgSuccess } from '../../plugins/alert/Alert'
import {
  CONTAINER_DEFAULT,
  TEXT_DEFAULT,
  IMAGE_DEFAULT,
  SPACER_DEFAULT,
  BUTTON_DEFAULT,
  BOX_DEFAULT,
  INPUT_DEFAULT,
  TEXTAREA_DEFAULT,
  SELECT_DEFAULT,
  CHECKBOX_DEFAULT,
  RADIO_DEFAULT

} from '../../constants/Default'

@Component
export default class HTMLTemplate extends BaseComponent {
  @Prop() propTemplateJson!: IContainer
  @Prop() readonly propMessageType!: IMessageType

  element = ''
  widthScreenCustom = ''
  haveElementChild = false
  screen: IScreen = { mobile: false, desktop: false }
  templateJson: IContainer = {
    id: uuidv4(),
    ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT'])
  }

  get menu() {
    switch (this.propMessageType) {
      case EMessageType.EMAIL: return EMAIL_MENU
      case EMessageType.WEB_ATTENTION: return WEB_ATTENTION_MENU
      case EMessageType.FLEX_MESSAGE: return FLEX_MESSAGE_MENU
      default: return EMAIL_MENU
    }
  }

  get elementType() {
    return [
      EElementType.TEXT,
      EElementType.IMAGE,
      EElementType.SPACER,
      EElementType.BUTTON,
      EElementType.BOX,
      EElementType.INPUT,
      EElementType.TEXTAREA,
      EElementType.SELECT,
      EElementType.CHECKBOX,
      EElementType.RADIO
    ];
  }

  get defaultData(): any {
    return {
      CONTAINER_DEFAULT,
      TEXT_DEFAULT,
      IMAGE_DEFAULT,
      SPACER_DEFAULT,
      BUTTON_DEFAULT,
      BOX_DEFAULT,
      INPUT_DEFAULT,
      TEXTAREA_DEFAULT,
      SELECT_DEFAULT,
      CHECKBOX_DEFAULT,
      RADIO_DEFAULT
    }
  }

  created() {
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
    if (this.screen.width && this.screen.width.type) {
      switch (this.screen.width.type) {
        case 'SM':
          this.widthScreenCustom = `30%`
          break
        case 'MD':
          this.widthScreenCustom = `50%`
          break
        case 'LG':
          this.widthScreenCustom = `70%`
          break
        case 'FULL':
          this.widthScreenCustom = `100%`
          break
        case 'CUSTOM':
          this.widthScreenCustom = this.screen.width.size || '90%'
          break
        default:
          this.widthScreenCustom = `90%`
          break
      }
    } else {
      this.screen = screen
    }
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
          const defaultElement = this.defaultData[`${this.element}_DEFAULT`]
          if (this.propMessageType === EMessageType.FLEX_MESSAGE) {
            if (this.element === EElementType.BUTTON) {
              defaultElement.props.width = '100%'
            }
          }
          item.children.push({ id: uuidv4(), ..._.cloneDeep(defaultElement) })
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
