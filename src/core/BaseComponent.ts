import { Base } from './Base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { _isEqual } from '../utils/lodash'
import { IFlexbox } from '../interfaces/Components'

@Component
export default class BaseComponent extends Base {
    @Prop(String) readonly name!: string
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(String) readonly icon!: string
    @Prop() readonly value!: any
    @Prop(Array) readonly options!: { label: string, value: any }[]
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Array) readonly rules!: object
    @Prop(Array) readonly flexbox!: IFlexbox

    onInput(value: any) {
        this.$emit('change', value)
    }

    @Watch('value', { deep: true })
    onValueChange(newValue: any, oldValue: any) {
        if (!_isEqual(newValue, oldValue)) {
            this.$emit('input', newValue)
        }
    }
}
