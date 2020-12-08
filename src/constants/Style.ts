import { IDropdownOption } from '../interfaces/Components'

export const BORDER_STYLE: IDropdownOption[] = [
    { label: 'solid', value: 'solid' },
    { label: 'dashed', value: 'dashed' },
    { label: 'dotted', value: 'dotted' },
    { label: 'double', value: 'double' },
    { label: 'groove', value: 'groove' },
    { label: 'ridge', value: 'ridge' },
    { label: 'inset', value: 'inset' },
    { label: 'outset', value: 'outset' }
]

export const VERTICAL_POSITION_STYLE: IDropdownOption[] = [
    { icon: 'align-vertical-top', value: 'start' },
    { icon: 'align-horizontal-center', value: 'center' },
    { icon: 'align-vertical-bottom', value: 'end' }
]

export const HORIZENTAL_POSITION_STYLE: IDropdownOption[] = [
    { icon: 'format-align-left', value: 'start' },
    { icon: 'format-align-center', value: 'center' },
    { icon: 'format-align-right', value: 'end' }
]
