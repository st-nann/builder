<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        <span class="product-name">PAM </span>
        <span class="project-name">Message Builder</span>
      </div>
      <div class="container-background">
        <ColorPickerComponent
          name="contanier-background"
          label="Background"
          :value="templateJson.background"
          @change="doGetBackgrondContainer"
        />
      </div>
    </div>
    <div class="container-body">
      <div class="content">
        <div v-if="haveElementChild">
          <div class="title">Hello my customer :)</div>
          <BuilderCanvas :templateJson="templateJson"/>
          {{ templateJson }}
        </div>
        <div v-else class="box-start">
          Start modify your message <TextMenuButtonComponent label="click" :options="menu" @click="doAddJson" /> here
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MENU } from '../../constants/Base'
import { EElementType } from '../../enum/Elements'
import { IContainer } from '../../interfaces/Template'
import {
  CONTAINER_DEFAULT,
  SECTION_DEFAULT,
  TEXT_DEFAULT,
  IMAGE_DEFAULT,
  SPACER_DEFAULT,
  BUTTON_DEFAULT,
  BOX_DEFAULT
} from '../../constants/Default'
import BoxComponent from '../../components/base/Box'
import { EDirection } from '@/enum/Components'

@Component({
  components: { BoxComponent }
})
export default class HTMLTemplate extends Vue {
  @Prop() readonly propTemplateJson!: IContainer

  element = ''
  templateJson: IContainer = JSON.parse(JSON.stringify(this.defaultData['CONTAINER_DEFAULT']))
  haveElementChild = false

  get menu() {
    return MENU
  }

  get elementType() {
    return [
      EElementType.TEXT,
      EElementType.IMAGE,
      EElementType.SPACER,
      EElementType.BUTTON,
      EElementType.BOX
    ]
  }

  get defaultData(): any {
    return {
      CONTAINER_DEFAULT,
      SECTION_DEFAULT,
      TEXT_DEFAULT,
      IMAGE_DEFAULT,
      SPACER_DEFAULT,
      BUTTON_DEFAULT,
      BOX_DEFAULT
    }
  }

  created() {
    this.templateJson['container-props'].flexbox['flex-direction'] = EDirection.COLUMN
    if (this.propTemplateJson) {
      this.templateJson = this.propTemplateJson
      this.doAddElementChild(this.templateJson.children)
    }
  }

  doGetBackgrondContainer(value: string) {
    this.templateJson['container-props'].background = value
    document.getElementsByClassName('content')[0].setAttribute('style', `background-color: ${value}`)
  }

  doAddJson(element: string) {
    this.element = _.toUpper(element)
    this.doAddElementChild(this.templateJson.children)
  }

  doFindElement(element: any) {
    return this.elementType.includes(element)
  }

  doAddElementChild(children: object[]) {
    if (this.templateJson.children.length < 1) {
      this.templateJson.children.push(this.defaultData['SECTION_DEFAULT'])
      this.doAddElementChild(this.templateJson.children)
    } else {
      children.forEach((item: any) => {
        if (this.doFindElement(item.element)) {
          this.haveElementChild = true
          this.element = _.toUpper(item.element)
        } else if (_.toUpper(item.element) === EElementType.SECTION) {
          item.children.push(this.defaultData['CONTAINER_DEFAULT'])
          this.doAddElementChild(item.children)
        } else {
          item.children.push(this.defaultData[`${this.element}_DEFAULT`])
          this.doAddElementChild(item.children)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>