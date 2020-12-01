<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        <span class="product-name">PAM </span>
        <span class="project-name">Message Builder</span>
      </div>
      <div class="container-background">
        <ColorPickerComponent label="Background"/>
      </div>
    </div>
    <div class="container-body">
      <div class="content">
        <div v-if="haveElementChild">
          <div class="title">Hello my customer :)</div>
          <!-- <keep-alive>
            <component
              :is="doGetLoopDisplayElement(jsonDataProcessing.children).component"
              v-bind="{ ...doGetLoopDisplayElement(jsonDataProcessing.children).props }"
              v-on="{ ...doGetLoopDisplayElement(jsonDataProcessing.children).on }"
              @click="doGetSpecificationData"
            />
          </keep-alive> -->
        </div>
        <div v-else class="box-start">
          Start modify your message <TextMenuButtonComponent label="click" :options="menu" @click="doAddJson" /> here
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SIMPLE_JSON } from '../../constants/ExampleJson'
import { MENU } from '../../constants/Base'
import { EElementType } from '../../enum/Elements'
import { IContainer } from '../../interfaces/Template'
import {
  CONTAINER,
  SECTION,
  TEXT_DEFAULT,
  IMAGE_DEFAULT,
  SPACER_DEFAULT,
  BUTTON_DEFAULT,
  BOX_DEFAULT
} from '../../constants/Default'
import { _toUpper } from '../../utils/lodash'
import BoxComponent from '../../components/base/Box'

@Component({
  components: { BoxComponent }
})
export default class HTMLTemplate extends Vue {
  @Prop() readonly templates!: IContainer

  element = ''
  jsonDataSaved = {}
  jsonDataProcessing: IContainer = this.defaultData['CONTAINER']
  haveElementChild = false

  get menu() {
    return MENU
  }

  get json() {
    return SIMPLE_JSON
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

  get defaultData() {
    return {
      CONTAINER,
      SECTION,
      TEXT_DEFAULT,
      IMAGE_DEFAULT,
      SPACER_DEFAULT,
      BUTTON_DEFAULT,
      BOX_DEFAULT
    }
  }

  created() {
    if (this.templates) {
      this.jsonDataProcessing = this.templates
      this.doAddElementChild(this.jsonDataProcessing.children)
    }
  }

  // doFindElement(element: any) {
  //   return this.elementType.includes(element)
  // }

  doAddJson(element: string) {
    this.element = _toUpper(element)
    this.doAddElementChild(this.jsonDataProcessing.children)
  }

  doAddElementChild(children: object[]) {
    if (this.jsonDataProcessing.children.length < 1) {
      this.jsonDataProcessing.children.push(this.defaultData['SECTION'])
      this.doAddElementChild(this.jsonDataProcessing.children)
    } else {
      // children.forEach((item: any, index: number) => {
      //   if (this.doFindElement(item.element)) {
      //     this.haveElementChild = true
      //     this.element = _toUpper(item.element)
      //     this.doGetLoopDisplayElement(index, item)
      //   } else if (item.element === EElementType.SECTION) {
      //     // item.children.push(defaultData['CONTAINER'])
      //     console.log(defaultData['CONTAINER'])
      //     this.doAddElementChild(item.children)
      //   } else {
      //     // item.children.push(this.defaultData[`${this.element}_DEFAULT`])
      //     this.doAddElementChild(item.children)
      //   }
      // })
    }
  }

  // doGetLoopDisplayElement(index: number, item: any[]) {
  //   return {
  //     component: BoxComponent,
  //     props: {
  //       index: index,
  //       element: this.element
  //     }
  //   }
  // }

  // doGetSpecificationData(data: any) {
  //  this.doAddElementChild()
  // }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>