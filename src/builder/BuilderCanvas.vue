<script lang="ts">
  import _ from 'lodash'
  import { v4 as uuidv4 } from 'uuid'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { CreateElement } from 'vue'
  import { BuilderTagMap } from './BuilderTagMap'
  import { IMessageType, IScreen } from '../interfaces/Components'
  import { EDirection } from '../enum/Components'
  import { EElementPosition, EElementType, EMessageType } from '../enum/Elements'
  import {
    CONTAINER_DEFAULT,
    TEXT_DEFAULT,
    IMAGE_DEFAULT,
    SPACER_DEFAULT,
    BUTTON_DEFAULT,
    BOX_DEFAULT,
    INPUT_DEFAULT,
    TEXTAREA_DEFAULT,
    SELECT_DEFAULT,
    CHECKBOX_DEFAULT,
    RADIO_DEFAULT
  } from '../constants/Default'

  @Component
  export default class BuilderCanvas extends Vue {
    @Prop() readonly templateJson!: any
    @Prop() readonly messageType!: IMessageType
    @Prop() readonly screen!: IScreen

    value: any = {}
    parentId = ''
    isParentBox = false
    foundParent = false
    inserted = false
    containerId: string[] = []

    get defaultData(): any {
      return {
        CONTAINER_DEFAULT,
        TEXT_DEFAULT,
        IMAGE_DEFAULT,
        SPACER_DEFAULT,
        BUTTON_DEFAULT,
        BOX_DEFAULT,
        INPUT_DEFAULT,
        TEXTAREA_DEFAULT,
        SELECT_DEFAULT,
        CHECKBOX_DEFAULT,
        RADIO_DEFAULT
      }
    }

    createComponent(state: any, createElement: CreateElement): any {
      if (_.isEmpty(state)) { return createElement("div") }

      if (_.isArray(state)) {
        return state.map((child) => this.createComponent(child, createElement))
      }

      /* Responsive Mobile */
      if (this.screen.mobile) {
        if (
          state.element === EElementType.CONTAINER &&
          state.props.flexbox['flex-direction'] === EDirection.ROW
        ) {
          if (
            state.props.parent !== EElementType.BOX &&
            !_.every(state.children, { element: EElementType.IMAGE })
          ) {
            this.containerId.push(state.id)
            state.props.flexbox['flex-direction'] = EDirection.COLUMN
          }
        }
      }

      /* Responsive Dasktop */
      if (this.screen.desktop || (!this.screen.desktop && !this.screen.mobile)) {
        if (
          state.element === EElementType.CONTAINER &&
          state.props.flexbox['flex-direction'] === EDirection.COLUMN
        ) {
          if (_.includes(this.containerId, state.id)) {
            state.props.flexbox['flex-direction'] = EDirection.ROW
            _.pull(this.containerId, state.id)
          }
        }
      }

      /* Map Tag Name For Create Component */
      const tagName = BuilderTagMap.getTag(state.element)

      const children: any[] = []
      if (state.children && state.children.length > 0) {
        state.children.forEach((child: any) => {
          children.push(_.isString(child) ? child : this.createComponent(child, createElement))
        })
      }

      /* Assign Width Button Flex Message */
      if (this.messageType === EMessageType.FLEX_MESSAGE) {
        if (state.element === EElementType.BUTTON) {
          state.props.width = '100%'
        }
      }

      /* Root Element Style */
      const style = state.props
        ? {
            'background-color': EElementType.CONTAINER && this.messageType === EMessageType.FLEX_MESSAGE
              ? 'transparent'
              : { ..._.pick(state.props, ['background-color']) },
            ...state.props.flexbox,
            ...state.props['border-bottom']
                ? {
                    'border-bottom':
                      `${state.props['border-bottom'].width} ${state.props['border-bottom'].style} ${state.props['border-bottom'].color}`
                  }
                : undefined,
            width: state.element === EElementType.CONTAINER
              ? undefined
              : (this.screen.mobile ? `calc(100%)` : `calc(0%)`),
            'flex-grow': state.props.flexbox && state.props.flexbox['flex-grow'] ? state.props.flexbox['flex-grow'] : 1,
          }
          : undefined

      const properties = {
        style: style,
        props: {
          elementTemplateJson: this.templateJson,
          elementMessageType: this.messageType,
          elementState: state,
          elementId: state.id,
          elementName: _.capitalize(state.element),
          elementProps: _.cloneDeep(state.props),
          elementScreen: this.screen
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
        }
      }
    
      return createElement(tagName, properties, children)
    }

    /*  Add Element Left And Right */
    addHorizontalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        state.children.forEach((item: any, index: number) => {
          if (item.id === this.value.id) {
            indexInsert = EElementPosition.LEFT === this.value.position ? index : index + 1
            const defaultElement = this.defaultData[`${this.value.element}_DEFAULT`]
            const data = this.value.duplicate ? { ..._.cloneDeep(item) } : { ..._.cloneDeep(defaultElement) }
            this.assignChildElementId(data)
            state.children.splice(indexInsert, 0, { ...data, id: uuidv4() })
            this.value.id = ''
          }
          this.addHorizontalElement(item)
        })
      }
    }

    /*  Add Element Top And Bottom */
    addVerticalElement(state: any = this.templateJson) {
      if (state.children) {
        let indexInsert = 0
        state.children.forEach((item: any, index: number) => {
          if (this.foundParent) {
            if (item.id === this.parentId) {
              indexInsert = EElementPosition.TOP === this.value.position ? index : index + 1
              const key: any = _.findKey(item.children, child => child.id === this.value.id)
              const defaultElement = this.defaultData[`${this.value.element}_DEFAULT`]
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
                    children: _.cloneDeep([{ ..._.cloneDeep(defaultElement), id: uuidv4() }])
                  }
              if (this.isParentBox) { data.props.parent = EElementType.BOX }
              this.assignChildElementId(data)
              if (!this.inserted) {
                state.children.splice(indexInsert, 0, { ...data, id: uuidv4() })
                this.inserted = true
              }
            }
            this.addVerticalElement(item)
          } else {
            this.foundParent = item.id === this.value.id
            this.parentId = state.id
            this.isParentBox = state.props.parent === EElementType.BOX
            this.inserted = false
            this.addVerticalElement(this.foundParent ? undefined : item)
          }
        })
      }
    }

    /*  Delete Element */
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

    /*  Check Element Children For Delete */
    deleteChildElement(state: any = this.templateJson) {
      if (state.children) {
        state.children.forEach((child: any) => {
          state.children = _.filter(state.children, child => child.children ? child.children.length > 0 : true)
          this.deleteChildElement(child)
        })
      }
    }

    /*  Assign Element ID */
    assignChildElementId(state: any) {
      if (state.children) {
        state.children.forEach((child: any) => {
          if (state.children && state.children.length > 0) {
            this.assignChildElementId(child)
          }
          state.children = state.children.map((child: any) => { return { ...child, id: uuidv4() } })
        })
      }
    }

    /* Directive Vue.Js */
    render(createElement: CreateElement) {
      return this.createComponent(this.templateJson, createElement)
    }
  }
</script>
