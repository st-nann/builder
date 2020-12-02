<script lang="ts">
  import _ from 'lodash'
  import { uuid } from 'uuidv4'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { CreateElement } from 'vue'
  import { BuilderTagMap } from './BuilderTagMap'
  import { EElementPosition } from '../enum/Elements'
  import {
    CONTAINER_DEFAULT,
    SECTION_DEFAULT,
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
    parantId = ''
    foundParent = false

    get defaultData(): any {
      return {
        CONTAINER_DEFAULT,
        SECTION_DEFAULT,
        TEXT_DEFAULT,
        IMAGE_DEFAULT,
        SPACER_DEFAULT,
        BUTTON_DEFAULT,
        BOX_DEFAULT
      }
    }

    createComponent(state: any, tag: CreateElement): any {
      if (_.isEmpty(state)) {
        return tag("div")
      }

      if (_.isArray(state)) {
        return state.map((child) => this.createComponent(child, tag));
      }

      if (_.isUndefined(state.id)) {
        state.id = uuid()
      }

      const children: any[] = [];

      if (state.children && state.children.length > 0) {
        state.children.forEach((child: any) => {
          if (_.isString(child)) {
            children.push(child);
          } else {
            children.push(this.createComponent(child, tag));
          }
        });
      }

      const properties = {
        style: {
          'border-bottom': `${state['container-props'].width} ${state['container-props'].style} ${state['container-props'].color}`,
          ...state['container-props'].flexbox,
          ...state['element-props']
        },
        props: {
          elementId: state.id,
          elementName: _.capitalize(state.element),
          containerProps: state['container-props'],
          elementProps: state['element-props']
        },
        on: {
          add: (value: any) => {
            this.value = value
            switch (value.position) {
              case EElementPosition.TOP:
                this.addVerticalElement()
                break
              case EElementPosition.RIGHT:
                this.addHorizentalElement()
                break
              case EElementPosition.BOTTOM:
                this.addVerticalElement()
                break
              case EElementPosition.LEFT:
                this.addHorizentalElement()
                break
            }
          },
          done: (value: any) => {
            if (state.id === value.id) {
              state['container-props'] = value['container-props']
              state['element-props'] = value['element-props']
            }
          }
        }
      };

      const tagName = BuilderTagMap.getTag(state.element)

      return tag(tagName, properties, children)
    }

    addHorizentalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        const lists = state.children.find((item: any, index: number) => {
          if (item.id === this.value.id) {
            indexInsert = index
            return true
          }
          this.addHorizentalElement(item)
        })
        if (lists) {
          state.children.splice(indexInsert, 0,
            this.defaultData[`${this.value.element}_DEFAULT`]
          )
        }
      }
    }

    addVerticalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        const lists = state.children.find((item: any, index: number) => {
          if (this.foundParent) {
            if (item.id === this.parantId) {
              indexInsert = index
              return true
            }
            this.addVerticalElement(item)
          } else {
            this.foundParent = item.id === this.value.id
            this.parantId = state.id
            this.addVerticalElement(this.foundParent ? undefined : item)
          }
        })
        if (lists) {
          state.children.splice(indexInsert, 0, {
            ...this.defaultData['CONTAINER_DEFAULT'],
            children: [this.defaultData[`${this.value.element}_DEFAULT`]]
          })
        }
      }
    }

    render(createElement: CreateElement) {
      return this.createComponent(this.templateJson, createElement);
    }
  }
</script>
