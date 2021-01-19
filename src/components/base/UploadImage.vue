<template>
  <span>
    <input
      id="file"
      name="image"
      class="upload-input"
      type="file"
      accept="image/*"
      :disabled="disabled"
      @change="onUpload($event)"
    >
    <label id="upload" for="file">
      <div :class="['upload-square-button', { 'upload-square-button-diabled': disabled }]">
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
    const formData = new FormData()
    const file = event.target.files[0]
    formData.append('file', file, file.name)
    this.onInput({
      name: file.name,
      file: formData,
      url: URL.createObjectURL(event.target.files[0]),
      message: event.target.files[0].size > 2000000
        ? 'Image size should be less than 2 MB.'
        : undefined
    })
    // display image on div 
    /*
    const output = document.getElementById('output')
    const upload = document.getElementById('upload')
    if (output && upload) {
      output.setAttribute( 'src', URL.createObjectURL(event.target.files[0]))
      upload.setAttribute( 'style', 'display: none;')
      this.value = URL.createObjectURL(event.target.files[0])
    }
    */
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
