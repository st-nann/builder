<script lang="ts">
  import _ from 'lodash'
  import { uuid } from 'uuidv4'
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
  import BoxPage from '../pages/Box'
  import ButtonPage from '../pages/Button'
  import ImagePage from '../pages/Image'
  import SpacerPage from '../pages/Spacer'
  import TextPage from '../pages/Text'

  @Component({
    components: { BoxPage, ButtonPage, ImagePage, SpacerPage, TextPage },
  })
  export default class BuilderCanvas extends Vue {
    @Prop() viewJSON: any
    @Prop() templateJson: any

    value: any = {}
    parentId = ''
    foundParent = false

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

      const style = {
        ...state.props,
        ...(state.props && state.props.flexbox ? state.props.flexbox : undefined),
        ...(
            state.props && state.props['border-bottom']
              ? {
                  'border-bottom':
                    `${state.props['border-bottom'].width} ${state.props['border-bottom'].style} ${state.props['border-bottom'].color}`
                }
              : undefined
          )
      }

      const properties = {
        props: {
          elementId: state.id,
          elementName: _.capitalize(state.element),
          elementProps: state.props,
          elementValue: state.value
        },
        on: {
          add: (value: any) => {
            this.value = value
            this.foundParent = false
            if (_.includes([EElementPosition.TOP, EElementPosition.BOTTOM], value.position)) {
              this.addVerticalElement()
            } else if (_.includes([EElementPosition.LEFT, EElementPosition.RIGHT], value.position)) {
              this.addHorizentalElement()
            }
          },
          duplicate: (value: any) => {
            this.value = value
            this.foundParent = false
            if (_.includes([EElementPosition.TOP, EElementPosition.BOTTOM], value.position)) {
              this.addVerticalElement()
            } else if (_.includes([EElementPosition.LEFT, EElementPosition.RIGHT], value.position)) {
              this.addHorizentalElement()
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
              state.value = _.cloneDeep(item.value)
            }
          }
        },
        style: style
      }

      const tagName = BuilderTagMap.getTag(state.element)

      return tag(tagName, properties, children)
    }

    addHorizentalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        const lists = state.children.find((item: any, index: number) => {
          if (item.id === this.value.id) {
            indexInsert = EElementPosition.LEFT === this.value.position
              ? index
              : index + 1
            return true
          }
          this.addHorizentalElement(item)
        })
        if (lists) {
          const data = this.value.duplicate
            ? { ..._.cloneDeep(lists) }
            : { ..._.cloneDeep(this.defaultData[`${this.value.element}_DEFAULT`]) }
          state.children.splice(indexInsert, 0, { ...data, id: uuid() })
        }
      }
    }

    addVerticalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        const lists = state.children.find((item: any, index: number) => {
          if (this.foundParent) {
            if (item.id === this.parentId) {
              indexInsert = EElementPosition.TOP === this.value.position
                ? index
                : index + 1
              return true
            }
            this.addVerticalElement(item)
          } else {
            this.foundParent = item.id === this.value.id
            this.parentId = state.id
            this.addVerticalElement(this.foundParent ? undefined : item)
          }
        })
        if (lists) {
          const key: any = _.findKey(lists.children, child => child.id === this.value.id)
          const data = this.value.duplicate
            ? { ..._.cloneDeep({
                  ...lists,
                  children: _(lists.children)
                    .map((child: any, index: number) => {
                      return {
                        ...child,
                        id: uuid(),
                        props: index === _.parseInt(key) ? child.props : {},
                        value: index === _.parseInt(key) ? child.value : undefined,
                      }
                    })
                    .cloneDeep()
                })
              }
            : { ..._.cloneDeep(this.defaultData['CONTAINER_DEFAULT']),
                id: uuid(),
                children: _.cloneDeep([{
                  id: uuid(),
                  ..._.cloneDeep(this.defaultData[`${this.value.element}_DEFAULT`])
                }])
              }
          state.children.splice(indexInsert, 0, { ...data, id: uuid() })
        }
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
