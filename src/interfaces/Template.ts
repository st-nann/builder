import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export interface IContainer {
    id?: string
    element: EElementType.CONTAINER
    props: {
        background?: string
        flexbox: {
            display: string
            'flex-grow': number
            'flex-direction': EDirection.ROW | EDirection.COLUMN
        }
    },
    children: any[]
}

export interface IText {
    element: EElementType.TEXT
    props?: {
        background?: string
        'border-bottom'?: {
            width:  string
            style: string
            color: string
        },
        html?: string
    }
}

export interface IImage {
    element: EElementType.IMAGE
    props: {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        link?: string
        url?: string
        compress?: boolean
        width?: string
    }
}

export interface ISpacer {
    element: EElementType.SPACER
    props?: {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        height?: string
    }
}

export interface IButton {
    element: EElementType.BUTTON
    props: {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        link?: string
        font?: {
            family: string
            size: string
            weight: number
            color: string
        },
        border?: {
            width: string
            style: string
            color: string
            radius: string
        }
    }
}

export interface IBox {
    element: EElementType.BOX
    props: {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        flexbox: {
            display: string
            'flex-grow': number
            'flex-direction': EDirection.ROW
        },
        padding?: string
    },
    children: any[]
}

