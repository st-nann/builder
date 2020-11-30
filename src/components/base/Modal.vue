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

  get style() {
    return {
      '--modal-width': `${this.modal.width}px`,
      '--modal-action-position': this.modal.button?.position
    }
  }

  doCloseModal() {
    this.modal.open = false
  }

  doAction() {
    this.doCloseModal()
    this.$emit('clickAction')
  }

  @Watch('modal.open', { deep: true })
  triggerModal() {
    document.getElementById("modal")?.setAttribute('style', `display: ${this.modal.open ? 'block' : 'none' }`)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Components.scss';
</style>