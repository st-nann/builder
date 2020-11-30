import { EDirection, EJustify, EAlign } from '../enum/Components'

export interface IFlexbox {
    grow: number
}

export interface IDropdownOption {
    label: string
    value: any
    icon?: string
}

export interface IModal {
    width: number
    button: {
        save: string
        position: EJustify.START | EJustify.CENTER | EJustify.END
    }
}

export interface IComponentOption {
    element?: string
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
        className?: string,
        width?: string, // input, dropdown
        modal?: IModal
    }
}