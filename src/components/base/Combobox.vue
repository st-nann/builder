<template>
  <span>
    <div class="combobox-contianer">
      <button
        v-if="label"
        :id="`combobox-btn-${name}`"
        class="combobox-btn"
        @click="doToggleMenu"
      >
        <i v-if="icon" :class="`mdi mdi-${icon} menu-icon`" /> {{ label }}
      </button>
      <div :id="`combobox-menu-${name}`" class="combobox-content">
        <InputComponent
          :name="`search-${name}-${elementId}`"
          className="combobox-serach"
          placeholder="Search"
          :search="true"
          @change="doFilter"
        />
        <div class="combobox-item">
          <div v-if="optionFilter.length > 0">
            <a
              :id="`combobox-item-${name}`"
              v-for="(item, index) in optionFilter"
              :key="index"
              :value="item.value"
              :style="`font-family: ${item.value}`"
              @click="doUpdateCombobox(item.value)"
            >
              {{ item.label }}
            </a>
          </div>
          <div v-else class="combobox-no-data">no data available</div>
        </div>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component } from 'vue-property-decorator'
import BaseComponent from '../../core/BaseComponent'
import { IDropdownOption } from '../../interfaces/Components'

@Component
export default class ComboboxComponent extends BaseComponent {

  optionFilter: IDropdownOption[] = []

  doToggleMenu() {
    (window as any).onclick = (event: any) => {
      // if (!(event.target.matches('.combobox-btn') || event.target.matches('.combobox-serach'))) {
      if (!_.includes([`combobox-btn-${this.name}`, `input-search-${this.name}`], event.target.id)) {
        const menu: any = document.getElementsByClassName(`combobox-content`)
        for (let i = 0; i < menu.length; i++) {
          const opened = menu[i]
          if (opened.classList.contains('show')) {
            opened.classList.remove('show')
          }
        }
      }
    }
    document.getElementById(`combobox-menu-${this.name}`)?.classList.toggle('show')
    this.optionFilter = this.options
  }

  doFilter(text: string) {
    this.optionFilter = _.filter(
      this.options,
      item => _.includes(_.toLower(item.label), _.toLower(text))
    )
  }

  doUpdateCombobox(value: string) {
    document.getElementById(`combobox-menu-${this.name}`)?.classList.remove('show')
    const element: any = document.getElementById(`input-search-${this.name}`)
    element.innerHTML = ''
    element.value = ''
    this.onInput(value)
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/Main.scss';
</style>
