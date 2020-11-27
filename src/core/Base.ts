import { Vue } from 'vue-property-decorator'

export class Base extends Vue {
  $store!: any
  $refs!: any
  $router!: any
}
