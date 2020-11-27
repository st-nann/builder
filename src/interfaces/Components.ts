export interface IDropdownOption {
    label: string
    value: any
  }

export interface IComponentOption {
    type: string
    className: string
    props?: {
        name: string
        label?: string
        placeholder?: string
        icon?: string
        value?: any
        options?: IDropdownOption[] | any[]
        disabled?: boolean
        rules?: Function[]
    }
}