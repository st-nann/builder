<template>
  <div :id="`modal-${modal.action}-${elementId}`" class="modal-overlay">
    <div class="modal" :style="style">
      <div class="modal-content-container">
        <slot name="content" />
      </div>
      <div v-if="modal.button" class="modal-action-container" :style="style">
          <div class="modal-action">
            <template v-if="modal.button.manage">
              <SquareButtonComponent
                label="Cancel"
                className="cancel-delete-square-button"
                @click="doCloseModal"
              />
              <SquareButtonComponent
                :label="modal.button.save"
                className="confirm-delete-square-button"
                @click="doAction"
              />
            </template>
            <template v-if="modal.button.info">
              <SquareButtonComponent
                label="Close"
                className="cancel-delete-square-button"
                @click="doCloseModal"
              />
            </template>
            <template v-if="modal.button.custom">
              <slot name="action-custom" />
            </template>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ModalComponent extends BaseComponent {
  isOpenModal = false

  get style() {
    return {
      '--modal-width': `${this.modal.width}%`,
      '--modal-height': `${this.modal.height}%`,
      '--modal-action-position': this.modal.button?.position
    }
  }

  doCloseModal() {
    Object.assign(this.$data, (this.$options.data as any).apply(this))
  }

  doAction() {
    this.doCloseModal()
    this.$emit('click')
  }

  @Watch('isOpenModal')
  triggerModal() {
    const self = this
    setTimeout(() => {
      document.getElementById(`modal-${self.modal.action}-${self.elementId}`)?.setAttribute(
        'style', `display: ${self.isOpenModal ? 'block' : 'none' }`
      )
    }, 100)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>