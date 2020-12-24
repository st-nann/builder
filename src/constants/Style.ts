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
    { icon: 'align-vertical-top', value: 'flex-start' },
    { icon: 'align-horizontal-center', value: 'center' },
    { icon: 'align-vertical-bottom', value: 'flex-end' }
]

export const HORIZONTAL_POSITION_STYLE: IDropdownOption[] = [
    { icon: 'format-align-left', value: 'flex-start' },
    { icon: 'format-align-center', value: 'center' },
    { icon: 'format-align-right', value: 'flex-end' }
]

export const FONT_STYLE: string[] = [
    'Arial',
    'Arial-Black',
    'Brush-Script-MT',
    'Comic-Sans-MS',
    'Courier-New',
    'Georgia',
    'Helvetica',
    'Impact',
    'Lucida-Sans-Unicode',
    'Tahoma',
    'Times-New-Roman',
    'Trebuchet-MS',
    'Verdana'
]
