<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        <span class="product-name">PAM </span>
        <span class="project-name">Message Builder</span>
      </div>
      <div class="container-management">
        <SquareButtonComponent
          className="view-json-square-button"
            icon="code-braces-box"
            label="View JSON"
            @click="doOpenModal"
        />
        <ModalComponent
          ref="modal-view-json"
          :modal="{ width: 800, button: { info: true, position: 'center' } }"
        >
          <template slot="content">
            <div class="json-viewer">
              <pre><code>{{ templateJson }}</code></pre>
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
    <div class="container-body">
      <div class="content">
        <div v-if="haveElementChild">
          <BuilderCanvas :templateJson="templateJson"/>
        </div>
        <div v-else class="box-start">
          <SquareMenuButtonComponent
            className="start-square-menu-button"
            icon="plus-circle"
            label="Launch Template"
            :options="menu"
            @click="doAddJson"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { uuid } from 'uuidv4'
import { Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { MENU } from '../../constants/Base'
import { EElementType } from '../../enum/Elements'
import { IContainer } from '../../interfaces/Template'
import {
  CONTAINER_DEFAULT,
  TEXT_DEFAULT,
  IMAGE_DEFAULT,
  SPACER_DEFAULT,
  BUTTON_DEFAULT,
  BOX_DEFAULT
} from '../../constants/Default'
import BoxComponent from '../../components/base/Box'
import { EDirection } from '../../enum/Components'

@Component({
  components: { BoxComponent }
})
export default class HTMLTemplate extends BaseComponent {
  @Prop() propTemplateJson!: IContainer

  elementName = ''
  haveElementChild = false
  templateJson: IContainer = {
    id: uuid(),
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
      EElementType.BOX
    ]
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
    this.templateJson.props.flexbox['flex-direction'] = EDirection.COLUMN
    if (this.propTemplateJson) {
      this.templateJson = this.propTemplateJson
      this.haveElementChild = true
    }
  }

  doOpenModal() {
    this.$refs['modal-view-json'].isOpenModal = true
  }

  doGetBackgrondContainer(value: string) {
    this.templateJson.props.background = value
    document.getElementsByClassName('content')[0].setAttribute('style', `background-color: ${value}`)
  }

  doAddJson(element: string) {
    this.elementName = _.toUpper(element)
    this.doAddElementChild(this.templateJson.children)
  }

  doFindElement(element: any) {
    return this.elementType.includes(element)
  }

  doAddElementChild(children: object[]) {
    if (this.templateJson.children.length < 1) {
      this.templateJson.children.push({
        id: uuid(),
        ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT'])
      })
      this.doAddElementChild(this.templateJson.children)
    } else {
      children.forEach((item: any) => {
        if (this.doFindElement(item.element)) {
          this.haveElementChild = true
          this.elementName = _.toUpper(item.element)
        } else {
          item.children.push({
            id: uuid(),
            ..._.cloneDeep(this.defaultData[`${this.elementName}_DEFAULT`])
          })
          this.doAddElementChild(item.children)
        }
      })
    }
  }

  @Watch('templateJson', { deep: true })
  onUpdateTemplate() {
    if (this.templateJson.children.length < 1) {
      this.haveElementChild = false
    }
    this.$emit('change', this.templateJson)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>