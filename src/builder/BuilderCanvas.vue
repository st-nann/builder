<script lang="ts">
  import _ from 'lodash'
  import { uuid } from 'uuidv4'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { CreateElement } from 'vue'
  import { BuilderTagMap } from './BuilderTagMap'
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

    // readonly defaultView = {
    //   element: "box",
    //   "container-props": {
    //     background: "",
    //     flexbox: {
    //       "flex-grow": 1,
    //       "flex-direction": "column",
    //     },
    //   },
    //   children: [
    //     { id: 'xxssw1', element: "text", "element-props": { text: "Hello" } },
    //     { id: 'xxssw2',element: "text", "element-props": { text: "Builder" } },
    //     { id: 'xxssw3',element: "text", "element-props": { text: "Is Awesome" } },
    //   ],
    // }

    createComponent(dNode: any, h: CreateElement): any {
      if (_.isEmpty(dNode)) {
        return h("div");
      }

      if (_.isArray(dNode)) {
        return dNode.map((child) => this.createComponent(child, h));
      }

      const children: any[] = [];

      if (dNode.children && dNode.children.length > 0) {
        dNode.children.forEach((c: any) => {
          if (_.isString(c)) {
            children.push(c);
          } else {
            children.push(this.createComponent(c, h));
          }
        });
      }

      if( dNode.id === undefined){
        dNode.id = uuid()
      }

      const properties = {
        props: {
          elementId: dNode.id,
          elementName: _.capitalize(dNode.element),
          elementProps: dNode['element-props'],
          containerProps: dNode['container-props']
        },
        on: {
          done: (value: any) => {
            dNode['container-props'] = value['container-props']
          }
        }
      };

      const tagName = BuilderTagMap.getTag(dNode.element)

      return h(tagName, properties, children);
    }

    render(createElement: CreateElement) {
      return this.createComponent(this.templateJson, createElement);
    }
  }
</script>
