<template>
  <div :id="`modal-${modal.action}-${elementId}`" class="modal">
    <div class="modal-content" :style="style">
      <slot name="content" />
      <div v-if="modal.button" class="modal-action" :style="style">
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
</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class ModalComponent extends BaseComponent {
  @Prop(String) elementId!: string

  isOpenModal = false

  get style() {
    return {
      '--modal-width': `${this.modal.width}px`,
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
    document.getElementById(`modal-${this.modal.action}-${this.elementId}`)?.setAttribute(
      'style', `display: ${this.isOpenModal ? 'block' : 'none' }`
    )
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>