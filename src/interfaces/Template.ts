import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export interface IContainer {
    id?: string
    element: EElementType.CONTAINER
    props: {
        flexbox: {
            display: string
            'flex-grow': number
            'flex-basis': string
            'max-width': string
            'flex-direction': EDirection.ROW | EDirection.COLUMN
        },
        background?: string,
        parent?: string
    },
    children: any[]
}

export interface IText {
    element: EElementType.TEXT
    props?: {
        flexbox: {
            'flex-grow': number
            'flex-basis': string
            'max-width': string
        },
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
        flexbox: {
            'flex-grow': number
            'flex-basis': string
            'max-width': string
        },
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
        'max-width'?: string
    }
}

export interface ISpacer {
    element: EElementType.SPACER
    props?: {
        flexbox: {
            'flex-grow': number
            'flex-basis': string
            'max-width': string
        },
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
        flexbox: {
            'flex-grow': number
            'flex-basis': string
            'max-width': string
        },
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
        flexbox: {
            display: string
            'flex-grow': number
            'flex-basis': string
            'max-width': string
            'flex-direction': EDirection.COLUMN
        },
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        padding?: string,
        width?: string | number
    },
    children: [{
        id?: string
        element: EElementType.CONTAINER
        props: {
            parent: EElementType.BOX,
            background?: string
            flexbox: {
                display: string
                'flex-grow': number
                'flex-basis': string
                'max-width': string
                'flex-direction': EDirection.ROW
            }
        },
        children: any[]
    }]
}

