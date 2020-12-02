<template>
  <span>
    <input
      id="file"
      name="image"
      class="upload-input"
      type="file"
      accept="image/*"
      @change="onUpload($event)"
    >
    <label id="upload" for="file">
      <div class="upload-square-button">
        <i class="mdi mdi-folder-multiple-image" /> Upload New Image
      </div>
    <!-- <img id="output" class="upload-image" /> -->
    </label>
  </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'

@Component
export default class UploadImageComponent extends BaseComponent {
  onUpload (event: any) {
    const output = document.getElementById('output')
    // const upload = document.getElementById('upload')
    // if (output && upload) {
    if (output) {
      output.setAttribute( 'src', URL.createObjectURL(event.target.files[0]))
      // upload.setAttribute( 'style', 'display: none;')
      this.value = URL.createObjectURL(event.target.files[0])
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
