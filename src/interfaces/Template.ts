import { EDirection, EInputType } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export interface IContainer {
    id?: string
    element: EElementType.CONTAINER
    props: {
        flexbox: {
            display: string
            'flex-grow': number
            'flex-direction': EDirection.ROW | EDirection.COLUMN
        }
        background?: string
        parent?: string
    }
    children: any[]
}

export interface IText {
    element: EElementType.TEXT
    props?: {
        flexbox: {
            'flex-grow': number
        }
        background?: string
        'border-bottom'?: {
            width:  string
            style: string
            color: string
        }
        'word-break': string
        html?: string
    }
}

export interface IImage {
    element: EElementType.IMAGE
    props: {
        flexbox: {
            'flex-grow': number
        }
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        }
        link?: string
        url?: string
        compress?: boolean
        width?: string
        'max-width'?: string
    }
}

export interface ISpacer {
    element: EElementType.SPACER
    props?: {
        flexbox: {
            'flex-grow': number
        }
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        }
        height?: string
    }
}

export interface IButton {
    element: EElementType.BUTTON
    props: {
        flexbox: {
            'flex-grow': number
        }
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        }
        link?: string
        font?: {
            'font-family': string
            'font-size': string
            color: string
        }
        'border-radius'?: string
        border?: {
            width: string
            style: string
            color: string
        }
        height: string
    }
}

export interface IBox {
    element: EElementType.BOX
    props: {
        flexbox: {
            display: string
            'flex-grow': number
            'flex-direction': EDirection.COLUMN
        }
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        }
        padding?: {
            'padding-x': string
            'padding-y': string
        }
    }
    children: [{
        id?: string
        element: EElementType.CONTAINER
        props: {
            parent: EElementType.BOX
            background?: string
            flexbox: {
                display: string
                'flex-grow': number
                'flex-direction': EDirection.ROW
            }
        }
        children: any[]
    }]
}

export interface IInput {
    element: EElementType.INPUT
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        type: EInputType
        required: boolean
        placeholder?: string
        height: string
        width: string
        label?: {
            name?: string
            font?: {
                'font-family': string
                'font-size': string
                'font-weight': string
                color: string
            }
        }
        'border-radius'?: string
    }
}

export interface ITextArea {
    element: EElementType.TEXTAREA
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        required: boolean
        placeholder?: string
        cols: number
        rows: number
        resize: string
        label?: {
            name?: string
            font?: {
                'font-family': string
                'font-size': string
                'font-weight': string
                color: string
            }
        }
        'border-radius'?: string
    }
}

export interface ISelect {
    element: EElementType.SELECT
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        height: string
        width: string
        required: boolean
        options?: string[]
        label?: {
            name?: string
            font?: {
                'font-family': string
                'font-size': string
                'font-weight': string
                color: string
            }
        }
        'border-radius'?: string
    }
}

export interface ICheckbox {
    element: EElementType.CHECKBOX
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        type: string
        value?: string
        required: boolean
        checked: boolean
        label?: {
            name?: string
            font?: {
                'font-family': string
                'font-size': string
                'font-weight': string
                color: string
            }
        }
    }
}

export interface IRadio {
    element: EElementType.RADIO
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        type: string
        value?: string
        required: boolean
        checked: boolean
        label?: {
            name?: string
            font?: {
                'font-family': string
                'font-size': string
                'font-weight': string
                color: string
            }
        }
    }
}

