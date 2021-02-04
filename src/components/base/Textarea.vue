<template>
  <span class="textarea-container">
    <label v-if="label" class="textarea-label">{{ label }}</label>
    <textarea
      :id="`textarea-${name}`"
      :value="convertValue"
      :placeholder="placeholder"
      class="textarea"
      :cols="cols"
      :rows="rows"
      @input="doUpdateTextarea"
    />
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class TextareaComponent extends BaseComponent {

  get convertValue() {
    return typeof this.value === 'object'
      ? this.value.toString().replaceAll(',', '\n')
      : this.value
  }

  doUpdateTextarea() {
    const element: any = document.getElementById(`textarea-${this.name}`)
    this.onInput(_.split(element.value, '\n'))
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
