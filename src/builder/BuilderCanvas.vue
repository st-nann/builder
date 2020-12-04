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

      const properties = {
        props: {
          elementId: state.id,
          elementName: _.capitalize(state.element),
          props: state.props,
          elementValue: state.value,
          elementValueHtml: state.valueHtml
        },
        on: {
          add: (value: any) => {
            this.value = value
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
          done: (value: any) => {
            if (state.id === value.id) {
              state.props = {
                ...value.props,
                'border-bottom': JSON.parse(JSON.stringify(value.props))['border-bottom']
              }
              state.value = value.value
              state.valueHtml = value.valueHtml
            }
          }
        },
        style: {
          'border-bottom': state.props['border-bottom']
            ? `${state.props['border-bottom'].width} ${state.props['border-bottom'].style} ${state.props['border-bottom'].color}`
            : undefined,
          ...state.props,
          ...state.props.flexbox
        }
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
          state.children.splice(indexInsert, 0, {
            id: uuid(),
            ...this.defaultData[`${this.value.element}_DEFAULT`]
          })
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
          state.children.splice(indexInsert, 0, {
            ...this.defaultData['CONTAINER_DEFAULT'],
            id: uuid(),
            children: [{
              id: uuid(),
              ...this.defaultData[`${this.value.element}_DEFAULT`]
            }]
          })
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
