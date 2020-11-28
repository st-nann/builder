<template>
  <fragment>
    <ButtonGroupComponent
      v-if="isButtonGroupComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <BoxComponent
      v-else-if="isBoxComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <ColorPickerComponent
      v-else-if="isColorPickerComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <DropdownComponent
      v-else-if="isDropdownComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <InputComponent
      v-else-if="isInputComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <ModalComponent
      v-else-if="isModalComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <SwitchComponent
      v-else-if="isSwitchComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <TextPanelComponent
      v-else-if="isTextPanelComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
    <UploadImageComponent
      v-else-if="isUploadImageComponent()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{...option.props.on}"/>
  </fragment>
</template>

<script lang="ts">
import { Base } from '../core/Base'
import { Component, Prop } from 'vue-property-decorator'
import { IComponentOption } from '../interfaces/Components'
import { EComponentType } from '../enum/Components'

@Component
export default class Condition extends Base {
  @Prop(Object) readonly option!: IComponentOption
  @Prop(Object) readonly value!: IComponentOption

  isButtonGroupComponent(): boolean {
    return this.option.type === EComponentType.BUTTON_GROUP
  }

  isBoxComponent(): boolean {
    return this.option.type === EComponentType.BOX
  }

  isColorPickerComponent(): boolean {
    return this.option.type === EComponentType.COLOR_PICKER
  }

  isDropdownComponent(): boolean {
    return this.option.type === EComponentType.DROPDOWN
  }

  isInputComponent(): boolean {
    return this.option.type === EComponentType.INPUT
  }

  isModalComponent(): boolean {
    return this.option.type === EComponentType.MODAL
  }

  isSwitchComponent(): boolean {
    return this.option.type === EComponentType.SWITCH
  }

  isTextPanelComponent(): boolean {
    return this.option.type === EComponentType.TEXT_PANEL
  }

  isUploadImageComponent(): boolean {
    return this.option.type === EComponentType.UPLOAD_IMAGE
  }
}
</script>
