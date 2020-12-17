import _ from 'lodash'
import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IFlexbox, IModal } from '../interfaces/Components'

@Component
export default class BaseComponent extends Base {
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
    @Prop() modal!: IModal

    transformValue: any = null

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
