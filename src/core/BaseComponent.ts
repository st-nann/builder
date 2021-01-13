import _ from 'lodash'
import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IFlexbox, IModal } from '../interfaces/Components'
import { EElementType } from '../enum/Elements'

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
  childrenElementRootContainer: any = {}
  childrenElementBoxContainer: any = {}
  childrenElement: any = {}
  childrenElementBox: any = {}
  containerId = ''
  containerBoxId = ''
  parentContainerId = ''
  boxId = ''
  containerRoot = ''
  oldBoxId = ''
  calculateChild = 0
  boxChildren = 0
  boxContainerChildren = 0
  sumAllChildrenBoxContainer: any = {}
  foundParentElement = false
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
          this.doAssignChildrenContainer()
          this.doAssignChildrenBoxContainer()
          this.doCalculateChildren()
          this.doCalculateChildrenBox()
          const mergeChildElement: any = {}
          _.forEach(this.childrenElementRootContainer, (index, key) => {
            if (_.isUndefined(this.childrenElementBoxContainer[key])) {
              Object.assign(mergeChildElement, { [key]: this.childrenElementRootContainer[key] })
            }
          })
          Object.assign(mergeChildElement, this.childrenElementBoxContainer)
          this.parent = {
            parentName: state.props.parent,
            quantityChildren: mergeChildElement[state.id] || 0,
            quantityChildrenBox: this.childrenElementBox[state.id] || 2
          }
        }
        this.doManageElement(item)
      })
    }
  }

  /* find all level children */
  doAssignChildrenContainer(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (child.element === EElementType.CONTAINER && _.isUndefined(child.props.parent)) {
          this.containerId = child.id
          Object.assign(
            this.childrenElementRootContainer,
            {
              [child.id]: this.sumAllChildrenBoxContainer[this.containerId]
                ? this.sumAllChildrenBoxContainer[this.containerId] + (child.children.length - 1)
                : child.children.length
            }
          )
          this.doAssignChildrenInContainer(child)
        }
        this.doAssignChildrenContainer(child)
      })
    }
  }

  /* assign all level children */
  doAssignChildrenInContainer(state: any) {
    if (state.children) {
      state.children.forEach((child: any) => {
        Object.assign(this.childrenElementRootContainer, { [child.id]: this.childrenElementRootContainer[state.id] })
        this.doAssignChildrenInContainer(child)
      })
    }
  }

  /* find only box children */
  doAssignChildrenBoxContainer(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (child.element === EElementType.CONTAINER && child.props.parent) {
          Object.assign(
            this.sumAllChildrenBoxContainer,
            {
              [this.containerRoot]: this.oldBoxId === this.boxId
                ? child.children.length
                : this.sumAllChildrenBoxContainer[this.containerRoot] && this.sumAllChildrenBoxContainer[this.containerRoot] < 4
                  ? this.sumAllChildrenBoxContainer[this.containerRoot] + child.children.length
                  : child.children.length
            }
          )
          Object.assign(
            this.childrenElementBoxContainer,
            {
              [child.id]: this.childrenElementBoxContainer[child.id]
                ? this.childrenElementBoxContainer[child.id] > child.children.length 
                  ? this.childrenElementRootContainer[this.containerRoot] < 4 && this.childrenElementBoxContainer[child.id] < 4
                    ? (this.childrenElementBoxContainer[child.id] - 1) + child.children.length
                    : this.childrenElementRootContainer[this.containerRoot]
                  : child.children.length
                : child.children.length
            }
          )
          this.oldBoxId = this.boxId
          this.containerBoxId = child.id
          this.doAssignChildrenInBoxContainer(child)
        }
        if (child.element === EElementType.BOX) {
          this.boxId = child.id
        }
        if (child.element === EElementType.CONTAINER && _.isUndefined(child.props.parent)) {
          this.containerRoot = child.id
        }
        this.doAssignChildrenBoxContainer(child)
      })
    }
  }

  /* assign only box children */
  doAssignChildrenInBoxContainer(state: any) {
    if (state.children) {
      state.children.forEach((child: any) => {
        Object.assign(
          this.childrenElementBoxContainer,
          { [child.id]: this.childrenElementBoxContainer[this.containerBoxId] }
        )
        Object.assign(
          this.childrenElementRootContainer,
          { 
            [this.boxId]: this.childrenElementRootContainer[this.boxId] < this.childrenElementBoxContainer[this.containerBoxId]
              ? this.childrenElementBoxContainer[this.containerBoxId]
              : this.childrenElementRootContainer[this.boxId]
          }
        )
        Object.assign(
          this.childrenElementRootContainer,
          { 
            [this.containerRoot]: this.childrenElementRootContainer[this.containerRoot] < this.childrenElementRootContainer[this.boxId]
              ? this.childrenElementRootContainer[this.boxId]
              : this.childrenElementRootContainer[this.containerRoot]
          }
        )
        this.doAssignChildrenInBoxContainer(child)
      })
    }
  }

  /* calculate children since container before box element */
  doCalculateChildren(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (this.childrenElementBoxContainer[child.id]) {
          this.calculateChild = (this.childrenElementRootContainer[child.id] - 1) + this.childrenElementBoxContainer[child.id]
          this.doCalcurateUpdateBeforeElementChildren()
          this.foundParentElement = false
        }
        if (child.element === EElementType.CONTAINER && _.isUndefined(child.props.parent)) {
          this.parentContainerId = child.id
        }
        this.doCalculateChildren(child)
      })
    }
  }

  /* assiagn children value since container before box element */
  doCalcurateUpdateBeforeElementChildren(state: any = this.elementTemplateJson) {
    if (state.children) {
      state.children.forEach((child: any) => {
        if (this.foundParentElement) {
          Object.assign(this.childrenElement, { [child.id]: this.calculateChild })
        }
        this.foundParentElement = this.parentContainerId === child.id
        this.doCalcurateUpdateBeforeElementChildren(child)
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
          Object.assign(this.childrenElementBox, { [child.id]: (this.boxChildren - 1) + this.boxContainerChildren })
        }
        if (child.element !== EElementType.CONTAINER) {
          Object.assign(this.childrenElementBox, { [child.id]: (this.boxChildren - 1) + this.boxContainerChildren })
        }
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
