<template>
  <div class="footer-panel">
    <div class="footer-panel-switch">
      <BorderStyleComponent
        name="footer-panel-border-bottom"
        @change="getBorderButton"
      />
      <BackgroundStyleComponent
        name="footer-panel-background"
        @change="getBackground"
      />
    </div>
    <div class="footer-panel-button">
      <SquareButtonComponent
        label="Cancel"
        className="cancel-square-button"
        @click="onEmitCancel"
      />
      <SquareButtonComponent
        label="Done"
        className="done-square-button"
        @click="onEmitDone"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class FooterPanel extends BaseComponent {
  borderBottom = {}
  background = {}

  getBorderButton(value: any) {
    this.borderBottom = value
  }

  getBackground(value: any) {
    this.background = value
  }

  onEmitCancel() {
    this.$emit('click')
  }

  onEmitDone() {
    this.$emit('click', { ...this.borderBottom, ...this.background })
  }
}
</script>
