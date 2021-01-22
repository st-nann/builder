declare module '*' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}

declare var Quill: any
