export const state = () => ({
  isLnbOpen: true,
  activeDrawer: null, // 'widget' | 'settings' | null
  isEditMode: false,
  theme: 'system', // 'light' | 'dark' | 'system'
  widgets: [
    { i: '1', x: 0, y: 0, w: 3, h: 1, title: 'Revenue' },
    { i: '2', x: 3, y: 0, w: 3, h: 1, title: 'Users' },
    { i: '3', x: 6, y: 0, w: 3, h: 1, title: 'Growth' },
  ],
  members: [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2026-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2026-01-19' },
  ],
  menuItems: [
    { name: '워크스페이스', path: '/', icon: 'layout-dashboard' },
    { name: '멤버 관리', path: '/members', icon: 'users' }
  ]
})

export const mutations = {
  TOGGLE_LNB(state) {
    state.isLnbOpen = !state.isLnbOpen
  },
  SET_DRAWER(state, drawer) {
    if (state.activeDrawer === drawer) {
      state.activeDrawer = null
    } else {
      state.activeDrawer = drawer
    }
  },
  CLOSE_DRAWER(state) {
    state.activeDrawer = null
  },
  TOGGLE_EDIT_MODE(state) {
    state.isEditMode = !state.isEditMode
  },
  SET_EDIT_MODE(state, value) {
    state.isEditMode = value
  },
  SET_THEME(state, theme) {
    state.theme = theme
  },
  ADD_WIDGET(state, widget) {
    state.widgets.push(widget)
  },
  UPDATE_WIDGETS(state, widgets) {
    state.widgets = widgets
  },
  UPDATE_WIDGET_TITLE(state, { id, title }) {
    const widget = state.widgets.find(w => w.i === id)
    if (widget) {
      widget.title = title
    }
  },
  REMOVE_WIDGET(state, id) {
    state.widgets = state.widgets.filter(w => w.i !== id)
  },
  ADD_MEMBER(state, member) {
    state.members.push({
      id: state.members.length + 1,
      ...member,
      date: new Date().toISOString().split('T')[0]
    })
  },
  ADD_MENU_ITEM(state, item) {
    state.menuItems.push(item)
  },
  REMOVE_MENU_ITEM(state, path) {
    state.menuItems = state.menuItems.filter(item => item.path !== path)
  }
}
