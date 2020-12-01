<template>
  <div>
    {{ getText() }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TextPage extends Vue {
  @Prop() elementProps: any;
  getText() {
    return this.elementProps["text"];
  }
}
</script>
