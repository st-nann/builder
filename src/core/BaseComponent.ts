import _ from 'lodash'
import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IFlexbox, IModal } from '../interfaces/Components'

@Component
export default class BaseComponent extends Base {
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
    action: any = {}
    footerData: any = {}
    previewData: any = {}
    changeImage = false

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
            props: { ...this.data }
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
}
