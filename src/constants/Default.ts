import { v4 as uuidv4 } from 'uuid'
import { IBox, IButton, IContainer, IImage, ISpacer, IText } from '../interfaces/Template'
import { EDirection } from '../enum/Components'
import { EElementType } from '../enum/Elements'

export const CONTAINER_DEFAULT: IContainer = {
    element: EElementType.CONTAINER,
    props: {
        flexbox: {
            display: 'flex',
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%',
            'flex-direction': EDirection.ROW
        }
    },
    children: []
}

export const TEXT_DEFAULT: IText = {
    element: EElementType.TEXT,
    props: {
        flexbox: {
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%'
        }
    }
}

export const IMAGE_DEFAULT: IImage = {
    element: EElementType.IMAGE,
    props: {
        flexbox: {
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%'
        },
        width: '100%',
        'max-width': '350px'
    }
}

export const SPACER_DEFAULT: ISpacer = {
    element: EElementType.SPACER,
    props: {
        flexbox: {
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%'
        },
        height: '80px'
    }
}

export const BUTTON_DEFAULT: IButton = {
    element: EElementType.BUTTON,
    props: {
        flexbox: {
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%'
        }
    }
}

export const BOX_DEFAULT: IBox = {
    element: EElementType.BOX,
    props: {
        flexbox: {
            display: 'flex',
            'flex-grow': 1,
            'flex-basis': '100%',
            'max-width': '100%',
            'flex-direction': EDirection.COLUMN
        },
        padding: '20px',
        width: '-webkit-fill-available'
    },
    children: [{
        element: EElementType.CONTAINER,
        props: {
            parent: EElementType.BOX,
            flexbox: {
                display: 'flex',
                'flex-grow': 1,
                'flex-basis': '100%',
                'max-width': '100%',
                'flex-direction': EDirection.ROW
            }
        },
        children: [{
            id: uuidv4(),
            ...TEXT_DEFAULT
        }]
    }]
}
