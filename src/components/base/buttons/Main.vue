<template>
  <span>
    <SquareButtonComponent
      icon="pencil"
      className="default-square-button"
      @click="doEdit"
    />
    <SquareMenuButtonComponent
      icon="note-multiple"
      className="default-square-menu-button"
      :options="positions"
      @click="doSetPosition"
    />
    <ModalComponent
      ref="modal"
      :modal="{ width: 400, button: { save: 'Yes, Delete it', position: 'center' } }"
      :elementId="elementId"
      @click="doDelete"
    >
      <SquareButtonComponent
        slot="button"
        icon="trash-can"
        className="delete-square-button"
        @click="doOpenModal"
      />
      <div slot="content">
        <div class="content-delete">
          <i class="content-delete-image mdi mdi-delete-circle" />
          <div class="content-delete-title">Delete Element</div>
          <div class="content-delete-body">Are you sure you want to delete this element ?</div>
        </div>
      </div>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { POSITION } from '../../../constants/Base'

@Component
export default class MainButtonComponent extends BaseComponent {
  @Prop(String) elementId!: string
  
  isOpenModal = false
  edit = false
  delete = false
  position = ''
  
  get positions() {
    return POSITION
  }

  doOpenModal() {
    this.$refs.modal.isOpenModal = true
  }

  doEdit() {
    this.edit = !this.edit
    this.doEmitData()
  }

  doSetPosition(position: string) {
    this.position = position
    this.doEmitData()
  }

  doDelete() {
    this.delete = true
    this.doEmitData()
  }

  doEmitData() {
    let data
    if (this.edit) {
      data = {
        edit: this.edit,
        position: _.isEmpty(this.position) ? 'center' : this.position
      }
    }
    if (this.delete) {
      data = { delete: this.delete }
    }
    this.$emit('click', data)
    Object.assign(this.$data, (this.$options.data as any).apply(this))
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
