export class ComponentState {
  public loading: { [key: string]: boolean }[]

  constructor() {
    this.loading = []
  }
}

export default ComponentState
