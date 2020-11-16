const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  username: state => state.user.username,
  roles: (state) => state.user.roles,
  routerList: (state) => {
    return state.user.routerList.options.routes
  },
  avatarImg: (state) => state.user.avatarImg,
  userInfo: (state) => state.user.userInfo
}
export default getters
