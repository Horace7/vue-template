// 过滤组织架构数据
const filterOfOrganization = (tree, results) => {
  (tree || []).forEach(treeNode => {
    if (treeNode.parentId > 0) {
      results.push(treeNode)
    } else {
      if (treeNode.children && treeNode.children.length > 0) {
        filterOfOrganization(treeNode.children, results)
      }
    }
  })
}

// 重构组织架构数据
const refactorOfOrganization = (tree) => (tree || []).map(treeNode => ({
  value: treeNode.id,
  title: treeNode.orgName,
  children: refactorOfOrganization(treeNode.children)
}))
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.username,
  roles: (state) => state.user.roles,
  routerList: (state) => {
    return state.user.routerList.options.routes
  },
  avatarImg: (state) => state.user.avatarImg,
  sortArr: (state) => state.dashboard.sortArr,
  delText: (state) => state.dashboard.delText,
  lineChart: (state) => state.dashboard.lineChart,
  editChartInfo: (state) => state.dashboard.editChartInfo,
  screenWidth: (state) => state.dashboard.screenWidth,
  dashboardList: (state) => state.dashboard.dashboardList,
  dashboardItem: (state) => {
    return state.dashboard.dashboardItem
  },
  labelVisible: (state) => state.app.labelVisible,
  statusVisible: (state) => state.app.statusVisible,
  priorityVisible: (state) => state.app.priorityVisible,
  childStatusVisible: (state) => state.app.childStatusVisible,
  userInfo: (state) => state.user.userInfo,
  userName: (state) => state.user.username,
  tenantList: (state) => state.user.tenantList,
  // 有权限的 location 树
  authOrganizationInfos: state => {
    const fullSource = state.dashboard.authOrganizationInfos || []

    console.log(fullSource)
    // 过滤有权限的节点
    const results = []
    filterOfOrganization(fullSource, results)
    console.log(results)
    return refactorOfOrganization(results)
  }
}
export default getters
