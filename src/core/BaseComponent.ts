import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { _isEqual } from '../utils/lodash'
import { IFlexbox, IModal } from '../interfaces/Components'

@Component
export default class BaseComponent extends Base {
    @Prop(String) readonly element!: string
    @Prop(String) readonly name!: string
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(String) readonly icon!: string
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
        this.value = value
        this.$emit('change', value)
    }

    @Watch('innerValue', {deep: true})
    onChange(value: any, oldValue: any) {
        if (!_isEqual(value, oldValue)) {
            const newRawValue = value || null
            this.$emit('input', newRawValue)
        }
    }

    @Watch('value', {deep: true})
    onValueChange(value: any, oldValue: any) {
        if (!_isEqual(value, oldValue)) {
            this.transformValue = value
        }
    }
}
