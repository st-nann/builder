<template>
  <span>
    <SquareButtonComponent icon="pencil" className="default-square-button"/>
    <SquareMenuButtonComponent icon="note-multiple" :options="positions"/>
    <ModalComponent
      ref="modal"
      :modal="{ width: 400, button: { save: 'Yes, Delete it', position: 'center' } }"
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
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { POSITION } from '../../../constants/Base'

@Component
export default class MainButtonComponent extends BaseComponent {
  isOpenModal = false
  
  get positions() {
    return POSITION
  }

  doOpenModal() {
    this.$refs.modal.isOpenModal = true
  }

  doDelete() {
    // delete
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Components.scss';
</style>
