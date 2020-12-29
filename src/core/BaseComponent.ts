import _ from 'lodash'
import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IFlexbox, IModal } from '../interfaces/Components'

@Component
export default class BaseComponent extends Base {
  @Prop() readonly elementTemplateJson!: any
  @Prop() readonly elementState!: any
  @Prop(String) readonly elementId!: string
  @Prop(String) readonly elementName!: string
  @Prop() readonly elementProps!: any
  @Prop(String) readonly name!: string
  @Prop(String) readonly label!: string
  @Prop(String) readonly placeholder!: string
  @Prop(String) readonly icon!: string
  @Prop(Boolean) readonly search!: boolean
  @Prop() value!: any
  @Prop(Array) readonly options!: { label: string, value: any }[]
  @Prop(Boolean) readonly disabled!: boolean
  @Prop(Array) readonly rules!: object
  @Prop(Array) readonly flexbox!: IFlexbox
  @Prop(String) readonly className!: string
  @Prop(String) readonly width!: string
  @Prop(String) readonly min!: string // Slider
  @Prop(String) readonly max!: string // Slider
  @Prop() modal!: IModal
  @Prop() customKeyValue!: string

  transformValue: any = null
  data: any = {}
  scale: any = {}
  action: any = {}
  footerData: any = {}
  previewData: any = {}
  changeImage = false
  parent: any = {}
  quantityParentBox = -1

  created() {
    this.init()
  }
  
  init() {
    this.transformValue = this.value || null
  }

  onInput(value: any) {
    this.transformValue = value
    this.$emit('change', this.transformValue)
  }

  doManageElement(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((item: any) => {
        const foundChild = _.find(state.children, child => child.id === this.elementId)
        const foundBox = _.find(state.children, (child: any) => child.element === 'BOX')
        const foundParentBox = _.find(state.children, (child: any) => child.props.parent === 'BOX')
        if (foundBox) { this.quantityParentBox = state.children.length }
        if (foundChild) {
          this.parent = {
            parentName: state.props.parent,
            quantityChildren: state.children.length,
            isAllowAdded: !foundParentBox && this.quantityParentBox < 4
          }
        }
        this.doManageElement(item)
      })
    }
  }

  doSetAttributeStyle(id: string, lists: object) {
    setTimeout(() => {
        document.getElementById(id)?.setAttribute(
        'style',
        JSON.stringify({...lists})
            .substring(1, JSON.stringify({...lists}).length - 1)
            .replaceAll(',', ';')
            .replaceAll('"', '')
        )
    }, 10)
  }

  onUpdatePreview(data: any) {
    this.previewData = {}
    this.previewData = data
    this.changeImage = data.changeImage || false
  }

  onUpdateManagement(data: any) {
    this.action = data
    this.$emit('updataManagement', this.action)
    if (this.action.duplicate || this.action.delete) {
      Object.assign(this.data, data)
      this.doEmitData()
    }
  }
  
  onUpdateScale(scale: any) {
    if (scale) {
      if (JSON.stringify(this.data) === '{}') {
        Object.assign(this.data, this.elementProps)
      }
      this.scale = scale
      this.action.done = true
      this.doEmitData()
    }
  }

  onUpdateFooterPanelData(data: any) {
    this.footerData = data
    this.action.edit = false
    this.$emit('updataManagement', this.action)
    if (data) {
      Object.assign(this.data, data)
      this.doEmitData()
    }
  }

  doEmitData() {
    if (this.action.delete) {
      this.$emit('delete', this.elementId)
    } else if (this.action.duplicate) {
      this.$emit('duplicate', {
        id: this.elementId,
        position: this.action.position,
        duplicate: this.action.duplicate
      })
    } else {
      this.$emit('done', {
        id: this.elementId,
        props: {
          ...this.data,
          flexbox: {
            'align-items': this.data.flexbox['align-items'],
            'justify-content': this.data.flexbox['justify-content'],
            'flex-grow': this.scale.flexbox['flex-grow']
          },
        }
      })
    }
  }

  doEmitAddElement(data: any) {
    this.$emit('add', { id: this.elementId, ...data })
  }

  @Watch('value', { deep: true })
  onValueChange(newValue: any, oldValue: any) {
    if (!_.isEqual(newValue, oldValue)) {
        this.transformValue = newValue
    }
  }

  @Watch('elementTemplateJson', { deep: true })
  onUpdateTemplateJson() {
    const self = this
    setTimeout(() => {
      self.doManageElement()
    }, 10)
  }
}
