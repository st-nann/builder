<template>
  <span>
    <div :class="{ 'button-management': elementName === 'Box' }">
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
        v-if="isDisplay"
        icon="trash-can"
        className="delete-square-button"
        @click="doOpenModal"
      />
    </div>
    <ModalComponent
      v-bind="$props"
      :ref="`modal-delete-${elementId}`"
      :modal="{ width: 400, action: 'delete', button: { save: 'Yes, Delete it', position: 'center', manage: true } }"
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
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { POSITION } from '../../../constants/Base'

@Component
export default class MainButtonComponent extends BaseComponent {
  isOpenModal = false
  edit = false
  duplicate = false
  delete = false
  position = ''
  
  get positions() {
    return _.filter(POSITION, (item: any) => {
      if (_.isUndefined(this.parent.quantityChildrenBox) || this.parent.quantityChildren < 4) { return item }
      return !_.includes(['left', 'right'], item.value)
    })
  }

  get isDisplay() {
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
}
</script>

<style lang="scss">
  @import '../../../assets/scss/Main.scss';
</style>
