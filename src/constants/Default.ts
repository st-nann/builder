import { IBox, IButton, IContainer, IImage, ISpacer, IText } from '../interfaces/Template'
import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export const CONTAINER_DEFAULT: IContainer = {
    element: EElementType.CONTAINER,
    props: {
        flexbox: {
            display: 'flex',
            'flex-grow': 1,
            'flex-direction': EDirection.ROW
        }
    },
    children: []
}

export const TEXT_DEFAULT: IText = {
    element: EElementType.TEXT,
    props: {}
}

export const IMAGE_DEFAULT: IImage = {
    element: EElementType.IMAGE,
    props: {
        link: '',
        compress: false
    }
}

export const SPACER_DEFAULT: ISpacer = {
    element: EElementType.SPACER,
    props: {}
}

export const BUTTON_DEFAULT: IButton = {
    element: EElementType.BUTTON,
    props: {}
}

export const BOX_DEFAULT: IBox = {
    element: EElementType.BOX,
    props: {
        flexbox: {
            display: 'flex',
            'flex-grow': 1,
            'flex-direction': EDirection.ROW
        }
    },
    children: []
}
