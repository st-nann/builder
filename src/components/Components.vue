<template>
  <keep-alive>
    <div
      v-for="(option, index) in options"
      :key="index"
      :class="[
        options.className,
        `component-flex-grow-${option.grow}`
      ]"
      :style="getStyle(option)"
    >
      <Condition :option="option" :value="mutation()" />
    </div>
  </keep-alive>
</template>

<script lang="ts">
import { Base } from '@/core/Base'
import { Component, Prop, Provide } from 'vue-property-decorator'
import { IComponentOption } from '@/interfaces/Components'
import { _get } from '@/utils/lodash'
import Condition from '@/components/Condition'
import { IFlexbox } from '@/interfaces/Components'

@Component({
  components: { Condition }
})
export default class Field extends Base {
  @Prop({default: [], required: true, type: Array}) readonly options!: IComponentOption[]
  @Prop({ type: Object, default: () => ({}) }) readonly value!: any

  style(option: IFlexbox): object {
    return {
      '--flex-grow': option.grow
    }
  }

  mutation(): object {
    const data: any = {}
    this.options.forEach(item => {
      if (item.props) {
        data[item.props.name] = _get(this.value, item.props.name, undefined)
          ? _get(this.value, item.props.name, null)
          : item.props.value
            ? item.props.value
            : null
      }
    })

    return data
  }
}
</script>
