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
      @click="doDuplicate"
    />
    <SquareButtonComponent
      icon="trash-can"
      className="delete-square-button"
      @click="doOpenModal"
    />
    <ModalComponent
      :ref="`modal-delete-${elementId}`"
      :modal="{ width: 400, action: 'delete', button: { save: 'Yes, Delete it', position: 'center' } }"
      :elementId="elementId"
      @click="doDelete"
    >
      <template slot="content">
        <div class="content-delete">
          <i class="content-delete-image mdi mdi-delete-circle" />
          <div class="content-delete-title">Delete Element</div>
          <div class="content-delete-body">Are you sure you want to delete this element ?</div>
        </div>
      </template>
    </ModalComponent>
  </span>
</template>

<script lang="ts">
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
    this.$refs[`modal-delete-${this.elementId}`].isOpenModal = true
  }

  doEdit() {
    this.edit = !this.edit
    this.doEmitData()
  }

  doDuplicate(position: string) {
    this.position = position
    this.doEmitData()
  }

  doDelete() {
    this.delete = true
    this.doEmitData()
  }

  doEmitData() {
    this.$emit('click', {
      edit: this.edit,
      position: this.position,
      delete: this.delete
    })
    Object.assign(this.$data, (this.$options.data as any).apply(this))
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
