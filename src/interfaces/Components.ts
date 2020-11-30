import { EDirection, EJustify, EAlign } from '../enum/Components'

export interface IFlexbox {
    grow: number
}

export interface IDropdownOption {
    label: string
    value: any
    icon?: string
}

export interface IComponentOption {
    type: string
    flexbox: IFlexbox
    props?: {
        name: string
        label?: string
        placeholder?: string
        icon?: string
        value?: any
        options?: IDropdownOption[] | any[]
        disabled?: boolean
        rules?: Function[],
        className?: string
    }
}