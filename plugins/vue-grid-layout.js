import Vue from 'vue'

let GridLayout, GridItem

if (process.client) {
  const VueGridLayout = require('vue-grid-layout')
  GridLayout = VueGridLayout.GridLayout
  GridItem = VueGridLayout.GridItem
} else {
  // Dummy components for server-side to prevent "Unknown custom element" warnings
  GridLayout = { render: h => h('div', { attrs: { class: 'vue-grid-layout' } }, [h('slot')]) }
  GridItem = { render: h => h('div', { attrs: { class: 'vue-grid-item' } }, [h('slot')]) }
}

Vue.component('grid-layout', GridLayout)
Vue.component('grid-item', GridItem)
Vue.component('GridLayout', GridLayout)
Vue.component('GridItem', GridItem)
