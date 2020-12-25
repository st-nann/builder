<script lang="ts">
  import _ from 'lodash'
  import { v4 as uuidv4 } from 'uuid'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { CreateElement } from 'vue'
  import { BuilderTagMap } from './BuilderTagMap'
  import { EElementPosition } from '../enum/Elements'
  import {
    CONTAINER_DEFAULT,
    TEXT_DEFAULT,
    IMAGE_DEFAULT,
    SPACER_DEFAULT,
    BUTTON_DEFAULT,
    BOX_DEFAULT
} from '../constants/Default'
  import BoxPage from '../pages/Box.vue'
  import ButtonPage from '../pages/Button.vue'
  import ImagePage from '../pages/Image.vue'
  import SpacerPage from '../pages/Spacer.vue'
  import TextPage from '../pages/Text.vue'

  @Component({
    components: { BoxPage, ButtonPage, ImagePage, SpacerPage, TextPage },
  })
  export default class BuilderCanvas extends Vue {
    @Prop() templateJson: any

    value: any = {}
    parentId = ''
    foundParent = false
    inserted = false

    get defaultData(): any {
      return {
        CONTAINER_DEFAULT,
        TEXT_DEFAULT,
        IMAGE_DEFAULT,
        SPACER_DEFAULT,
        BUTTON_DEFAULT,
        BOX_DEFAULT
      }
    }

    createComponent(state: any, tag: CreateElement): any {
      if (_.isEmpty(state)) { return tag("div") }

      if (_.isArray(state)) {
        return state.map((child) => this.createComponent(child, tag))
      }

      const children: any[] = []

      if (state.children && state.children.length > 0) {
        state.children.forEach((child: any) => {
          children.push(_.isString(child) ? child : this.createComponent(child, tag))
        })
      }

      const style = state.props
        ? {
            ..._.pick(state.props, ['background-color', 'flexbox']),
            ...state.props.flexbox,
            ...state.props['border-bottom']
                ? {
                    'border-bottom':
                      `${state.props['border-bottom'].width} ${state.props['border-bottom'].style} ${state.props['border-bottom'].color}`
                  }
                : undefined
          }
          : undefined

      const properties = {
        props: {
          elementState: state,
          elementId: state.id,
          elementName: _.capitalize(state.element),
          elementProps: _.cloneDeep(state.props)
        },
        on: {
          add: (value: any) => {
            this.value = value
            this.foundParent = false
            if (_.includes([EElementPosition.TOP, EElementPosition.BOTTOM], value.position)) {
              this.addVerticalElement()
            } else if (_.includes([EElementPosition.LEFT, EElementPosition.RIGHT], value.position)) {
              this.addHorizontalElement()
            }
          },
          duplicate: (value: any) => {
            this.value = value
            this.foundParent = false
            if (_.includes([EElementPosition.TOP, EElementPosition.BOTTOM], value.position)) {
              this.addVerticalElement()
            } else if (_.includes([EElementPosition.LEFT, EElementPosition.RIGHT], value.position)) {
              this.addHorizontalElement()
            }
          },
          delete: (id: string) => {
            this.value.id = id
            this.deleteElement()
          },
          done: (item: any) => {
            if (state.id === item.id) {
              state.props = {
                ...item.props,
                ...(
                    _.cloneDeep(item.props)['border-bottom']
                      ? { 'border-bottom' : _.cloneDeep(item.props)['border-bottom'] }
                      : undefined
                  )
              }
            }
          }
        },
        style: style
      }

      const tagName = BuilderTagMap.getTag(state.element)

      return tag(tagName, properties, children)
    }

    addHorizontalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        state.children.forEach((item: any, index: number) => {
          if (item.id === this.value.id) {
            indexInsert = EElementPosition.LEFT === this.value.position ? index : index + 1
            const data = this.value.duplicate
              ? { ..._.cloneDeep(item) }
              : { ..._.cloneDeep(this.defaultData[`${this.value.element}_DEFAULT`]) }
            state.children.splice(indexInsert, 0, { ...data, id: uuidv4() })
          }
          this.addHorizontalElement(item)
        })
      }
    }

    addVerticalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        state.children.forEach((item: any, index: number) => {
          if (this.foundParent) {
            if (item.id === this.parentId) {
              indexInsert = EElementPosition.TOP === this.value.position ? index : index + 1
              const key: any = _.findKey(item.children, child => child.id === this.value.id)
              const data = this.value.duplicate
                ? { 
                    ..._.cloneDeep({
                    ...item,
                    children: _(item.children)
                      .map((child: any) => { return { ...child, id: uuidv4() } })
                      .filter((child: any, index: number) => index === _.parseInt(key))
                      .cloneDeep()
                    })
                  }
                : { 
                    ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT']),
                    id: uuidv4(),
                    children: _.cloneDeep([{
                      id: uuidv4(),
                      ..._.cloneDeep(this.defaultData[`${this.value.element}_DEFAULT`])
                    }])
                  }
              if (!this.inserted) {
                state.children.splice(indexInsert, 0, { ...data, id: uuidv4() })
                this.inserted = true
              }
            }
            this.addVerticalElement(item)
          } else {
            this.foundParent = item.id === this.value.id
            this.parentId = state.id
            this.inserted = false
            this.addVerticalElement(this.foundParent ? undefined : item)
          }
        })
      }
    }

    deleteElement(state: any = this.templateJson) {
      if (state.children) {
        state.children.forEach((child: any) => {
          if (child.id === this.value.id) {
            state.children = _.filter(state.children, item => this.value.id !== item.id)
            this.deleteChildElement()
          }
          this.deleteElement(child)
        })
      }
    }

    deleteChildElement(state: any = this.templateJson) {
      if (state.children) {
        state.children = _.filter(state.children, item => item.children.length > 0)
      }
      return
    }

    render(createElement: CreateElement) {
      return this.createComponent(this.templateJson, createElement)
    }
  }
</script>
