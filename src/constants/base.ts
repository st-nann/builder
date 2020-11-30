import { IDropdownOption } from '../interfaces/Components'

export const POSITION: IDropdownOption[] = [
    { label: 'To Left', value: 'left' },
    { label: 'To Top', value: 'top' },
    { label: 'To Right', value: 'right' },
    { label: 'To Bottom', value: 'bottom' }
]

export const MENU: IDropdownOption[] = [
    { label: 'Text', value: 'text', icon: '' },
    { label: 'Image', value: 'image', icon: '' },
    { label: 'Button', value: 'button', icon: '' },
    { label: 'Box', value: 'box' },
    { label: 'Spacer', value: 'spacer', icon: '' }
]