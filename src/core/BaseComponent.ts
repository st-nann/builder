import _ from 'lodash'
import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IFlexbox, IModal } from '../interfaces/Components'
import { EElementType } from '../enum/Elements'
import { EDirection } from '../enum/Components'

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
  @Prop(Number) readonly weightRange!: number // Slider
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
  childrenElement: any = {}
  childrenElementBox: any = {}
  sumAllChildrenNested: any = {}
  containerRoot = ''
  boxChildren = 0
  boxContainerChildren = 0
  isCancel = false

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
        if (foundChild) {
          this.doCalculateAllChildrenNested()
          this.doAssignChildrenToElement()
          this.doCalculateChildrenBox()
          this.parent = {
            parentName: state.props.parent,
            quantityChildren: this.childrenElement[state.id] || 0,
            quantityChildrenBox: this.childrenElementBox[state.id] || 2
          }
        }
        this.doManageElement(item)
      })
    }
  }

  doCalculateAllChildrenNested(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (
          child.element === EElementType.CONTAINER &&
          _.isUndefined(child.props.parent) &&
          child.props.flexbox['flex-direction'] === EDirection.ROW
        ) {
          this.containerRoot = child.id
          Object.assign(this.sumAllChildrenNested, { [this.containerRoot]: 0 })
        }
        if (_.isUndefined(child.children)) {
          Object.assign(
            this.sumAllChildrenNested,
            { [this.containerRoot]: this.sumAllChildrenNested[this.containerRoot] + 1 }
          )
        }
        this.doCalculateAllChildrenNested(child)
      })
    }
  }

  doAssignChildrenToElement(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (
          child.element === EElementType.CONTAINER &&
          _.isUndefined(child.props.parent) &&
          child.props.flexbox['flex-direction'] === EDirection.ROW
        ) {
          this.containerRoot = child.id
          Object.assign(
            this.childrenElement,
            { [child.id]: this.sumAllChildrenNested[this.containerRoot] }
          )
          this.doAssignChildrenToElement(child)
        }
        Object.assign(
          this.childrenElement,
          { [child.id]: this.sumAllChildrenNested[this.containerRoot] }
        )
        this.doAssignChildrenToElement(child)
      })
    }
  }

  doCalculateChildrenBox(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (child.element === EElementType.BOX) {
          this.boxChildren = child.children.length
          this.doAssignChildrenBox(child)
        }
        this.doCalculateChildrenBox(child)
      })
    }
  }

  doAssignChildrenBox(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (child.element === EElementType.CONTAINER && child.props.parent) {
          this.boxContainerChildren = child.children.length
        }
        Object.assign(
          this.childrenElementBox,
          { [child.id]: (this.boxChildren - 1) + this.boxContainerChildren }
        )
        this.doAssignChildrenBox(child)
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
    this.data = {}
    this.action = data
    this.$emit('updataManagement', this.action)
    if (this.action.edit) {
      Object.assign(this.data, this.elementProps)
    }
    if (this.action.duplicate || this.action.delete) {
      Object.assign(this.data, data)
    }
    this.doEmitData()
  }
  
  onUpdateScale(scale: any) {
    if (scale && !this.isCancel) {
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
    this.isCancel = true
    if (data) {
      this.isCancel = false
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
