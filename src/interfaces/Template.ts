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
            family: string
            size: string
            weight: number
            color: string
        }
        border?: {
            width: string
            style: string
            color: string
            radius: string
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
        height: string
        width: string
        required: boolean
        placeholder?: string
        label?: {
            name?: string
            font?: {
                family: string
                size: string
                weight: number
                color: string
            }
        }
        border?: {
            radius: string
        }
        margin: {
            'margin-x': string
            'margin-y': string
        }
    }
}

export interface ITextArea {
    element: EElementType.TEXTAREA
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        height: string
        width: string
        required: boolean
        placeholder?: string
        label?: {
            name?: string
            font?: {
                family: string
                size: string
                weight: number
                color: string
            }
        }
        border?: {
            radius: string
        }
        margin: {
            'margin-x': string
            'margin-y': string
        }
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
        options?: string
        label?: {
            name?: string
            font?: {
                family: string
                size: string
                weight: number
                color: string
            }
        }
        border?: {
            radius: string
        }
        margin: {
            'margin-x': string
            'margin-y': string
        }
    }
}

export interface ICheckbox {
    element: EElementType.CHECKBOX
    props: {
        flexbox: {
            'flex-grow': number
        }
        name?: string
        value?: string
        required: boolean
        checked: boolean
        options?: string
        label?: {
            name?: string
            font?: {
                family: string
                size: string
                weight: number
                color: string
            }
        }
        margin: {
            'margin-x': string
            'margin-y': string
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
        value?: string
        required: boolean
        checked: boolean
        options?: string
        label?: {
            name?: string
            font?: {
                family: string
                size: string
                weight: number
                color: string
            }
        }
        margin: {
            'margin-x': string
            'margin-y': string
        }
    }
}

