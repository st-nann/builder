<template>
  <span>
    <span class="button-setting-container">
      <SquareButtonComponent
        icon="cog"
        :class="{ 'button-setting-box': elementName === 'Box' }"
        className="default-square-button"
      />
      <div class="button-setting-container-hidden">
        <div class="button-setting-group">
          <div class="button-setting-title">Setting</div>
          <div class="button-management">
            <div class="button-management-title">Management</div>
            <div class="button-management-action">
              <SquareButtonComponent
                icon="pencil"
                className="default-square-button"
                @click="doEdit"
              />
              <SquareMenuButtonComponent
                v-if="isDisplayDuplicateBtn"
                icon="note-multiple"
                className="default-square-menu-button"
                :options="positions"
                @click="doDuplicate"
              />
              <SquareButtonComponent
                v-if="isDisplayDeleteBtn"
                icon="trash-can"
                className="delete-square-button"
                @click="doOpenModal"
              />
            </div>
            <div class="button-scale-container">
              <div class="button-scale-title">Scale</div>
              <ScaleStyleComponent
                v-bind="$props"
                :management="management"
                customKeyValue="flex-grow"
                @click="onUpdateScale"
              />
            </div>
          </div>
        </div>
      </div>
    </span>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-delete-${elementId}`"
      :modal="{
        width: 25,
        height: 33,
        action: 'delete',
        button: { save: 'Yes, Delete it', position: 'center', manage: true }
      }"
      @click="doDelete"
    >
      <template slot="content">
        <div class="modal-content-delete">
          <i class="delete-image mdi mdi-delete-circle" />
          <div class="delete-title">Delete Element</div>
          <div class="delete-body">Are you sure you want to delete this element ?</div>
        </div>
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { POSITION } from '../../../constants/Base'
import { EElementType, EMessageType } from '@/enum/Elements'

@Component
export default class MainButtonComponent extends BaseComponent {
  @Prop() readonly management!: any
  
  isOpenModal = false
  edit = false
  duplicate = false
  delete = false
  position = ''
  
  get positions() {
    return _.filter(POSITION, (item: any) => {
      if (this.elementMessageType === EMessageType.FLEX_MESSAGE) { return !_.includes(['left', 'right'], item.value) }
      else if (_.isUndefined(this.parent.quantityChildrenBox) || this.parent.quantityChildren < 6) { return item }
      return !_.includes(['left', 'right'], item.value)
    })
  }

  get isDisplayDuplicateBtn() {
    return this.elementMessageType === EMessageType.FLEX_MESSAGE
      ? _.upperCase(this.elementName) === EElementType.BUTTON && this.parent.quantityChildrenButtonBox < 3
      : true
  }

  get isDisplayDeleteBtn() {
    return _.isUndefined(this.parent.quantityChildrenBox) || this.parent.quantityChildrenBox > 1
  }

  doOpenModal() {
    this.$refs[`modal-delete-${this.elementId}`].isOpenModal = true
  }

  doEdit() {
    this.edit = !this.edit
    this.doEmitData()
  }

  doDuplicate(position: string) {
    this.position = _.upperCase(position)
    this.duplicate = true
    this.doEmitData()
  }

  doDelete() {
    this.delete = true
    this.doEmitData()
  }

  doEmitData() {
    this.$emit('click', {
      edit: this.edit,
      duplicate: this.duplicate,
      position: this.position,
      delete: this.delete
    })
    Object.assign(this.$data, (this.$options.data as any).apply(this))
  }

  onUpdateScale(scale: any) {
    this.$emit('change', scale)
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
