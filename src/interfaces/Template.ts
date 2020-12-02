import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export interface IContainer {
    element: EElementType.CONTAINER
    'container-props': {
        background?: string
        flexbox: {
            'flex-grow': number
            'flex-direction': EDirection.ROW | EDirection.COLUMN
        }
    },
    children: any[]
}

export interface ISection {
    element: EElementType.SECTION,
    'container-props': {
        flexbox: {
            'flex-grow': number
            'flex-direction': EDirection.ROW
        }
    },
    children: any[]
}

export interface IText {
    element: EElementType.TEXT
    'container-props': {
        background?: string
        'border-bottom'?: {
            width:  string
            style: string
            color: string
        },
        flexbox: {
            'flex-grow': number
        }
    },
    'element-props'?: {
        link?: string
        font?: {
            family: string
            size: string
            weight: number
            color: string
        },
        'text-align'?: string
        'line-height'?: number
    }
}

export interface IImage {
    element: EElementType.IMAGE
    'container-props': {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        flexbox: {
            'flex-grow': number
        }
    },
    'element-props': {
        link: string
        compress: boolean
        width?: string
    }
}

export interface ISpacer {
    element: EElementType.SPACER
    'container-props': {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        flexbox: {
            'flex-grow': number
        }
    },
    'element-props'?: {
        height?: string
    }
}

export interface IButton {
    element: EElementType.BUTTON
    'container-props': {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        flexbox: {
            'flex-grow': number
        }
    },
    'element-props': {
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
    'container-props': {
        background?: string
        'border-bottom'?: {
            width: string
            style: string
            color: string
        },
        flexbox: {
            'flex-grow': number
            'flex-direction': EDirection.ROW
        }
    },
    'element-props'?: {
        padding?: string
    },
    children: any[]
}

