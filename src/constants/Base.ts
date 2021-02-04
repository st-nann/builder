import { IDropdownOption } from '../interfaces/Components'

export const POSITION: IDropdownOption[] = [
    { label: 'Duplicate to Left', value: 'left' },
    { label: 'Duplicate to Top', value: 'top' },
    { label: 'Duplicate to Right', value: 'right' },
    { label: 'Duplicate to Bottom', value: 'bottom' }
]

export const EMAIL_MENU: IDropdownOption[] = [
    { label: 'Text', value: 'Text', icon: 'format-text' },
    { label: 'Image', value: 'Image', icon: 'folder-multiple-image' },
    { label: 'Button', value: 'Button', icon: 'bootstrap' },
    { label: 'Box', value: 'Box', icon: 'cube' },
    { label: 'Spacer', value: 'Spacer', icon: 'arrow-expand-vertical' }
]

export const WEB_ATTENTION_MENU: IDropdownOption[] = [
    { label: 'Text', value: 'Text', icon: 'format-text' },
    { label: 'Image', value: 'Image', icon: 'folder-multiple-image' },
    { label: 'Button', value: 'Button', icon: 'bootstrap' },
    { label: 'Box', value: 'Box', icon: 'cube' },
    { label: 'Spacer', value: 'Spacer', icon: 'arrow-expand-vertical' },
    { label: 'Input', value: 'Input', icon: 'form-textbox' },
    { label: 'Textarea', value: 'Textarea', icon: 'form-textarea' },
    { label: 'Select', value: 'Select', icon: 'form-select' },
    { label: 'Checkbox', value: 'Checkbox', icon: 'checkbox-marked-outline' },
    { label: 'Radio', value: 'Radio', icon: 'radiobox-marked' }
]

export const FLEX_MESSAGE_MENU: IDropdownOption[] = [
    { label: 'Button', value: 'Button', icon: 'bootstrap' }
]

export const PERSONALIZES: IDropdownOption[] = [
    { label: 'Email Sender', value: '{{EMAIL_SENDER}}' },
    { label: 'Email Receiver', value: '{{EMAIL_RECEIVER}}' },
    { label: 'Firstname', value: '{{FIRSTNAME}}' },
    { label: 'Lastname', value: '{{LASTNAME}}' }
]
