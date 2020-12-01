<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VNode, CreateElement } from "vue";
import { BuilderTagMap } from "./BuilderTagMap";

import BoxPage from "../pages/Box";
import ButtonPage from "../pages/Button";
import ImagePage from "../pages/Image";
import SpacerPage from "../pages/Spacer";
import TextPage from "../pages/Text";
import _ from "lodash";
@Component({
  components: { BoxPage, ButtonPage, ImagePage, SpacerPage, TextPage },
})
export default class BuilderCanvas extends Vue {
  @Prop() viewJSON: any;

  readonly defaultView = {
    element: "box",
    "container-props": {
      background: "",
      flexbox: {
        "flex-grow": 1,
        "flex-direction": "column",
      },
    },
    children: [
      { element: "text", "element-props": { text: "Hello" } },
      { element: "text", "element-props": { text: "Builder" } },
      { element: "text", "element-props": { text: "Is Awesome" } },
    ],
  };

  getViewJSON() {
    if (this.viewJSON == undefined || this.viewJSON.element != "container") {
      return this.defaultView;
    }
    return this.viewJSON;
  }

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

    const properties = {
      props: {
        elementProps: dNode["element-props"],
      },
    };
    const tagName = BuilderTagMap.getTag(dNode.element);

    return h(tagName, properties, children);
  }

  render(createElement: CreateElement) {
    return this.createComponent(this.getViewJSON(), createElement);
  }
}
</script>

<style lang="scss">
</style>