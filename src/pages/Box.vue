<template>
  <div>
    {{ elementState }}
    <!-- <BuilderCanvas :templateJson="elementState"/> -->
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseComponent from '../core/BaseComponent'

@Component
export default class BoxPage extends BaseComponent {}
</script>
