import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    device: 'desktop',
    labelVisible: false,
    statusVisible: false,
    priorityVisible: false,
    childStatusVisible: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_LABEL_VISIBLE: (state, val) => {
      state.labelVisible = val
    },
    TOGGLE_STATUS_VISIBLE: (state, val) => {
      state.statusVisible = val
    },
    TOGGLE_CHILD_STATUS_VISIBLE: (state, val) => {
      state.childStatusVisible = val
    },
    TOGGLE_PRIORITY_VISIBLE: (state, val) => {
      state.priorityVisible = val
    },
    CLOSE_SIDEBAR: (state) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar ({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    TogglelabelVisible ({ commit }, val) {
      commit('TOGGLE_LABEL_VISIBLE', val)
    },
    TogglestatusVisible ({ commit }, val) {
      commit('TOGGLE_STATUS_VISIBLE', val)
    },
    TogglechildStatusVisible ({ commit }, val) {
      commit('TOGGLE_CHILD_STATUS_VISIBLE', val)
    },
    TogglepriorityVisible ({ commit }, val) {
      commit('TOGGLE_PRIORITY_VISIBLE', val)
    }
  }
}

export default app
