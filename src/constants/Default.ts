import { v4 as uuidv4 } from 'uuid'
import {
    IBox,
    IButton,
    ICheckbox,
    IContainer,
    IImage,
    IInput,
    IRadio,
    ISpacer,
    ISelect,
    IText,
    ITextArea
} from '../interfaces/Template'
import { EDirection, EInputType } from '../enum/Components'
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
    props: {
        flexbox: {
            'flex-grow': 1
        },
        'word-break': 'break-all'
    }
}

export const IMAGE_DEFAULT: IImage = {
    element: EElementType.IMAGE,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        width: '100%',
        'max-width': '350px'
    }
}

export const SPACER_DEFAULT: ISpacer = {
    element: EElementType.SPACER,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        height: '80px'
    }
}

export const BUTTON_DEFAULT: IButton = {
    element: EElementType.BUTTON,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        height: 'max-content'
    }
}

export const BOX_DEFAULT: IBox = {
    element: EElementType.BOX,
    props: {
        flexbox: {
            display: 'flex',
            'flex-grow': 1,
            'flex-direction': EDirection.COLUMN
        },
        padding: {
            'padding-x': '20px',
            'padding-y': '20px'
        }
    },
    children: [{
        element: EElementType.CONTAINER,
        props: {
            parent: EElementType.BOX,
            flexbox: {
                display: 'flex',
                'flex-grow': 1,
                'flex-direction': EDirection.ROW
            }
        },
        children: [{
            id: uuidv4(),
            ...TEXT_DEFAULT
        }]
    }]
}

export const INPUT_DEFAULT: IInput = {
    element: EElementType.INPUT,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        type: EInputType.TEXT,
        height: '35px',
        width: '50px',
        required: false,
        margin: {
            'margin-x': '5px',
            'margin-y': '5px'
        }
    }
}

export const TEXTAREA_DEFAULT: ITextArea = {
    element: EElementType.TEXTAREA,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        height: '35px',
        width: '50px',
        required: false,
        margin: {
            'margin-x': '5px',
            'margin-y': '5px'
        }
    }
}

export const SELECT_DEFAULT: ISelect = {
    element: EElementType.SELECT,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        height: '35px',
        width: '50px',
        required: false,
        margin: {
            'margin-x': '5px',
            'margin-y': '5px'
        }
    }
}

export const CHECKBOX_DEFAULT: ICheckbox = {
    element: EElementType.CHECKBOX,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        required: false,
        checked: false,
        margin: {
            'margin-x': '5px',
            'margin-y': '5px'
        }
    }
}

export const RADIO_DEFAULT: IRadio = {
    element: EElementType.RADIO,
    props: {
        flexbox: {
            'flex-grow': 1
        },
        required: false,
        checked: false,
        margin: {
            'margin-x': '5px',
            'margin-y': '5px'
        }
    }
}
