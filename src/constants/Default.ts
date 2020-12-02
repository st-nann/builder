import { IBox, IButton, IContainer, IImage, ISection, ISpacer, IText } from '../interfaces/Template'
import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export const CONTAINER_DEFAULT: IContainer = {
    element: EElementType.CONTAINER,
    'container-props': {
        background: '#ffffff',
        flexbox: {
            'flex-grow': 1,
            'flex-direction': EDirection.ROW
        }
    },
    children: []
}

export const SECTION_DEFAULT: ISection = {
    element: EElementType.SECTION,
    'container-props': {
        flexbox: {
            'flex-grow': 1,
            'flex-direction': EDirection.ROW
        }
    },
    children: []
}

export const TEXT_DEFAULT: IText = {
    element: EElementType.TEXT,
    'container-props': {
        flexbox: {
            'flex-grow': 1
        }
    },
    'element-props': {}
}

export const IMAGE_DEFAULT: IImage = {
    element: EElementType.IMAGE,
    'container-props': {
        flexbox: {
            'flex-grow': 1
        }
    },
    'element-props': {
        link: '',
        compress: false
    }
}

export const SPACER_DEFAULT: ISpacer = {
    element: EElementType.SPACER,
    'container-props': {
        flexbox: {
            'flex-grow': 1
        }
    },
    'element-props': {}
}

export const BUTTON_DEFAULT: IButton = {
    element: EElementType.BUTTON,
    'container-props': {
        flexbox: {
            'flex-grow': 1
        }
    },
    'element-props': {}
}

export const BOX_DEFAULT: IBox = {
    element: EElementType.BOX,
    'container-props': {
        flexbox: {
            'flex-grow': 1,
            'flex-direction': EDirection.ROW
        }
    },
    'element-props': {},
    children: []
}
