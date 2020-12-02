<template>
  <span>
    <slot name="button"/>
    <div id="modal" class="modal">
      <div class="modal-content" :style="style">
        <slot name="content" />
        <div class="modal-action" :style="style">
          <SquareButtonComponent
            @click="doCloseModal"
            label="Cancel"
            className="cancel-delete-square-button"
          />
          <SquareButtonComponent
            @click="doAction"
            :label="modal.button.save"
            className="confirm-delete-square-button"
          />
        </div>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ModalComponent extends BaseComponent {

  isOpenModal = false

  get style() {
    return {
      '--modal-width': `${this.modal.width}px`,
      '--modal-action-position': this.modal.button?.position
    }
  }

  doCloseModal() {
    this.isOpenModal = false
  }

  doAction() {
    this.doCloseModal()
    this.$emit('click')
  }

  @Watch('isOpenModal')
  triggerModal() {
    document.getElementById("modal")?.setAttribute('style', `display: ${this.isOpenModal ? 'block' : 'none' }`)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>