<template>
  <fragment>
    <SquareButtonComponent icon="pencil" className="default-square-button"/>
    <SquareMenuButtonComponent icon="note-multiple" :options="positions"/>
    <SquareButtonComponent icon="trash-can" className="delete-square-button"/>
  </fragment>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../../core/BaseComponent'
import { POSITION } from '../../../constants/base'

@Component
export default class MainButtonComponent extends BaseComponent {
  get positions() {
    return POSITION
  }
}
</script>
